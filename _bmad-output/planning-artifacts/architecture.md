---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-03-14'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/product-brief-TaagBack-2026-03-10.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
  - '_bmad-output/planning-artifacts/research/market-taagback-qr-platform-research-2026-03-09.md'
  - '_bmad-output/planning-artifacts/research/domain-taagback-qr-overlay-platform-research-2026-03-09.md'
  - '_bmad-output/planning-artifacts/research/technical-taagback-mvp-architecture-research-2026-03-09.md'
  - 'docs/README.md'
workflowType: 'architecture'
project_name: 'TaagBack'
user_name: 'Noah.Porch'
date: '2026-03-12'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

> **Reading order for AI agents:** This document was built incrementally through Steps 1-7. When earlier sections conflict with later sections, the later section is authoritative. Specifically: the **Project Structure section (Step 6)** supersedes all project trees in earlier sections. The **Validation section (Step 7)** contains amendments to earlier decisions.

## Project Context Analysis

### Requirements Overview

**Functional Requirements (47 FRs across 8 domains):**

| Domain | FRs | Architectural Significance |
|--------|-----|---------------------------|
| QR Scanning & Taag Management | FR1-FR8 | Core scan pipeline — raw data extraction, Taag creation, three-tier attribution, content moderation on naming. The scan endpoint is the system's center of gravity and **single ingest point** for all platform data. |
| Collection & Discovery | FR9-FR13 | Personal collection tracking, watchlist subscriptions, leaderboard computation, player profiles. Read-heavy, cache-friendly. |
| Claim Maintenance & Contestation | FR14-FR18 | Time-based claim expiration (30-day TTL) via **lazy evaluation at scan time** — no background processing needed. Re-scan renewal. Notification dispatch on state changes via background channel. |
| Hunt Creation & Management | FR19-FR25 | Dual creation modes (field + map) are a **client-side concern** — the API receives the same payload regardless. Server-side: ordered list CRUD with a status flag. Deep link generation is a URL with a hunt ID. |
| Hunt Play & Progression | FR26-FR32 | Sequential clue reveal, geofence + QR token verification at each stop. The architecturally significant query is the **scan-time hunt progression check** — "is this QR code the next stop in any active hunt for this user?" This runs on every scan for every user with an active hunt. |
| Safety, Moderation & Reporting | FR33-FR38 | Single moderation function (`CheckText`) wrapping OpenAI Moderation API with regex blocklist fallback. Called inline before every UGC save — Taag names, clue text, hunt descriptions, completion messages. No separate modes needed; all UGC write paths have natural user pauses that tolerate 100-200ms. |
| Authentication & User Management | FR39-FR43 | Anonymous-first → account promotion via Firebase Auth with `linkWithCredential()`. Wrapped in a **client-side auth abstraction layer** so the Firebase SDK is swappable. Supabase Auth (GoTrue) documented as migration target. |
| Data Integrity & Anti-Fraud | FR44-FR47 | Duplicate QR detection ("snack wrapper problem"), impossible travel flagging, geofence verification. Rate limiting per ADR-5: scan endpoint 30/min authenticated, 10/hour anonymous; Taag detail 60/min; global 100/min per IP. |

**Non-Functional Requirements (22 NFRs across 5 domains):**

| Domain | Key NFRs | Architectural Impact |
|--------|----------|---------------------|
| Performance | <500ms p95 scan response, <2s end-to-end QR-to-UI, <4s cold start | Scan pipeline must be optimized: minimal DB round-trips, async side-effects via `Channel<T>`, `IMemoryCache` with 30-second TTL for leaderboard/lookup caching. **Scan p95 time budget:** DB lookup by NormalizedContent (~50ms with index) + Taag create/update (~30ms) + ScanEvent insert (~20ms) + hunt progression check (~30ms with HuntStop(TaagId) index) + Channel write (~0ms) + serialization (~5ms) = **~135ms server-side**, well within 500ms. Moderation (100-200ms) only runs on naming requests, not on every scan. |
| Security | TLS 1.2+, secure token storage, server-side validation, CORS restriction, Firebase JWT, platform attestation | Defense-in-depth: every layer validates independently. No client trust. |
| Scalability | 10K concurrent users on <$80/month, 500K Taags on single PostgreSQL, horizontal scaling without rewrite | Feature-folder monolith with clean boundaries. Redis and read replicas as growth-phase additions — not MVP. |
| Privacy & Data Handling | Minimum GPS precision, no raw location sharing, 45-day deletion, GPC signals, COPPA for under-13 | Privacy-by-design: data minimization at collection. **Anonymous-phase client storage must be COPPA-safe** — no GPS coordinates cached locally until age verification is complete. Offline scan queue for anonymous users stores QR content only, not location. |
| Reliability | 99.5% uptime, zero-loss offline sync, idempotency on retries | **"Zero-loss" applies to scan data** — guaranteed via client-generated idempotency keys + retry queue. Push notifications are best-effort (bounded Channel may drop under load — acceptable trade-off). Scans use explicit `IdempotencyKey`; all other mutations (Taag naming, hunt CRUD, claims) are idempotent by design via PUT semantics or unique constraints. Simple retry queue for offline scans (not an elaborate outbox pattern). |

**Scale & Complexity:**

- Primary domain: Mobile App (React Native/Expo SDK 55) + API Backend (.NET 10 ASP.NET Core)
- Complexity level: Medium-High
- Estimated architectural components: ~10 (scan pipeline, Taag/hunt CRUD, leaderboard, auth/identity, moderation function, push notification channel, offline scan retry, admin tools, CI/CD pipeline, celebration/UX engine on client)

### Technical Constraints & Dependencies

| Constraint | Source | Impact |
|-----------|--------|--------|
| .NET 10 LTS + C# 13 | Existing codebase | Backend language and framework locked. Supported through Nov 2028. |
| React Native 0.83 / Expo SDK 55 | Existing codebase | Frontend framework locked. New Architecture mandatory (Fabric, TurboModules, JSI). |
| PostgreSQL + PostGIS | Technical research validation | Spatial queries are foundational. EF Core + Npgsql + NetTopologySuite integration. |
| Firebase Auth (with abstraction) | Technical research recommendation | Anonymous-first pattern, social login, JWT validation. Free to 50K MAU. Client-side auth abstraction layer required for portability. Supabase Auth (GoTrue) as documented exit strategy. |
| react-native-vision-camera | Core product premise — QR interception at decoder level | **Strategic dependency risk.** Single maintainer (mrousavy). Entire product is downstream of `onCodeScanned`. Mitigation: wrap in `ScannerService` abstraction, pin version, monitor repo health. Fallback: contained native module rewrite behind the abstraction. |
| Solo developer | Resource context | Architecture must favor simplicity, managed services, and automation. No abstractions without immediate need. |
| Cloud-agnostic hosting | Architectural decision | All technology choices portable (PostgreSQL, Redis, containerized .NET, Firebase Auth, Expo Push). No cloud-proprietary services in application code. Infrastructure config (Terraform/CDK) is the only cloud-specific layer. |
| COPPA compliance (April 2026) | Regulatory deadline | Age gate, VPC flow, data handling for minors, anonymous-phase COPPA-safe client storage must be in MVP. |
| In-memory storage → PostgreSQL migration | Critical path | Current `List<T>` stores must be replaced before any other feature work. |
| Normalized QR content as primary lookup key | First principles analysis | Normalize URL (lowercase scheme/host, strip trailing slash, sort query params) and store as lookup key with unique index. Human-readable, debuggable, fast. No content hashing. |

### Cross-Cutting Concerns Identified

| Concern | Affected Components | Architectural Strategy |
|---------|-------------------|----------------------|
| **Authentication lifecycle** | Every API endpoint | Firebase Auth with anonymous → authenticated promotion. `[Authorize]` / `[AllowAnonymous]` per endpoint. Client-side auth abstraction layer for SDK portability. Account promotion must queue gracefully if Firebase is unreachable — never block the user from continuing in anonymous mode. **Firebase App Check** (Play Integrity / DeviceCheck) for device attestation — verifies requests come from the real app on a real device. Free tier covers MVP scale. **Anonymous accounts cannot set custom Taag names** — only promoted (age-verified) accounts can name Taags (COPPA protection against minors submitting PII). Anonymous users still get Pioneer credit; name field stays blank until a promoted account claims naming rights. **JWKS resilience:** ASP.NET Core caches Firebase JWKS after first fetch. On API restart during Firebase outage, retry JWKS fetch with exponential backoff (up to 60s). If fetch fails, start in degraded auth mode: anonymous endpoints work, authenticated endpoints return 503 "Auth service unavailable" (not 401). Log degraded state loudly. |
| **Spatial data** | Taags, Hunts, Stops, Scans, Leaderboards | PostGIS `GEOGRAPHY(Point, 4326)` with GiST indexes. NetTopologySuite in EF Core. |
| **Content moderation** | Taag names, clue text, hunt descriptions, completion messages | Single `CheckText` function: OpenAI Moderation API with regex blocklist fallback. Called inline before every UGC save. 100-200ms latency acceptable in all write paths. **Resilience chain:** (1) HttpClient timeout 2 seconds on OpenAI call, (2) on timeout/error → fall back to regex blocklist only, (3) circuit breaker — after 3 consecutive OpenAI failures, skip API call for 5 minutes (blocklist only), log every skip, reset after successful call. **Never block the user from naming** — worst case, a marginal name passes during an outage and is caught in periodic review. |
| **Event dispatch** | Scan processing → push notifications | **Bounded** `Channel<ScanNotification>` (capacity ~1000) + one `BackgroundService` consumer at MVP. When full, `TryWrite` returns false — scan still succeeds, notification is dropped and logged. Only async side effect is push notification dispatch. No mediator framework. Add typed messages when 3+ distinct async effects exist. `Task.Run` is banned — always use `BackgroundService`. Notifications are "nice to have" — scan success is critical. Lost notifications during outage are acceptable at MVP vs. adding a durable queue. |
| **Offline resilience** | Scan claims, hunt data | Two distinct client-side subsystems: (1) **Scan retry queue** — simple retry with idempotency tokens. Server timestamp wins (no temporal fairness). **Drain throttle: 1 scan/second** when reconnecting (not all at once) to avoid hitting rate limiter. Show progress: "Syncing 47 of 312 scans..." Batch endpoint (`POST /api/v1/scans/batch`) is a documented post-MVP improvement. (2) **Hunt data cache** — pre-cache when user joins a hunt, non-negotiable for real-world play. `IMemoryCache` with 30-second TTL on server side is the entire caching architecture at MVP. |
| **Regulatory compliance** | User registration, data collection, location tracking, UGC | COPPA age gate at account creation, GPC signal handling, minimum-precision GPS, 45-day deletion SLA. Anonymous-phase client storage: QR content only, no GPS, until age verification complete. |
| **Rate limiting & anti-fraud** | Scan endpoint, Taag detail/spatial endpoints, global fallback | Built-in .NET rate limiting middleware. Scan endpoint: token bucket 30/min per authenticated user, **10/hour for anonymous users** (enough for casual play, painful for bots). `GET /api/v1/taags/{id}` and `GET /api/v1/taags?lat=&lng=&radiusMeters=`: 60/min per user (prevents enumeration/scraping of the Taag databank). Global: fixed window 100/min per IP. Client handles 429 with retry + backoff, never shows error to user. |
| **Scan pipeline resilience** | All downstream systems | Single ingest point for all platform data. Requires circuit breakers on downstream dependencies (moderation, event channel). Graceful degradation: scan succeeds even if notification dispatch fails. Health monitoring on scan endpoint as primary availability signal. **Input validation at the boundary:** max QR content length 2048 chars (reject longer). **Scheme whitelist for normalization:** only `http://` and `https://` URLs are normalized; all other content types (tel:, mailto:, javascript:, raw text) stored as-is in `RawContent` with raw string as lookup key. The normalization function is a **security-critical boundary** — first server-side code to process attacker-controlled input from the physical world. Dedicated test suite, review required on any change. **Self-referential URL detection:** if QR content matches TaagBack's own domain/deep link scheme, the client routes to the deep link handler (e.g., open a hunt), NOT the scan API — no Taag is created for TaagBack URLs. This is a client-side ScannerService responsibility. **Simultaneous first-scan race condition:** unique constraint on `NormalizedContent` prevents duplicate Taags. On `DbUpdateException` (unique violation), the scan service catches the error, reloads the existing Taag, and processes the scan as a Collection event instead of FirstDiscovery. The second user never sees an error — they just aren't the pioneer. |
| **Notification budgeting** | Push notifications | Aggregate maintenance notifications per user per period. Priority tiers: watchlist alerts > claim expiry warnings > general updates. Daily digest for low-priority at MVP. Volume scales linearly with engagement — design for this from Day 1. |
| **Hunt integrity** | Hunt play, creator tools | Detect when hunt stops become unreachable (Taag not scanned by anyone for N days, URL dead). Creator alerts for broken hunts. Skip/report as API-level capability. |
| **Hunt/Taag coupling** | Hunt engine, Scan/Taag domain | Architecturally coupled domains — bidirectional data dependency. Feature folders keep them separate for code clarity but acknowledge shared data ownership. Any future extraction must treat as single bounded context. |
| **Scan API / Scan UX boundary** | API endpoints, mobile client | Explicit architectural boundary. Scan API returns structured data (`{ type, taag, hunt_progress }`), stable, versioned. All emotional UX (celebrations, transitions, sound, haptics) lives entirely on the client. Celebrations evolve rapidly via OTA updates without server changes. |
| **Data exposure policy** | All API responses | **`NormalizedContent` and `RawContent` must NEVER appear in public API responses.** These fields are the strategic data asset — server-side only. Taag profile cards return: `CustomName`, approximate location (neighborhood/city level, not precise GPS), discoverer display name, current controller display name, claim status. The QR content is only received by the API from the user's own scan — never echoed back in read endpoints. |

### Binding Architectural Decisions (ADRs)

| ADR | Decision | Rationale |
|-----|----------|-----------|
| **ADR-1: Code Organization** | Feature folders by domain. Controller → Service → DbContext within each folder. Service interfaces only when multiple implementations exist. Shared concerns in `Infrastructure/`. | Navigable for solo dev, extractable for future team. No unnecessary abstractions. |
| **ADR-2: Event Dispatch** | Single `Channel<T>` + `BackgroundService`. No mediator framework (no MediatR, no Wolverine). | One async side effect at MVP (push notifications) doesn't justify a framework. Add typed messages when 3+ effects exist. |
| **ADR-3: API Versioning** | URL path versioning (`/api/v1/`) from Sprint 1 via `Asp.Versioning.Http`. Unversioned requests default to v1. OpenAPI spec generated from versioned endpoints as mobile client contract. | Mobile clients in the wild can't be force-updated. 30 minutes of setup prevents days of pain. |
| **ADR-4: Database Access** | No repository pattern. Services inject `DbContext` directly. No `DbContext` in controllers. No EF entities in API responses — services return DTOs. Testing via Testcontainers (PostgreSQL). | EF Core is already UoW + Repository. PostGIS dependency makes DB independence impossible. DTOs decouple entity model from API contract. |
| **ADR-5: Rate Limiting** | Built-in .NET middleware. Scan endpoint: token bucket 30/min per authenticated user, 10/hour for anonymous. Taag detail endpoint: 60/min per user (anti-scraping). Global fallback: fixed window 100/min per IP. | Scan endpoint is the highest-traffic, abuse-targetable endpoint. Anonymous rate limit prevents bot farms. Taag detail limit protects the databank from enumeration. Add policies when abuse patterns are observed. |

## Starter Template Evaluation

### Primary Technology Domain

Mobile App (React Native / Expo SDK 55) + API Backend (.NET 10 ASP.NET Core) — identified from existing codebase and project requirements.

### Existing Scaffolding Assessment

TaagBack has existing boilerplate scaffolding. Both the backend (10 .cs files) and frontend (6 .ts/.tsx files) are minimal enough that **re-scaffolding from fresh templates** is cleaner than retrofitting new frameworks into the existing structure. Every file would be modified during evolution anyway — fresh scaffolds eliminate config debt and guarantee correct project structure from Day 1.

The existing code serves as **reference material** for domain logic (scan resolution, hunt CRUD, API client patterns), not as a foundation to build on.

### Re-Scaffold Strategy

**Backend: Fresh `dotnet new webapi`**

Scaffold a new .NET 10 Web API project with EF Core + PostGIS pre-configured and feature-folder structure from Day 1. Port domain logic (scan resolution, hunt/stop CRUD) from the existing services.

**Initialization:**
```bash
dotnet new webapi -n TaagBack.Api --framework net10.0
```

**Sprint 1 packages:**
- `Npgsql.EntityFrameworkCore.PostgreSQL` — EF Core PostgreSQL provider
- `Npgsql.EntityFrameworkCore.PostgreSQL.NetTopologySuite` — PostGIS spatial support
- `Microsoft.EntityFrameworkCore.Design` — Migrations tooling
- `Asp.Versioning.Http` — API versioning (`/api/v1/`)
- `AspNetCore.HealthChecks.NpgSql` — PostgreSQL health check for `GET /health` endpoint

**Sprint 2 packages (Auth):**
- `Microsoft.AspNetCore.Authentication.JwtBearer` — Firebase JWT validation

**Project structure (from Day 1):**

> **Note:** This project tree is superseded by the **Project Structure & Boundaries** section (Step 6). The scaffold commands and package lists below remain valid. Use the Step 6 tree for all file placement decisions.

```
TaagBack.Api/
├── Features/
│   ├── Scanning/
│   │   ├── ScanController.cs
│   │   ├── ScanService.cs
│   │   └── ScanModels.cs
│   ├── Hunts/
│   │   ├── HuntsController.cs
│   │   ├── HuntService.cs
│   │   └── HuntModels.cs
│   ├── Taags/
│   │   ├── TaagController.cs
│   │   ├── TaagService.cs
│   │   └── TaagModels.cs
│   └── Leaderboard/
│       ├── LeaderboardController.cs
│       └── LeaderboardService.cs
├── Infrastructure/
│   ├── Persistence/
│   │   ├── AppDbContext.cs
│   │   └── Migrations/
│   ├── Moderation/
│   │   └── ContentModerator.cs
│   └── Notifications/
│       └── NotificationChannel.cs
├── Program.cs
├── Dockerfile
└── appsettings.Development.json
```

**Infrastructure files (Sprint 1):**
- `Dockerfile` — Multi-stage build (`mcr.microsoft.com/dotnet/sdk:10.0` build, `mcr.microsoft.com/dotnet/aspnet:10.0` runtime)
- `docker-compose.dev.yml` — PostGIS container for local development (`postgis/postgis:17-3.5`)
- `appsettings.Development.json` — Local connection strings, API keys
- `.env.example` — Template for required environment variables (checked into git, `.env` in `.gitignore`)

**Structural decisions baked into scaffold:**
- Feature folders by domain (ADR-1)
- No service interfaces — concrete types injected directly (add interfaces only when multiple implementations exist)
- Existing `IHuntService` / `IHuntStopService` interfaces are **not carried forward**
- `AddScoped` for all services (DbContext-scoped lifetime)
- CORS restricted to known origins (not `AllowAnyOrigin`)

**Frontend: Fresh `create-expo-app --template tabs`**

Scaffold a new Expo project with expo-router, native tabs, and TypeScript pre-configured. Port the existing API client and screen logic.

**Initialization:**
```bash
npx create-expo-app@latest TaagBack --template tabs
```

**Sprint 1 packages:**
- `react-native-vision-camera` — QR scanning with raw data interception (pending expo-camera spike — see below)
- `expo-location` — GPS for Taag placement and geofence verification
- `nativewind` + `tailwindcss` — Styling foundation
- `expo-haptics` — Scan feedback (near-zero cost, immediate UX value)
- `@tanstack/react-query` — Server state management, offline scan retry, leaderboard cache

**Sprint 2 packages (Auth):**
- `@react-native-firebase/auth` — Firebase Auth SDK
- `expo-secure-store` — Secure token storage (iOS Keychain / Android Keystore)

**Sprint 3 packages (Polish):**
- `react-native-reanimated` — Gesture-driven animations, shared element transitions
- `lottie-react-native` — Pre-built celebration animation sequences
- `expo-av` — Sound signatures (pioneer fanfare, scan chirp, crescendo)

**Sprint 1 infrastructure:**
- `eas.json` — EAS Build configuration for development builds (required for QR scanning on device)
- First development build — prerequisite for scanning spike and all camera-dependent features
- Jest configuration (included in template) — keep for future component testing
- `@testing-library/react-native` — added but testing priority is backend at MVP

**Note:** Frontend testing is deferred to Sprint 3+ unless a specific component (offline scan queue) has complex logic worth testing earlier. Testing priority at MVP is backend scan pipeline logic via Testcontainers.

### Development Workflow

**OpenAPI → TypeScript Type Generation:**

Generate TypeScript interfaces from the .NET API's OpenAPI spec to prevent API contract drift between backend and frontend. Single source of truth — the .NET API's OpenAPI 3.1 document, committed to the repo as `openapi.json`.

**Local dev workflow:**
```bash
# 1. Regenerate spec from running API server
curl http://localhost:5218/openapi/v1.json -o openapi.json

# 2. Generate TypeScript types from the committed spec
npx openapi-typescript openapi.json -o src/types/api.ts
```

**Full workflow:** After any API endpoint change: (1) regenerate `openapi.json` from the running server, (2) commit the updated spec, (3) regenerate TypeScript types. Backend CI validates the committed spec matches the API (drift detection). Frontend CI generates types from the committed file (no running server needed). Both steps use the same committed `openapi.json` — local dev generates it, CI validates it.

Run via `package.json` script (`npm run generate-types`) for convenience. No monorepo tooling needed — this script replaces the shared types package that would justify Turborepo/Nx.

**Configuration management:**
- Backend: `appsettings.Development.json` for local dev, environment variables for production
- Frontend: Expo's `app.config.ts` with environment-specific values
- `.env.example` templates in both projects (checked into git)
- `.env` files in `.gitignore` — never commit secrets

### Spike Task: QR Scanning Library Verification

**Before finalizing the scanning library choice**, verify expo-camera's raw QR data behavior on Android:

1. Create a minimal Expo dev build with `expo-camera`
2. Scan a QR code that encodes a URL
3. Verify: does `onBarcodeScanned` return the raw URL string without opening the browser?
4. Test on at least 2 Android devices (different manufacturers)

**If expo-camera returns raw data reliably:** Prefer it over react-native-vision-camera for maintenance simplicity (first-party Expo dependency, updates with SDK).

**If expo-camera auto-executes URLs or behaves inconsistently:** Use react-native-vision-camera (already wrapped in ScannerService abstraction per context analysis).

**This spike is a Sprint 1 prerequisite** — it must complete before scanning feature development begins. The EAS dev build setup (above) is the prerequisite for this spike.

### Rationale

Both projects are re-scaffolded rather than evolved because: (1) the existing code is minimal boilerplate (10 backend files, 6 frontend files), (2) every file would be modified during evolution anyway (folder moves, EF Core migration, routing framework change), and (3) fresh scaffolds guarantee correct project structure, package configuration, and framework integration from Day 1 with zero config debugging risk. The existing code provides domain logic reference, not architectural foundation.

## Core Architectural Decisions

### Error Handling Strategy

**Decision:** RFC 9457 Problem Details — the built-in standard.

ASP.NET Core 10 ships with Problem Details middleware out of the box. One line in `Program.cs`:

```csharp
builder.Services.AddProblemDetails();
```

Every exception automatically returns a structured JSON response:

```json
{
  "type": "https://tools.ietf.org/html/rfc9457#section-3",
  "title": "Taag Already Claimed",
  "status": 409,
  "detail": "This Taag is currently claimed."
}
```

Custom problem types for domain-specific errors extend the base with additional properties. **MVP cap: ≤5 custom problem types** — `taag-already-claimed` (409), `hunt-not-published` (422), `moderation-rejected` (422), `claim-expired` (410), `geofence-failed` (422). Everything else uses standard HTTP status codes with generic `detail` text. No custom exception middleware, no `ErrorResponse` wrapper class — the framework handles it.

**Safety rules:**
- Never put raw exception messages in the `detail` field for custom problem types. Production `AddProblemDetails()` returns generic 500s by default — keep it that way.
- **No other-user attribution in error responses** — never include another user's ID, name, or activity timestamps in `detail`. Say "This Taag is currently claimed," not "claimed by UserX 3 days ago."
- Strip the `instance` field in production responses — it confirms endpoint structure for free to attackers. The client already knows what endpoint it called.
- BackgroundService errors use structured logging, not Problem Details (no HTTP context).

**Client mapping strategy:** Client switches on HTTP `status` code for generic handling (409 = conflict, 422 = validation, etc.) and on the `type` URI only for the ≤5 custom problem types that need specialized UX (e.g., `taag-already-claimed` triggers "someone beat you to it!" animation). Unknown `type` values fall through to generic status-code handling — client is resilient to new problem types without code changes. Validation errors (400) use ASP.NET Core's built-in `errors` dictionary via `[ApiController]` attribute.

**Rationale:** Zero custom code for 90% of error cases. Industry-standard format that any HTTP client can parse. Mobile client gets structured errors it can map to user-friendly messages without string matching.

### Logging Strategy

**Decision:** Built-in `ILogger<T>` with structured logging. No Serilog, no Seq, no log aggregation service at MVP.

```csharp
logger.LogInformation("Taag scanned {TaagId} by {PlayerId}, outcome: {Outcome}", taagId, playerId, outcome);
```

Structured log parameters (not string interpolation) from Day 1 so logs are queryable when a sink is added later. Console output in development. Stdout in production containers — the container orchestrator handles log collection.

**Log levels by domain:**
- `Information` — scan events, hunt completions, account promotions (the business events)
- `Warning` — rate limit hits, moderation rejections, claim conflicts
- `Error` — unhandled exceptions, external service failures (Firebase, OpenAI Moderation)

**Enforcement:**
- Enable `CA2254` analyzer in `Directory.Build.props` — compiler catches string interpolation in log calls.
- Include `HttpContext.TraceIdentifier` as a field in `Channel<T>` messages so background processing logs correlate to the originating HTTP request.
- **Never log raw GPS coordinates** (COPPA/privacy). Log `PlayerId` (UUID, not PII). Log `NormalizedContent` at `Debug` level only.
- Scan pipeline rule: exactly 1 `Information` log at the service entry point with all context in structured params. Internal helpers log `Debug` only. (Relaxed during Sprint 1 — allow Information at service boundaries while discovering what matters. Tighten to 1-log rule in Sprint 2.)
- **Request body logging toggle:** `Logging:EnableRequestBodyLogging` config flag (default false). When enabled during incident investigation, log request bodies at Warning level. Never leave permanently enabled.
- **Production log level floor: `Information`** — enforce via `appsettings.Production.json`. `Debug` and `Trace` are dev-only. Never deploy with `Debug` logging enabled.
- **Log retention & deletion** — 90-day max retention in production. On user deletion request, logs containing their `PlayerId` are anonymized (PlayerId replaced with a hash) within the 45-day deletion SLA. Anonymized logs may persist for the remainder of the 90-day retention window.

**Rationale:** `ILogger` is already injected everywhere by the framework. Structured parameters cost nothing now and pay off when you add a real sink. Serilog is a growth-phase addition when you need file rotation, enrichment, or a remote sink — not MVP complexity.

### Testing Strategy

**Decision:** Test the scan pipeline and hunt progression — the two paths where bugs cost users real-world effort (they physically walked somewhere).

**Backend testing stack:**
- **NUnit 4** — already in the project, no reason to switch
- **Testcontainers** — spin up real PostgreSQL + PostGIS for integration tests. No in-memory fakes, no SQLite substitutes. PostGIS spatial queries are the whole point — test them against the real engine.
- **No mocking framework at MVP** — services are thin enough that integration tests through the real stack are faster to write and more valuable than unit tests with mocked DbContext.

**What to test (priority order):**
1. **Scan pipeline** — QR content normalization is the **#1 test priority** (exhaustive suite: scheme case, host case, trailing slash, query param order, default ports 80/443, fragment stripping, URL encoding normalization). First-scan vs re-scan vs contested claim, idempotency token handling, lazy claim expiration with optimistic concurrency. **Concurrent first-scan race condition** — two transactions on same NormalizedContent, verify one gets FirstDiscovery and the other gets Collection, no errors surfaced.
2. **Hunt progression** — stop sequencing, **HuntProgress advancement via scan-time join query**, completion detection (including blackout crescendo trigger), geofence verification
3. **Content moderation** — inject `IContentModerator` interface (the one interface that earns its existence — OpenAI dependency demands it). Test with `FakeContentModerator` returning configurable results: pass, reject, timeout → fallback to blocklist. Three paths tested.
4. **Rate limiting** — verify 429 responses at threshold

**What NOT to test at MVP:**
- Controllers (thin pass-through to services)
- Frontend components (testing priority is backend)
- CRUD operations with no business logic

**Test infrastructure rules:**
- **One Testcontainers instance per test run** — use `[SetUpFixture]` to boot PostGIS once, share across all integration test classes. Typical overhead: 5-8s total.
- **Transaction rollback per test** — begin transaction in `[SetUp]`, rollback in `[TearDown]`. Every test sees a clean database without container restart cost.
- **Pin PostGIS image tag** — use the same `postgis/postgis:17-3.5` tag in both `docker-compose.dev.yml` and Testcontainers setup. Single source of truth.

**Rationale:** Integration tests against real PostGIS catch the bugs that matter — spatial query edge cases, index behavior, constraint violations. Mocking DbContext would hide exactly the bugs we need to find.

### CI/CD Strategy

**Decision:** GitHub Actions with two workflows. Main-only branch strategy (no develop branch, no release branches).

**Workflow 1: Backend (`backend.yml`)**
- Trigger: push to `main` touching `TaagBack.Api/**` or `TaagBack.Tests/**`
- Steps: restore → build → test (Testcontainers spins up PostGIS in the runner) → **regenerate OpenAPI spec → fail if spec differs from committed version (drift detection)** → **build Docker image tagged with git SHA** → push to GitHub Container Registry
- PostgreSQL service container in the workflow for Testcontainers
- The OpenAPI spec (`openapi.json`) is committed to the repo. Backend CI regenerates it and compares — if the spec changed but wasn't committed, CI fails. This ensures the committed spec is always in sync with the API.
- Docker image tagged `taagback-api:<git-sha>`. Deployment pipeline pulls by SHA tag — answers "what exactly is deployed?" unambiguously.

**Workflow 2: Frontend (`frontend.yml`)**
- Trigger: push to `main` touching `TaagBack/**` (the Expo project)
- Paths-ignore: `**/*.png`, `**/*.jpg`, `**/*.svg`, `**/*.md` — skip CI on asset-only changes
- Steps: install → **generate TypeScript types from committed OpenAPI spec** → lint → typecheck → (future: Jest tests)
- Types are generated from the committed `openapi.json` file (not a running server). If backend endpoints changed, the regenerated types cause TypeScript compilation failures — contract drift is caught at CI time.
- No EAS Build in CI at MVP — dev builds are triggered manually via `eas build`

**Branch strategy:** Commit directly to `main`. No PR reviews (solo dev). No branch protection at MVP. Add branch protection and PR workflow when a second developer joins.

**Database migration strategy:**
- **Migrations run as a separate CI/CD step**, never at app startup. Never call `Database.Migrate()` in `Program.cs` — it creates race conditions with multiple container instances and can't be rolled back independently.
- **Migration workflow:** `dotnet ef database update` as a deployment pipeline step before deploying new app containers. If migration fails, deployment halts — old containers keep running.
- **Pre-migration backup:** Automated `pg_dump` before every migration, scripted in the deployment pipeline.
- **Post-migration health check:** Health endpoint verifies schema version before new containers receive traffic.

**Rationale:** Two workflows so backend changes don't trigger frontend CI and vice versa. Main-only because branch management overhead for a solo dev is pure waste. The CI gate is the safety net — if tests pass on main, it ships. Migrations as a separate step prevent partial schema states and enable safe rollback.

### Environment Management

**Decision:** Two environments only — Development and Production. No staging.

| Environment | Purpose | Database | Auth | Hosting |
|-------------|---------|----------|------|---------|
| **Development** | Local dev + CI | PostGIS via `docker-compose.dev.yml` | Real Firebase project (`taagback-dev`) — not emulator, not skipped | `localhost:5218` |
| **Production** | Live users | Managed PostgreSQL + PostGIS | Firebase Auth (production project) | Containerized, cloud-agnostic |

**Configuration flow:**
- `appsettings.Development.json` — local connection strings, permissive CORS, verbose logging
- `appsettings.Production.json` — checked in with non-secret defaults (log levels, CORS origins list)
- Environment variables — all secrets (DB connection string, Firebase config, OpenAI API key) injected at runtime, never in config files
- **CORS origins from environment variables** — `appsettings.Production.json` has the default allowed origins list, overridable via `CORS__AllowedOrigins` environment variable. No hardcoded origins.
- **Fail-fast startup validation** — `Program.cs` validates all required environment variables (`DATABASE_URL`, `FIREBASE_PROJECT_ID`, etc.) at startup. Missing variable → `InvalidOperationException` with the variable name. No silent fallback to defaults.

**Health check endpoint:** `GET /health` — returns `{ "status": "healthy", "dbConnected": true, "schemaVersion": "20260315_001", "authMode": "normal" | "degraded" }`. Checks: database connectivity, schema migration version matches expected, JWKS loaded. Used by: deployment pipeline (post-migration gate), container orchestrator (liveness probe), monitoring. Add `Microsoft.Extensions.Diagnostics.HealthChecks` + `AspNetCore.HealthChecks.NpgSql` to Sprint 1 packages.

**Dev auth strategy:** Use a real Firebase project (`taagback-dev`, free tier) for development — not the emulator, never skip auth. The emulator's behavior differs from real Firebase (token format, JWKS endpoints, claim structures). Integration tests hit the real dev Firebase project to catch config mismatches before production. One Firebase project per environment: `taagback-dev` and `taagback-prod`.

**Rationale:** Staging is valuable when you have a QA team or complex deployment pipelines. Solo dev with CI tests doesn't need a $40/month environment sitting idle. Add staging when the first paying customer or second developer arrives.

### Data Model

**Decision:** Eight core entities with UUID primary keys, PostGIS spatial columns, and gap-based ordering for hunt stops.

```
┌──────────────────────────────────────────────────────────────────┐
│                          Player                                  │
│  Id (UUID PK)                                                    │
│  ExternalAuthId (unique index, NOT NULL — anonymous users have one) │
│  DisplayName                                                     │
│  IsAnonymous (bool)                                              │
│  CreatedAt (timestamptz)                                         │
└──────────┬───────────────────────────────┬───────────────────────┘
           │                               │
           │ OriginalDiscovererId (FK)     │ CurrentControllerId (FK, nullable)
           ▼                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                            Taag                                  │
│  Id (UUID PK)                                                    │
│  NormalizedContent (unique index) — primary lookup key            │
│  RawContent — original encoded string                            │
│  Location (GEOGRAPHY(Point, 4326), GiST index)                   │
│  OriginalDiscovererId (FK → Player)                              │
│  CurrentControllerId (FK → Player, nullable)                     │
│  CustomName (nullable, moderated)                                │
│  Status (enum: Active, Suspended, Removed — default Active)      │
│  ClaimRenewedAt (timestamptz, nullable)                          │
│  CreatedAt (timestamptz)                                         │
└──────────┬───────────────────────────────────────────────────────┘
           │
           │ TaagId (FK)
           ▼
┌──────────────────────────────────────────────────────────────────┐
│                         ScanEvent                                │
│  Id (UUID PK)                                                    │
│  PlayerId (FK → Player)                                          │
│  TaagId (FK → Taag)                                              │
│  Location (GEOGRAPHY(Point, 4326))                               │
│  Outcome (enum: FirstDiscovery, ClaimRenewal, Collection, etc.)  │
│  ScannedAt (timestamptz)                                         │
│  IdempotencyKey (unique index) — client-generated UUID           │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                            Hunt                                  │
│  Id (UUID PK)                                                    │
│  CreatorId (FK → Player)                                         │
│  Title (moderated)                                               │
│  Description (moderated)                                         │
│  Status (enum: Draft, Published, Archived)                       │
│  CompletionMessage (moderated)                                   │
│  CreatedAt (timestamptz)                                         │
│  UpdatedAt (timestamptz)                                         │
└──────────┬───────────────────────────────────────────────────────┘
           │
           │ HuntId (FK)
           ▼
┌──────────────────────────────────────────────────────────────────┐
│                          HuntStop                                │
│  Id (UUID PK)                                                    │
│  HuntId (FK → Hunt)                                              │
│  TaagId (FK → Taag)                                              │
│  SortOrder (int, gap-based: 100, 200, 300...)                    │
│  ClueText (moderated)                                            │
│  GeofenceRadius (int, meters, default 50)                        │
│  CreatedAt (timestamptz)                                         │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                       HuntProgress                               │
│  Id (UUID PK)                                                    │
│  PlayerId (FK → Player)                                          │
│  HuntId (FK → Hunt)                                              │
│  CurrentStopOrder (int — matches HuntStop.SortOrder)             │
│  StartedAt (timestamptz)                                         │
│  CompletedAt (timestamptz, nullable)                             │
│  unique constraint (PlayerId, HuntId)                            │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                         Watchlist                                │
│  Id (UUID PK)                                                    │
│  PlayerId (FK → Player)                                          │
│  TaagId (FK → Taag)                                              │
│  CreatedAt (timestamptz)                                         │
│  unique constraint (PlayerId, TaagId)                            │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                           Report                                 │
│  Id (UUID PK)                                                    │
│  ReporterId (FK → Player)                                        │
│  TargetType (enum: Taag, Hunt, HuntStop)                         │
│  TargetId (UUID — polymorphic reference)                         │
│  Reason (enum: Offensive, Dangerous, Spam, Other)                │
│  Detail (text, nullable, moderated)                              │
│  Status (enum: Pending, Reviewed, Dismissed)                     │
│  CreatedAt (timestamptz)                                         │
└──────────────────────────────────────────────────────────────────┘
```

**Key modeling decisions:**
- **UUIDv7 primary keys** — time-ordered via `Guid.CreateVersion7()` (.NET 9+). Reduces B-tree index fragmentation compared to random UUIDs. No auto-increment leakage, safe for client-generated IDs, no sequence contention.
- **Gap-based SortOrder** (100, 200, 300) — reorder stops without rewriting every row. Insert between 200 and 300 → use 250. On gap exhaustion (no integer between adjacent values), re-gap all stops in that hunt to fresh 100-increments.
- **Lazy claim expiration with optimistic concurrency** — no `ExpiresAt` column. Check `ClaimRenewedAt + 30 days < now` at scan time. Claim state changes are lazy (evaluated on scan), but **expiration notifications are proactive** — a daily `BackgroundService` queries for newly-expired claims and dispatches notifications via Channel (FR17/FR18). It does NOT change claim state — that stays lazy at scan time. Concurrency token: `Taag.ClaimRenewedAt` configured via `.IsConcurrencyToken()` in `TaagConfiguration.cs` (fluent API, not data annotation). EF Core includes the old value in the WHERE clause on updates, causing `DbUpdateConcurrencyException` if another transaction changed it — second write retries → sees the new controller.
- **Claim renewal is implicit** — scanning a Taag you control automatically extends `ClaimRenewedAt` by 30 days. No separate renewal endpoint. The scan outcome returns `claimRenewal` to trigger the appropriate client celebration.
- **NormalizedContent as unique index** — the primary lookup path. Normalize: lowercase scheme/host, strip trailing slash, sort query params, strip default ports (80/443), strip fragments, normalize URL encoding.
- **ScanEvent as append-only log** — never updated, never deleted. The audit trail and the analytics source. Partition by month when table exceeds ~10M rows (growth phase).
- **All timestamps are `timestamptz`** — PostgreSQL stores UTC, EF Core reads/writes DateTimeOffset.
- **Taags are never hard-deleted.** `Status` enum (Active/Suspended/Removed) controls visibility. Suspended/Removed Taags don't appear in new scan results. Hunts containing a suspended Taag: creator is notified, players mid-hunt get a skip option ("this stop is temporarily unavailable"). FK constraints stay intact, no cascading deletes.
- **HuntStop unique constraint `(HuntId, TaagId)`** — same Taag cannot appear twice in the same hunt. If a creator wants to revisit a location, they create a new hunt.
- **Player.DisplayName is intentionally NOT unique** — display names are cosmetic, not identifiers. Leaderboards show DisplayName + first 4 chars of PlayerId as discriminator if duplicates exist. Avoids display name squatting and onboarding friction.
- **Collection is derived, not stored.** A player's collection = all distinct Taags from their ScanEvents. No separate Collection entity. Query via `ScanEvent(PlayerId, ScannedAt DESC)` index.
- **Watchlist** — tracks which users are watching which Taags for notification dispatch when claims expire or change hands.
- **Report** — polymorphic target (Taag, Hunt, HuntStop) with status workflow (Pending → Reviewed/Dismissed). Low volume, admin-reviewed.

**Indexes (beyond PKs and unique constraints):**
- `Taag.NormalizedContent` — unique, the hottest query path
- `Taag.Location` — GiST spatial index for proximity queries
- `ScanEvent(PlayerId, TaagId)` — "has this player scanned this Taag before?"
- `ScanEvent(TaagId, ScannedAt DESC)` — "most recent scan of this Taag"
- `HuntStop(HuntId, SortOrder)` — ordered stop retrieval
- `HuntStop(TaagId)` — reverse lookup for scan-time hunt progression check ("which hunts include this Taag?")
- `HuntProgress(PlayerId, HuntId)` — unique, "is this player in this hunt?"
- `HuntProgress(PlayerId) WHERE CompletedAt IS NULL` — partial index, "what hunts is this player actively playing?" Used on every scan to check hunt progression.
- `ScanEvent(PlayerId, ScannedAt DESC)` — "all scans by this player, newest first" — powers the collection view
- `ScanEvent.IdempotencyKey` — unique, for retry deduplication
- `HuntStop(HuntId, TaagId)` — unique, prevents same Taag twice in one hunt
- `Watchlist(TaagId)` — "who is watching this Taag?" Used on claim expiry/change to dispatch notifications
- `Watchlist(PlayerId, TaagId)` — unique, prevents duplicate watchlist entries

**Scan-time hunt check (3-step query):**
1. Scan arrives → resolve QR content to TaagId via NormalizedContent lookup
2. **Check joined hunts:** `SELECT hp.*, hs.SortOrder FROM HuntProgress hp JOIN HuntStop hs ON hs.HuntId = hp.HuntId AND hs.TaagId = @taagId WHERE hp.PlayerId = @playerId AND hp.CompletedAt IS NULL` — if match and `hs.SortOrder` is the next expected stop → advance `CurrentStopOrder`. If last stop → set `CompletedAt`, trigger completion celebration.
3. **Check organic discovery (only if no joined-hunt match):** `SELECT h.*, hs.* FROM HuntStop hs JOIN Hunt h ON h.Id = hs.HuntId WHERE hs.TaagId = @taagId AND hs.SortOrder = 100 AND h.Status = 'Published' AND NOT EXISTS (SELECT 1 FROM HuntProgress hp WHERE hp.HuntId = h.Id AND hp.PlayerId = @playerId)` — if match, auto-create HuntProgress and return hunt info in ScanResultDto.
4. **Geofence verification** (both paths): `ST_DWithin(taag.Location, @scanLocation, huntStop.GeofenceRadius)` — PostGIS distance check. If outside geofence radius, hunt progression is not advanced (scan still succeeds as a normal Taag scan).

**Rationale:** Eight entities cover all MVP functionality including hunt tracking, watchlists, and community reporting. The model is normalized — no denormalization at MVP. Add materialized views or read models when query performance demands it, not before. Gap-based ordering is the simplest reorderable list pattern that doesn't require rewriting all rows on every move. HuntProgress is the minimum tracking entity needed for sequential hunt play — without it, the system cannot answer "which stop is this player on?"

## Implementation Patterns & Consistency Rules

_47 potential conflict points identified and resolved across 5 elicitation rounds. These patterns ensure AI agents write compatible, consistent code._

**Meta-rule:** The initial scaffold files are the canonical implementation examples. AI agents should match existing patterns in the codebase before consulting this document. When patterns conflict with the scaffold, the scaffold wins (and this document should be updated).

### Naming Patterns

**Database Naming (EF Core conventions — don't override):**

| Element | Convention | Example |
|---------|-----------|---------|
| Tables | PascalCase plural | `Players`, `Taags`, `ScanEvents`, `HuntStops` |
| Columns | PascalCase | `PlayerId`, `NormalizedContent`, `ClaimRenewedAt` |
| Foreign keys | `{ReferencedEntity}Id` | `PlayerId`, `TaagId`, `CreatorId` |
| Indexes | `IX_{Table}_{Columns}` | `IX_Taags_NormalizedContent`, `IX_ScanEvents_PlayerId_TaagId` |
| Unique constraints | `UQ_{Table}_{Columns}` | `UQ_HuntStops_HuntId_TaagId` |
| Enums | PascalCase values, **stored as integers** (EF Core default) | DB: `0, 1, 2` |
| Migrations | `{YYYYMMDD}_{NNN}_{Description}` | `20260315_001_AddWatchlistTable` |

Migration rules: never edit a committed migration. Create corrective migrations instead. Squash all migrations into a single initial migration before first production deployment.

**API Naming:**

| Element | Convention | Example |
|---------|-----------|---------|
| Endpoints | lowercase plural nouns, kebab-case for multi-word | `/api/v1/taags`, `/api/v1/scan-events` |
| Route parameters | camelCase in braces | `{huntId}`, `{taagId}` |
| Query parameters | camelCase | `?lat=`, `?lng=`, `?radiusMeters=` |
| JSON fields | camelCase (`System.Text.Json` default) | `{ "taagId": "...", "claimRenewedAt": "..." }` |
| Enum values in JSON | camelCase strings via `JsonStringEnumConverter` | `"firstDiscovery"`, `"published"` |

**DTO Taxonomy:**

| DTO Type | Naming | Purpose | Example |
|----------|--------|---------|---------|
| Detail | `{Entity}DetailDto` | Full single-resource response | `HuntDetailDto` |
| Summary | `{Entity}SummaryDto` | Embedded/nested in another response | `TaagSummaryDto` |
| List Item | `{Entity}ListItemDto` | Item in a collection response | `HuntListItemDto` |
| Request | `{Entity}{Action}Dto` | Inbound request body | `HuntCreateDto`, `ScanRequestDto` |
| Result | `{Entity}ResultDto` | Complex operation response | `ScanResultDto` |

**Code Naming (Backend — C#):**

| Element | Convention | Example |
|---------|-----------|---------|
| Private fields | `_camelCase` | `_dbContext`, `_logger` |
| Async methods | `{Name}Async` suffix | `ProcessScanAsync()`, `CheckTextAsync()` |
| DTOs | Per taxonomy above | `TaagSummaryDto`, `ScanRequestDto` |
| Interfaces | `I{Name}` — only when multiple implementations exist | `IContentModerator` (yes), ~~`IScanService`~~ (no) |
| Constants | PascalCase | `MaxContentLength = 2048`, `ClaimDurationDays = 30` |

**Code Naming (Frontend — TypeScript/React Native):**

| Element | Convention | Example |
|---------|-----------|---------|
| Components | PascalCase files and exports | `TaagCard.tsx`, `HuntProgressBar.tsx` |
| Hooks | `use{Name}` | `useScanMutation()`, `useActiveHunts()` |
| Services | camelCase files, named exports | `scannerService.ts`, `apiClient.ts` |
| Types | PascalCase, no `I` prefix (auto-generated from OpenAPI) | `Taag`, `ScanResponse` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRY_ATTEMPTS`, `SCAN_THROTTLE_MS` |
| Screen files | PascalCase | `ScanScreen.tsx`, `HuntDetailScreen.tsx` |
| Route names | kebab-case | `hunt-detail`, `taag-profile` |

### Structure Patterns

**Backend Test Organization:**

> **Note:** This test tree is superseded by the **Project Structure & Boundaries** section (Step 6). Use the Step 6 test tree for all file placement decisions.

```
TaagBack.Tests/
├── Features/
│   ├── Scanning/
│   │   ├── ScanServiceTests.cs
│   │   ├── NormalizationTests.cs
│   │   └── ConcurrentScanTests.cs
│   ├── Hunts/
│   │   ├── HuntServiceTests.cs
│   │   └── HuntProgressionTests.cs
│   └── Moderation/
│       └── ContentModeratorTests.cs
├── Infrastructure/
│   ├── TestFixture.cs              ← [SetUpFixture] — boots Testcontainers
│   ├── FakeContentModerator.cs     ← IContentModerator test double
│   ├── TestAuth.cs                 ← Auth stub helpers
│   └── ArchitecturalGuardrailTests.cs ← Day 1 scaffold
└── TaagBack.Tests.csproj
```

Tests mirror the source project's folder structure.

**Frontend Organization (expo-router):**

```
TaagBack/
├── app/                        ← expo-router file-based routing
│   ├── (tabs)/
│   │   ├── scan.tsx
│   │   ├── hunts.tsx
│   │   ├── collection.tsx
│   │   └── profile.tsx
│   ├── hunt/[huntId].tsx
│   ├── hunt/create.tsx
│   ├── taag/[taagId].tsx
│   └── _layout.tsx
├── src/
│   ├── components/             ← Shared (used by 2+ screens)
│   ├── services/
│   │   ├── scannerService.ts   ← Camera abstraction (no camera imports elsewhere)
│   │   ├── apiClient.ts        ← Typed fetch wrapper
│   │   └── authService.ts      ← Firebase abstraction (no Firebase imports elsewhere)
│   ├── hooks/
│   │   ├── useScanMutation.ts
│   │   └── useActiveHunts.ts
│   ├── types/
│   │   └── api.ts              ← Auto-generated from OpenAPI (never hand-edit)
│   └── utils/                  ← Only if used by 3+ files
├── assets/
└── tailwind.config.js
```

**Component placement rule:** Components used by only 1 screen live next to that screen. Components used by 2+ screens go in `src/components/`. This structure is an aspirational target — create folders as features require, don't pre-create empty directories.

**Configuration access pattern:** Services receive configuration via strongly-typed options injected through DI:
1. Define `{Feature}Options` class (e.g., `ScanOptions { MaxContentLength, ClaimDurationDays }`)
2. Register in `Program.cs`: `builder.Services.Configure<ScanOptions>(builder.Configuration.GetSection("Scan"))`
3. Inject in services: `IOptions<ScanOptions>`
4. `Program.cs` validates raw config at startup (fail-fast), then binds to options classes. Services only see `IOptions<T>`.

No raw `IConfiguration` injection in services.

**Entity Configuration Approach:** Use `IEntityTypeConfiguration<T>` fluent API for all relationship, index, constraint, and concurrency token configuration. Use data annotations only for simple property validation (`[Required]`, `[MaxLength]`). All EF-specific configuration lives in one place per entity in `Data/Configurations/`.

**Service Splitting Rule:** When a service file exceeds ~400 lines or handles 3+ distinct sub-domains, split by responsibility within the same feature folder. Example: `HuntService.cs` → `HuntService.cs` (CRUD) + `HuntPlayService.cs` (join, progression, completion). Both live in `Hunts/`. The controller can inject multiple services from the same feature folder. **Exception:** `ScanService` is intentionally an orchestrator with many dependencies — it coordinates a single pipeline across multiple domain services. Do NOT split it by responsibility. If it grows beyond ~400 lines, extract helper methods within the same class.

**Frontend Import Restrictions (ESLint `no-restricted-imports`):** Enforce in `.eslintrc`:
- `@react-native-firebase/*` — restricted to `authService.ts` only
- Camera library package — restricted to `scannerService.ts` only
These rules run in frontend CI, catching violations at build time.

**Provider-Agnostic Naming Rule:** Code-level names (entity fields, class names, file names) describe what something *does*, not which vendor it uses. Provider-specific names belong in configuration and documentation only. Examples: `ExternalAuthId` (not `FirebaseUid`), `JwtAuthHandler` (not `FirebaseAuthHandler`), `ExternalContentModerator` (not `OpenAiContentModerator`). Guardrail test #8 enforces this.

### API Endpoint Patterns

**Core Endpoints (MVP):**

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/scans` | Authenticated | Submit a scan (`ScanRequestDto` → `ScanResultDto`) |
| PUT | `/api/v1/taags/{taagId}/name` | PromotedAccount | Name a Taag (moderation inline) |
| GET | `/api/v1/taags/{taagId}` | Authenticated | Taag detail (`TaagDetailDto`) |
| GET | `/api/v1/taags?lat=&lng=&radiusMeters=` | Authenticated | Spatial query, max 100, Active only |
| POST | `/api/v1/hunts` | PromotedAccount | Create hunt → 201 + `HuntDetailDto` |
| GET | `/api/v1/hunts/{huntId}` | Authenticated | Hunt detail |
| PUT | `/api/v1/hunts/{huntId}` | PromotedAccount (creator) | Update hunt (full replacement, PUT) |
| POST | `/api/v1/hunts/{huntId}/stops` | PromotedAccount (creator) | Add single stop → 201 + `HuntStopDetailDto` |
| DELETE | `/api/v1/hunts/{huntId}/stops/{stopId}` | PromotedAccount (creator) | Remove stop |
| POST | `/api/v1/hunts/{huntId}/stops/reorder` | PromotedAccount (creator) | Reorder stops `{ stopIds: [...] }` |
| POST | `/api/v1/hunts/{huntId}/join` | Authenticated | Join hunt → `HuntProgressDto` + first clue |
| GET | `/api/v1/players/me/collection` | Authenticated | My scanned Taags (derived from ScanEvents) |
| GET | `/api/v1/players/me/hunts` | Authenticated | My active/completed hunts |
| DELETE | `/api/v1/hunts/{huntId}` | PromotedAccount (creator) | Archive hunt (sets Status = Archived) |
| POST | `/api/v1/taags/{taagId}/watchlist` | Authenticated | Add Taag to watchlist |
| DELETE | `/api/v1/taags/{taagId}/watchlist` | Authenticated | Remove Taag from watchlist |
| GET | `/api/v1/players/me/watchlist` | Authenticated | My watchlisted Taags |
| POST | `/api/v1/reports` | Authenticated | Submit a report |
| GET | `/api/v1/leaderboards/{type}` | AllowAnonymous | `sourcers`, `scanners`, `hunters` |
| GET | `/api/v1/admin/reports` | AdminOnly | List reports (filterable by status) |
| PUT | `/api/v1/admin/reports/{reportId}` | AdminOnly | Update report status (Reviewed/Dismissed) |
| PUT | `/api/v1/admin/taags/{taagId}/status` | AdminOnly | Change Taag status (Active/Suspended/Removed) |
| GET | `/health` | AllowAnonymous (not versioned) | Health check |

**Response conventions:**
- All POST (create) → 201 + full detail DTO + `Location` header
- All PUT (update) → 200 + full updated detail DTO
- All GET (single) → 200 + detail DTO
- All GET (collection) → 200 + array of list item DTOs, implicit ceiling of 500 items (no pagination params at MVP)
- All DELETE → 204 No Content (hunt DELETE is soft-delete via Status = Archived — active players mid-hunt can complete it; hunt no longer appears in discovery)

### Concrete DTO Shapes

**ScanRequestDto (client → server):**
```
qrContent: string        — raw encoded data from scanner, max 2048 chars
location: {               — nullable (omitted for anonymous/COPPA users)
  latitude: number
  longitude: number
}
idempotencyKey: string    — client-generated UUIDv4
```
Client never sends a TaagId. QR content is the identifier from the client's perspective. Server normalizes, resolves/creates the Taag, evaluates hunt progression.

**ScanResultDto (server → client):**
```
outcome: ScanOutcome      — always present (firstDiscovery, claimRenewal, collection, contestedClaim)
taag: TaagSummaryDto      — always present
isNewDiscovery: bool      — always present
pioneerEligible: bool     — can this user name the Taag?
claimStatus: string       — "claimed", "expired", "available"
huntProgress: {           — nullable (only if scan advanced a hunt)
  huntId: uuid
  huntTitle: string
  currentStopOrder: int
  totalStops: int
  nextClue: string?       — null if hunt just completed
  isComplete: bool
}
```

**TaagSummaryDto:**
```
id: uuid
customName: string?
approximateLocation: string?    — neighborhood/city level (GPS truncated to 2 decimal places ~1.1km)
claimStatus: string
originalDiscoverer: PlayerSummaryDto
currentController: PlayerSummaryDto?
```

**PlayerSummaryDto:**
```
displayName: string
discriminator: string           — first 4 chars of PlayerId (for display name deduplication)
```

**LeaderboardDto:**
```
type: string                    — "sourcers", "scanners", "hunters"
entries: [{
  rank: int
  player: PlayerSummaryDto
  score: int
}]
```

**Location approximation:** Server truncates GPS to 2 decimal places (~1.1km precision) in DTO mapping for all public API responses. Precise coordinates stay in PostGIS. Truncation happens in the service layer, never exposed.

### Communication Patterns

**Channel Message Structure:**
```csharp
public record ScanNotification(
    Guid TaagId,
    Guid ScannerId,
    ScanOutcome Outcome,
    string TraceId,           // HttpContext.TraceIdentifier for log correlation
    DateTimeOffset OccurredAt
);
```
All Channel messages are immutable records with `TraceId` and `OccurredAt`.

**TanStack Query Key Conventions:**
```typescript
['taags', taagId]                        // single taag
['taags', 'list', { lat, lng, radius }]  // spatial query
['hunts', huntId]                        // single hunt
['hunts', huntId, 'stops']               // hunt stops
['players', 'me', 'collection']          // current user's collection
['players', 'me', 'hunts']              // current user's hunts
['players', playerId, 'collection']      // other player's collection
['leaderboard', type]                    // leaderboard by type
```
Entity name first, always plural. Current user uses `'me'`, other players use their ID.

**Mutation response pattern:** Scan mutation returns full `ScanResultDto` — one round trip, no follow-up fetch needed.

### Process Patterns

**DB Write = Commit Point:** The scan itself always succeeds if the DB write succeeds. Everything after (Channel notification, async effects) is best-effort. Naming is a separate operation from scanning (separate endpoint, separate request). Moderation only runs on naming/UGC endpoints, never on every scan.

**Concurrency Retry Pattern:** On `DbUpdateConcurrencyException` (e.g., simultaneous claim on contested Taag): reload entity from DB, re-evaluate business logic, retry once. If second attempt also fails, return 409 Conflict. Max 1 retry. Applies to all optimistic concurrency scenarios.

**Client Error Handling (4 rules):**
1. **429** → silent retry with backoff (never show to user)
2. **Network error on scan** → queue offline with idempotency key, show "Saved, will sync when online"
3. **Known Problem Details type** → map to user-friendly message per type
4. **Everything else** → generic "Something went wrong" with retry button

Never show HTTP status codes, raw error messages, or technical details to the user.

**Auth Fallback:** On persistent 401 after token refresh failure → show re-authentication screen ("Please sign in again"). **NEVER** silently create a new anonymous session — that's invisible data loss. User must explicitly choose to continue as new anonymous user or sign in to recover their account.

**Offline Scan Queue Drain:** When connectivity resumes, drain at 1 scan every 2 seconds (fixed 2000ms interval via TanStack Query `retryDelay`). This rate stays within the 30/min authenticated rate limit. Show progress: "Syncing 47 of 312 scans..." Queue is manually orchestrated via `useMutation` with `onSettled` triggering next item. Large queues (500+ scans) take ~17 minutes to sync — the batch endpoint (`POST /api/v1/scans/batch`) is the priority post-MVP improvement.

**ScannerService Decision Flow (client-side):**
1. `onCodeScanned(data)` → check content length ≤ 2048 (reject if longer)
2. Check if TaagBack URL → route to deep link handler, return (no API call)
3. Otherwise → call scan API mutation with `ScanRequestDto`

Three steps, in order, before any API call.

**Validation Pattern:**
- Client-side: validate for UX only (field length, required fields). Never trust.
- Server-side: two layers — (1) model validation via data annotations → automatic 400 Problem Details, (2) business validation in services → custom Problem Details types.

**SortOrder Management:** Server assigns and manages all SortOrder values. Client sends ordered arrays. Hunt creation: client sends stops as ordered array, server assigns `index × 100`. Reorder: client sends `{ stopIds: [...] }`, server re-assigns `index × 100`. No client-side gap math.

**Hunt Join Pattern:** Two entry points create `HuntProgress`:
1. **Explicit join** — `POST /api/v1/hunts/{huntId}/join`. Creates HuntProgress with `CurrentStopOrder = 0`. Returns hunt details + first clue.
2. **Organic discovery** — during scan, if scanned Taag is stop #1 of a published hunt the player hasn't joined, auto-create HuntProgress and include hunt info in `ScanResultDto`.

Scan-time hunt check: first check active HuntProgress (joined hunts), then lightweight check for "is this Taag stop #1 of any unjoinable published hunt?"

**Permission-Gated Operations:** Custom ASP.NET Core authorization policy `RequirePromotedAccount`. Applied via `[Authorize(Policy = "PromotedAccount")]` on endpoints requiring non-anonymous users (Taag naming, hunt creation). Policy checks `IsAnonymous` claim from Firebase JWT. No scattered `if (user.IsAnonymous)` checks in services.

**Deep Link Format:** `https://taagback.app/hunt/{huntId}`. Expo universal links handle resolution. Web fallback landing page is post-MVP. Hunt IDs are UUIDv7 — functional, not pretty. Vanity URLs are post-MVP.

**Expiration Notification Service:** A lightweight daily `BackgroundService` with `PeriodicTimer` queries for claims where `ClaimRenewedAt + 30 days < now` and dispatches notifications to previous controllers (FR17) and watchlist subscribers (FR18) via the existing bounded Channel. This service does NOT change claim state — claims remain lazy-evaluated at scan time. No Hangfire/Quartz.

**Taag Suspension Notification Flow:** When admin changes Taag status via `PUT /admin/taags/{id}/status`, `AdminService` queries `HuntStop(TaagId)` index to find all Hunts containing that Taag, then dispatches creator notifications via Channel. Players mid-hunt get a skip option on the suspended stop.

**Circuit Breaker (Moderation API):** Use Polly v8 via `Microsoft.Extensions.Http.Resilience`. Configure on the OpenAI Moderation `HttpClient`: 2s timeout, circuit breaks after 3 failures, 5min open duration. One line in `Program.cs` via `AddStandardResilienceHandler()`. No manual counter.

**Native Dependency Swap Checklist:** When swapping a dependency behind an abstraction: (1) update the abstraction implementation file, (2) update `package.json`, (3) update `app.config.ts` plugins array if applicable, (4) create new development build via `eas build --profile development`.

### Cross-Domain Code Placement

When a feature spans multiple domains (e.g., watchlist notifications triggered by scan pipeline):
- **Trigger** lives in the caller's domain (ScanService calls the notification)
- **Query logic** lives in the entity's domain (TaagService answers "who watches this Taag?")
- **Infrastructure dispatch** lives in `Infrastructure/` (Channel write, push notification send)

Services within the same bounded context (Scanning ↔ Taags ↔ Hunts) may inject each other. No circular dependencies — if one arises, extract shared logic to a new service. LeaderboardService queries DbContext directly for read-only aggregations.

### Auth Stubbing in Tests

Use ASP.NET Core's `WebApplicationFactory` with a test authentication handler. Auth is the one layer that's faked in tests — everything else uses real implementations or configurable doubles.

```
TestAuth.AsAnonymous()              → claims with IsAnonymous = true
TestAuth.AsPromotedUser(playerId)   → claims with IsAnonymous = false
TestAuth.AsAdmin(playerId)          → future use
```

`IContentModerator` uses `FakeContentModerator` with configurable results (pass/reject/timeout) for testing moderation paths.

### Architectural Guardrail Tests

`ArchitecturalGuardrailTests.cs` is part of the Day 1 scaffold. Three tests:

1. **No EF entities in API responses** — reflection scan of all controller action return types, assert none are entity types from `AppDbContext`
2. **No unprotected endpoints** — all controller actions have `[Authorize]` or explicit `[AllowAnonymous]`, no accidentally open endpoints
3. **No content fields in DTOs** — no DTO class contains properties named `NormalizedContent` or `RawContent`, enforcing the data exposure policy

### Anti-Patterns (Explicitly Banned)

- ❌ `Task.Run()` — use `BackgroundService` via Channel
- ❌ `Database.Migrate()` in `Program.cs` — migrations are a deployment step
- ❌ String interpolation in `ILogger` calls — use structured parameters (CA2254 enforced)
- ❌ `AllowAnyOrigin()` in CORS — use configured origins
- ❌ Returning `NormalizedContent` or `RawContent` in any API response
- ❌ Service interfaces for single-implementation services
- ❌ Manual loading state (`useState(false)`) — use TanStack Query
- ❌ Firebase SDK imports outside `authService.ts`
- ❌ Camera library imports outside `scannerService.ts`
- ❌ GPS coordinates in `Information`-level logs
- ❌ Raw `IConfiguration` injection in services — use `IOptions<T>`
- ❌ Editing committed migrations — create corrective migrations
- ❌ Silently creating new anonymous sessions on auth failure
- ❌ PATCH semantics at MVP — use PUT (full replacement)
- ❌ Pre-creating empty folder structures without `.gitkeep` — scaffold all folders from project tree with `.gitkeep` placeholders; delete `.gitkeep` when adding first real file

## Project Structure & Boundaries

### Complete Project Directory Structure

**Backend — `TaagBack.Api/`**

```
TaagBack.Api/
├── Program.cs
├── GlobalUsings.cs
├── TaagBack.Api.csproj
├── appsettings.json
├── appsettings.Development.json
├── appsettings.Production.json
├── .editorconfig
├── openapi.json                          # Committed spec — source of truth for frontend types
│
├── Data/
│   ├── TaagBackDbContext.cs
│   └── Configurations/                   # IEntityTypeConfiguration<T> per entity
│       ├── PlayerConfiguration.cs
│       ├── TaagConfiguration.cs
│       ├── ScanEventConfiguration.cs
│       ├── HuntConfiguration.cs
│       ├── HuntStopConfiguration.cs
│       ├── HuntProgressConfiguration.cs
│       ├── WatchlistConfiguration.cs
│       └── ReportConfiguration.cs
│
├── Scanning/
│   ├── ScanController.cs
│   ├── ScanService.cs
│   ├── QrContentNormalizer.cs            # Security-critical boundary — own file
│   └── Models/
│       ├── ScanRequestDto.cs
│       ├── ScanResultDto.cs
│       └── ScanEvent.cs                  # Entity
│
├── Taags/
│   ├── TaagsController.cs
│   ├── TaagService.cs
│   └── Models/
│       ├── TaagDetailDto.cs
│       ├── TaagSummaryDto.cs
│       ├── TaagNamingRequestDto.cs
│       └── Taag.cs                       # Entity (includes Status: Active/Suspended/Removed)
│
├── Hunts/
│   ├── HuntsController.cs
│   ├── HuntService.cs
│   └── Models/
│       ├── HuntDetailDto.cs
│       ├── HuntSummaryDto.cs
│       ├── HuntCreateDto.cs
│       ├── HuntProgressDto.cs
│       ├── HuntStopDto.cs
│       ├── Hunt.cs                       # Entity
│       ├── HuntStop.cs                   # Entity
│       └── HuntProgress.cs              # Entity
│
├── Players/
│   ├── PlayersController.cs
│   ├── PlayerService.cs
│   └── Models/
│       ├── PlayerProfileDto.cs
│       ├── PlayerSummaryDto.cs
│       ├── CollectionItemDto.cs
│       └── Player.cs                     # Entity
│
├── Leaderboard/
│   ├── LeaderboardController.cs
│   ├── LeaderboardService.cs
│   └── Models/
│       ├── LeaderboardDto.cs
│       └── LeaderboardEntryDto.cs
│
├── Reports/
│   ├── ReportsController.cs
│   ├── ReportService.cs
│   └── Models/
│       ├── ReportCreateDto.cs
│       └── Report.cs                     # Entity
│
├── Watchlist/
│   ├── WatchlistController.cs
│   ├── WatchlistService.cs
│   └── Models/
│       ├── WatchlistItemDto.cs
│       └── Watchlist.cs                  # Entity
│
├── Admin/
│   ├── AdminController.cs
│   ├── AdminService.cs
│   └── Models/
│       ├── ReportListItemDto.cs
│       └── TaagStatusUpdateDto.cs
│
├── Shared/
│   ├── Auth/
│   │   └── JwtAuthHandler.cs
│   ├── ContentModeration/
│   │   ├── IContentModerator.cs          # The one interface that earns its existence
│   │   └── ExternalContentModerator.cs
│   └── Infrastructure/
│       ├── NotificationChannel.cs        # Bounded Channel<T> ~1000 capacity
│       └── NotificationBackgroundService.cs
│
├── Middleware/
│   ├── ProblemDetailsMiddleware.cs
│   └── RateLimitingMiddleware.cs
│
└── Migrations/                           # EF Core migrations — serial generation only
    └── .gitkeep
```

**Backend Tests — `TaagBack.Tests/`**

```
TaagBack.Tests/
├── TaagBack.Tests.csproj
├── GlobalUsings.cs
│
├── Fixtures/
│   ├── TestDatabaseFixture.cs            # Testcontainers PostGIS, [SetUpFixture]
│   ├── TestWebApplicationFactory.cs
│   ├── TestAuth.cs                       # AsAnonymous(), AsPromotedUser(), AsAdmin()
│   ├── FakeContentModerator.cs           # Configurable pass/reject/timeout
│   └── TestDataBuilder.cs               # Fluent builder for consistent test entities
│
├── Scanning/
│   ├── ScanServiceTests.cs
│   ├── ScanControllerTests.cs
│   └── QrContentNormalizerTests.cs       # Security-critical boundary — thorough coverage
│
├── Taags/
│   ├── TaagServiceTests.cs
│   └── TaagsControllerTests.cs
│
├── Hunts/
│   ├── HuntServiceTests.cs
│   └── HuntsControllerTests.cs
│
├── Players/
│   ├── PlayerServiceTests.cs
│   └── PlayersControllerTests.cs
│
├── Leaderboard/
│   ├── LeaderboardServiceTests.cs
│   └── LeaderboardControllerTests.cs
│
├── Reports/
│   └── ReportServiceTests.cs
│
├── Watchlist/
│   └── WatchlistServiceTests.cs
│
└── Architecture/
    └── ArchitecturalGuardrailTests.cs    # 5+ guardrail tests (see below)
```

**Frontend — `TaagBack/` (React Native / Expo)**

```
TaagBack/
├── package.json
├── tsconfig.json
├── app.config.ts
├── babel.config.js
├── .prettierrc
├── metro.config.js
│
├── src/
│   ├── app/                              # Expo Router file-based routing
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── scan.tsx
│   │   │   ├── collection.tsx
│   │   │   ├── hunts.tsx
│   │   │   ├── leaderboard.tsx
│   │   │   └── profile.tsx
│   │   └── hunt/
│   │       └── [huntId].tsx
│   │
│   ├── components/
│   │   ├── ui/                           # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorBoundary.tsx         # Top-level + per-screen boundaries
│   │   ├── scanning/
│   │   │   ├── ScannerView.tsx
│   │   │   └── ScanResultOverlay.tsx
│   │   ├── taags/
│   │   │   ├── TaagCard.tsx
│   │   │   └── TaagNamingSheet.tsx
│   │   ├── hunts/
│   │   │   ├── HuntCard.tsx
│   │   │   ├── ClueDisplay.tsx
│   │   │   └── CompletionCrescendo.tsx
│   │   └── celebrations/
│   │       ├── PioneerCelebration.tsx
│   │       └── ConfettiOverlay.tsx
│   │
│   ├── services/
│   │   ├── api.ts                        # Generated types from openapi.json + fetch client
│   │   ├── authService.ts                # Firebase Auth wrapper — sole Firebase import point
│   │   ├── scannerService.ts             # Camera abstraction — sole camera import point
│   │   └── offlineQueue.ts               # Scan queue with drain logic
│   │
│   ├── hooks/
│   │   ├── useScanner.ts                 # Camera + scan pipeline hook
│   │   ├── useCollection.ts
│   │   ├── useHunts.ts
│   │   ├── useLeaderboard.ts
│   │   └── useAuth.ts
│   │
│   ├── types/
│   │   └── api.ts                        # openapi-typescript output — string unions, not enums
│   │
│   └── utils/
│       ├── constants.ts
│       └── formatting.ts
│
├── assets/
│   ├── images/
│   └── fonts/
│
└── __tests__/                            # Mirrors src/ structure
    ├── services/
    │   └── scannerService.test.ts
    └── components/
        └── scanning/
            └── ScannerView.test.tsx
```

**Root — Repository Level**

```
TaagBack (repo root)/
├── TaagBack.slnx                         # .NET solution file
├── .gitignore
├── .github/
│   └── workflows/
│       ├── backend-ci.yml                # dotnet build → test → openapi validate → docker
│       └── frontend-ci.yml              # npm ci → lint → test:structure → type-check
├── docker-compose.yml                    # Local dev: PostGIS + API
├── Dockerfile                            # Multi-stage: build → publish → runtime
├── CLAUDE.md
├── _bmad/                                # BMAD method configuration
└── _bmad-output/                         # Planning artifacts
```

### Architectural Boundaries

**API Boundaries:**

| Boundary | Pattern | Enforcement |
|----------|---------|-------------|
| External API surface | `api/v1/{feature}/{resource}` | Controllers only in feature folders |
| Auth boundary | Firebase JWT → ASP.NET claims | `JwtAuthHandler.cs` in `Shared/Auth/` |
| Moderation boundary | `IContentModerator` interface | Only implementation touches OpenAI SDK |
| Rate limiting | Per-endpoint config in `Program.cs` | `RateLimitingMiddleware.cs` |

**Component Boundaries:**

| Boundary | Rule | Rationale |
|----------|------|-----------|
| Scanner abstraction | Only `scannerService.ts` imports camera library | Swap camera libs without touching UI |
| Auth abstraction | Only `authService.ts` imports Firebase SDK | Firebase is implementation detail |
| State management | TanStack Query for all server state | No manual `useState` for loading/data |
| Error boundaries | `ErrorBoundary` at app root + per-screen | Crash isolation prevents full-app failure |

**Service Boundaries:**

| Boundary | Rule |
|----------|------|
| DbContext access | Services inject `TaagBackDbContext` directly — no repository pattern |
| Cross-feature calls | Feature A calls Feature B's *Service* — never queries B's entities directly |
| Shared/ admission | File must be used by 3+ feature folders to live in `Shared/` |
| Infrastructure | Channel writes and push notifications only in `Shared/Infrastructure/` |

**Data Boundaries:**

| Boundary | Rule |
|----------|------|
| Entity ↔ DTO | Entities never leave the service layer. All controller returns are DTOs. |
| NormalizedContent/RawContent | Never in any DTO. Guardrail test enforces. |
| Location precision | GPS truncated to 2 decimal places in service layer DTO mapping |
| Precise coordinates | Stored in PostGIS, accessible only to spatial queries server-side |

### Cross-Feature Dependency Map

Expected service-to-service dependencies at MVP:

```
ScanService → TaagService         (check/create Taag on scan)
ScanService → HuntService         (check if Taag is a hunt stop)
HuntService → TaagService         (validate Taag exists when adding stop)
LeaderboardService → DbContext    (read-only aggregation queries, no service dependencies)
WatchlistService → TaagService    (validate Taag exists)
ReportService → (standalone)      (writes Report entity, no cross-feature calls)
PlayerService → (standalone)      (manages Player entity and profile)
```

**Circular dependency rule:** If a circular dependency arises between two services, extract the shared logic into a new service in the dependent feature folder. Do NOT move it to `Shared/` unless 3+ features need it.

### Requirements to Structure Mapping

**FR Domain → File Mapping:**

| FR Domain | Controller | Service | Entity | Key DTOs |
|-----------|-----------|---------|--------|----------|
| QR Scanning & Taag Management (FR1-8) | `Scanning/ScanController.cs` | `Scanning/ScanService.cs`, `Taags/TaagService.cs` | `ScanEvent.cs`, `Taag.cs` | `ScanRequestDto`, `ScanResultDto`, `TaagNamingRequestDto` |
| Collection & Discovery (FR9-13) | `PlayersController.cs`, `TaagsController.cs` | `PlayerService.cs`, `TaagService.cs` | Derived from `ScanEvent` | `CollectionItemDto`, `TaagSummaryDto` |
| Claim Maintenance (FR14-18) | `TaagsController.cs`, `WatchlistController.cs` | `TaagService.cs`, `WatchlistService.cs` | `Taag.cs`, `Watchlist.cs` | `WatchlistItemDto` |
| Hunt Builder (FR19-24) | `HuntsController.cs` | `HuntService.cs` | `Hunt.cs`, `HuntStop.cs` | `HuntCreateDto`, `HuntDetailDto`, `HuntStopDto` |
| Hunt Play (FR25-29) | `HuntsController.cs` | `HuntService.cs` | `HuntProgress.cs` | `HuntProgressDto` |
| Leaderboards (FR30-33) | `LeaderboardController.cs` | `LeaderboardService.cs` | (aggregation queries) | `LeaderboardDto` |
| Safety & Reporting (FR34-39) | `ReportsController.cs` | `ReportService.cs` | `Report.cs` | `ReportCreateDto` |
| Auth & Accounts (FR40-47) | (middleware) | `PlayerService.cs` | `Player.cs` | `PlayerProfileDto` |

### Architectural Guardrail Tests

`ArchitecturalGuardrailTests.cs` — expanded to 8 tests, all part of Day 1 scaffold:

1. **No EF entities in API responses** — reflection scan of all controller return types, assert none are entity types
2. **No unprotected endpoints** — all controller actions have `[Authorize]` or `[AllowAnonymous]`
3. **No content fields in DTOs** — no DTO contains `NormalizedContent` or `RawContent` properties
4. **Feature folder structure** — all source files (excluding `Program.cs`, `GlobalUsings.cs`, middleware) live in recognized feature folders or `Shared/`. Allow-list: `Scanning`, `Taags`, `Hunts`, `Players`, `Leaderboard`, `Reports`, `Watchlist`, `Admin`, `Shared`, `Middleware`, `Data`
5. **Migration chain linearity** — reads all migration files, verifies single-lineage snapshot chain (no forks from parallel generation)
6. **Every service has tests** — each `*Service.cs` in source has a corresponding `*ServiceTests.cs` in tests
7. **Cross-feature entity access** — scan service files for `DbSet` access patterns, verify each service only accesses entities within its own feature folder (LeaderboardService is a documented exception for read-only aggregations)
8. **No provider-specific names in entities or DTOs** — reflection scan for properties/classes containing vendor names (Firebase, OpenAI, etc.) in entity or DTO types

### Integration Points

**Internal Communication:**

```
Controller → Service → DbContext         (standard request flow)
Service → Channel<T> → BackgroundService  (async notifications, best-effort)
Service → IContentModerator              (moderation, 2s timeout + circuit breaker)
```

**External Integrations:**

| Integration | Abstraction | Config |
|-------------|-------------|--------|
| Firebase Auth | `JwtAuthHandler.cs` | JWKS endpoint + degraded auth mode on failure |
| Firebase App Check | ASP.NET middleware | Play Integrity / DeviceCheck attestation |
| OpenAI Moderation | `IContentModerator` | 2s timeout, circuit breaker (3 failures → 5min) |
| PostGIS | EF Core + NetTopologySuite | Connection string in `appsettings.{env}.json` |

**Data Flow — Scan Pipeline (9 steps):**

```
1. Camera captures QR → scannerService.ts
2. Content length check (≤2048) → reject or continue
3. Self-referential URL check → deep link handler or continue
4. ScanRequestDto → POST /api/v1/scans
5. QrContentNormalizer.cs → normalize + hash
6. ScanService → upsert Taag, create ScanEvent, evaluate claim
7. Channel.TryWrite() → notification (best-effort)
8. Return ScanResultDto (DB write = commit point)
9. Client → celebration UX based on outcome
```

### File Organization Patterns

**Configuration Files:**
- Backend: `appsettings.json` (base) + `appsettings.{Environment}.json` (overrides) + environment variables in production
- Frontend: `app.config.ts` (Expo) + environment variables via EAS
- Entity configuration: one `IEntityTypeConfiguration<T>` file per entity in `Data/Configurations/`

**Source Organization:**
- Feature folders at top level of `src/` (backend) and `src/` (frontend)
- Each backend feature folder: Controller, Service, `Models/` subfolder (~3-5 DTOs + entity)
- Each frontend feature area: screen in `app/`, components in `components/{feature}/`, hook in `hooks/`
- No `BaseEntity` — entities are plain POCOs with no inheritance

**Test Organization:**
- Tests mirror source feature folder structure exactly
- `Fixtures/` folder for shared test infrastructure
- `Architecture/` folder for guardrail tests
- All tests use Testcontainers with real PostGIS — no in-memory database fakes
- Transaction rollback per test for isolation

**Asset Organization:**
- Frontend: `assets/images/` and `assets/fonts/`
- Backend: no static assets (API-only)

### Development Workflow Integration

**Local Development:**
- `docker-compose.yml` runs PostGIS container
- `dotnet run --project TaagBack.Api` starts API on `http://localhost:5218`
- Frontend connects to local API via environment config
- `npx expo start` for React Native dev server

**CI/CD Pipeline:**
- **Backend CI** (`backend-ci.yml`): `dotnet build` → `dotnet test` (Testcontainers) → validate `openapi.json` matches API → Docker image build (tagged with git SHA)
- **Frontend CI** (`frontend-ci.yml`): `npm ci` → `npm run lint` → `npm run test:structure` (directory allow-list) → TypeScript type-check
- **Migrations**: Separate CI/CD step, never `Database.Migrate()` in `Program.cs`
- Main branch only — no feature branch CI

**Deployment:**
- Docker image tagged with git SHA
- Environment-specific config via environment variables (not appsettings overrides in production)
- Database migrations run as separate deployment step before application deployment

### Agent Development Notes

This application is developed primarily by AI agents. Structure decisions prioritize:

- **Predictability over cleverness** — file locations follow mechanical rules, no judgment calls
- **Allow-list enforcement** — guardrail tests define what's permitted, not what's banned
- **`.gitkeep` scaffolding** — all folders from project tree are pre-created with `.gitkeep` placeholders; agents delete `.gitkeep` when adding the first real file to a folder
- **Serialized migrations** — only one agent generates a migration at a time; migration-generating tasks are mutually exclusive
- **Explicit dependency map** — cross-feature service calls are documented above; agents should not create undocumented dependencies
- **OpenAPI as contract** — regenerate `openapi.json` after any controller change; CI validates spec matches API

### Non-URL QR Content Normalization

`QrContentNormalizer.cs` handles non-URL content (e.g., plain text, vCards):
- Trim leading/trailing whitespace
- Normalize line endings to `\n`
- Apply NFC Unicode normalization
- Hash uses the normalized form

### Cache Invalidation Pattern

`IMemoryCache` with 30-second TTL at MVP. Invalidation rules:
- Leaderboard entries: TTL-based only (30s staleness acceptable)
- Taag spatial queries: TTL-based only
- No explicit cache invalidation on writes at MVP — 30s eventual consistency is acceptable for all read paths
- If a specific endpoint needs fresher data post-MVP, add explicit `cache.Remove(key)` in the relevant service's write method

### Admin Authorization Policy

```csharp
// Program.cs
options.AddPolicy("AdminOnly", policy => policy.RequireClaim("admin", "true"));
```

Admin policy applied to `GET /admin/reports`, `PUT /admin/reports/{id}`, and `PUT /admin/taags/{id}/status` at MVP. No admin UI — endpoints are callable via Postman/curl for content moderation. Admin claim is set manually in the auth provider — no self-service admin promotion.

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All major technology choices are compatible and version-aligned: .NET 10 + EF Core + Npgsql + NetTopologySuite + PostGIS, React Native 0.83 / Expo SDK 55 + TanStack Query + expo-router, Firebase Auth JWT via ASP.NET Core JwtBearer. No version conflicts. All 6 ADRs work together without contradiction.

**Pattern Consistency:**
All naming conventions are consistent across the document — DTO taxonomy, endpoint naming, code naming, and enum handling (integer in DB, camelCase string in JSON). The 47 conflict points resolved across 5 elicitation rounds in Step 5 ensure AI agents write compatible code. Provider-agnostic naming rule applied uniformly.

**Structure Alignment:**
The Step 6 project tree supports all architectural decisions. Feature folders (ADR-1), bounded Channel in `Shared/Infrastructure/` (ADR-2), entity configurations in `Data/Configurations/`, guardrail tests in `Architecture/`. Supersession notes added to earlier sections to prevent confusion from incremental document evolution.

**Resolved coherence issues:**
- Step 2/Step 6 structural divergence → supersession notes added to Step 2 project tree and Step 5 test structure
- Scan endpoint typo in data flow (`scan` → `scans`) → fixed
- Generated types filename (`generated.ts` vs `api.ts`) → unified to `api.ts`
- Provider-specific naming (`FirebaseUid`, `FirebaseAuthHandler`, `OpenAiContentModerator`) → renamed to agnostic equivalents

### Requirements Coverage Validation ✅

**Functional Requirements Coverage (47/47):**

| FR Range | Status | Architectural Support |
|----------|--------|----------------------|
| FR1-FR6 | ✅ | Scan pipeline, Taag entity, QrContentNormalizer, content moderation |
| FR7 | ⬜ | Phase 2 (Gen AI) — correctly excluded from MVP |
| FR8 | ✅ | Three-tier attribution on Taag entity |
| FR9-FR13 | ✅ | Collection derived from ScanEvents, Watchlist entity, LeaderboardService, PlayerService |
| FR14-FR18 | ✅ | Lazy claim expiration + daily expiration notification BackgroundService |
| FR19-FR25 | ✅ | Hunt CRUD, stop sequencing, deep links, publish flow |
| FR26-FR32 | ✅ | 3-step scan-time hunt check, HuntProgress, geofence via ST_DWithin, completion |
| FR33 | ✅ | Safety/TOU gate — client-side concern |
| FR34-FR38 | ✅ | IContentModerator, Report entity, admin endpoints, moderation-rejected Problem Details |
| FR36-FR37 | ✅ | Admin endpoints added: `GET /admin/reports`, `PUT /admin/reports/{id}`, `PUT /admin/taags/{id}/status` |
| FR39-FR43 | ✅ | Anonymous-first, account promotion via linkWithCredential, age verification, social login |
| FR44-FR47 | ✅ | Anti-fraud in cross-cutting concerns, rate limiting per ADR-5 |

**Non-Functional Requirements Coverage (22/22):**

| NFR Range | Status | Notes |
|-----------|--------|-------|
| NFR1-NFR3 | ✅ | Scan pipeline time budget documented (~135ms server-side) |
| NFR4 | ✅ | Relaxed to 30s for MVP — matches IMemoryCache TTL. PRD's 10s target is aspirational. Add explicit cache invalidation on scan writes if real-time leaderboards become a user request. |
| NFR5 | ✅ | Cold start <4s addressed |
| NFR6-NFR11 | ✅ | TLS, secure token storage, server-side validation, CORS restriction, JWT validation, App Check |
| NFR12-NFR14 | ✅ | 10K concurrent on <$80/month, 500K Taags on single PostgreSQL, horizontal scaling path |
| NFR15-NFR19 | ✅ | GPS minimum precision, no raw location sharing, 45-day deletion, GPC, COPPA |
| NFR20-NFR22 | ✅ | 99.5% uptime, offline sync with idempotency, zero data loss on scan queue |

### Implementation Readiness Validation ✅

**Decision Completeness:**
All critical decisions documented with specific versions, packages, and configuration. The anti-patterns list provides explicit "don't do this" guidance. Eight guardrail tests enforce key rules automatically at CI time. Provider-agnostic naming rule prevents vendor lock-in in code.

**Structure Completeness:**
Every file and directory defined in Step 6 project tree. All 8 entities mapped to specific files. All DTOs have defined shapes. FR-to-file mapping table covers all domains. Cross-feature dependency map with explicit allowed dependencies prevents undocumented coupling. Admin feature folder added for FR36/FR37.

**Pattern Completeness:**
Naming conventions cover all layers. Process patterns cover all critical flows including the 3-step scan-time hunt check with geofence verification. Entity configuration approach specified (fluent API for EF config, annotations for simple validation). Service splitting rule with ScanService exception documented. TanStack Query defaults specified.

### Gap Analysis Results

**Critical Gaps:** None remaining. All critical gaps identified during elicitation were resolved:
- Admin endpoints added (FR36/FR37)
- Expiration notification BackgroundService added (FR17/FR18)
- Organic hunt discovery added to scan-time query
- Geofence verification explicitly documented
- Provider-agnostic naming applied throughout
- Drain rate fixed to match rate limit (2000ms interval)

**Important Gaps Resolved:**
- Step 2/Step 6 structural divergence → supersession notes
- Watchlist and Report endpoints added to endpoint table
- Hunt archival semantics documented
- Cross-feature entity access guardrail test added (#7)
- Frontend ESLint restricted-imports for import boundary enforcement
- Entity configuration approach rule added

**Known Limitations (Accepted for MVP):**
- No admin UI — admin endpoints callable via Postman/curl only
- 30-second cache staleness on leaderboards (NFR4 relaxed)
- Offline queue drain takes ~17 minutes for 500+ scans (batch endpoint is priority post-MVP)
- Hot-Taag contention under extreme concurrent scans — retry-once handles MVP scale, documented as first scaling bottleneck
- UUIDv7 deep links are long — digital sharing hides URL behind preview cards, vanity URLs post-MVP
- DisplayName discriminator (first 4 chars of PlayerId) — negligible collision risk at MVP scale

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed (47 FRs, 22 NFRs, 5 epics)
- [x] Scale and complexity assessed (Medium-High, ~10 components)
- [x] Technical constraints identified (6 binding constraints)
- [x] Cross-cutting concerns mapped (12 concerns with strategies)

**✅ Architectural Decisions**
- [x] 5 ADRs with versions and rationale
- [x] Technology stack fully specified (.NET 10, React Native 0.83, Expo SDK 55, PostGIS, Firebase Auth)
- [x] Integration patterns defined (Channel, IContentModerator, auth abstraction)
- [x] Performance considerations addressed (scan time budget, cache strategy)

**✅ Implementation Patterns**
- [x] Naming conventions established (DB, API, backend code, frontend code, DTOs)
- [x] Structure patterns defined (feature folders, test organization, config access)
- [x] Communication patterns specified (Channel messages, TanStack Query keys, mutation responses)
- [x] Process patterns documented (scan pipeline, error handling, auth fallback, offline queue, hunt join)
- [x] Entity configuration approach (fluent API for EF, annotations for validation)
- [x] Service splitting rule with orchestrator exception
- [x] Provider-agnostic naming rule
- [x] Frontend import restriction enforcement

**✅ Project Structure**
- [x] Complete directory structure defined (backend, tests, frontend, root)
- [x] Component boundaries established (API, auth, moderation, scanner, state management)
- [x] Integration points mapped (internal communication, external integrations, data flow)
- [x] Requirements to structure mapping complete (8 FR domains → specific files)
- [x] Cross-feature dependency map documented
- [x] 8 architectural guardrail tests defined

**✅ Validation**
- [x] Coherence validated across all sections
- [x] All 47 FRs and 22 NFRs traced to architectural support
- [x] Implementation readiness confirmed for AI agent development
- [x] All critical and important gaps resolved
- [x] Known limitations documented and accepted

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High — validated through 10 elicitation rounds (5 per step) across Steps 5-7, with 50+ findings resolved. Provider-agnostic naming, cross-feature boundary enforcement, and scan pipeline correctness verified through multiple independent validation passes.

**Key Strengths:**
- Scan pipeline is exhaustively documented — 9-step flow with time budgets, concurrency handling, 3-step hunt check, and geofence verification
- 8 guardrail tests enforce architectural rules automatically at CI time — critical for AI agent development
- Provider-agnostic naming throughout — swap Firebase or OpenAI without touching entity model or DTOs
- Explicit cross-feature dependency map prevents undocumented coupling
- Anti-patterns list gives AI agents clear "don't do this" guidance
- Offline resilience fully specified with drain rate matched to rate limit

**Areas for Future Enhancement:**
- Batch scan endpoint (`POST /scans/batch`) — priority post-MVP for offline queue UX
- Admin UI — currently API-only via curl/Postman
- Real-time leaderboard updates (explicit cache invalidation on scan writes)
- Vanity URLs for hunt deep links
- Read replicas and Redis cache layer for horizontal scaling
- Service mesh / distributed tracing when moving beyond single-server

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries — Step 6 project tree is authoritative
- When earlier sections conflict with later sections, later is authoritative
- Match existing patterns in the codebase before consulting this document
- Provider-specific names belong in configuration only, never in code
- Run guardrail tests after every significant change

**First Implementation Priority:**
1. Re-scaffold backend via `dotnet new webapi` with Step 6 project tree
2. Re-scaffold frontend via `create-expo-app --template tabs` with Step 6 frontend tree
3. Implement Day 1 scaffold: `TaagBackDbContext`, entity configurations, `Program.cs` with all middleware, guardrail tests
4. QR scanning library spike (expo-camera vs react-native-vision-camera)
5. Scan pipeline (the center of gravity — everything else builds on this)

**Cache Configuration (TanStack Query defaults):**
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,    // 30 seconds — matches server cache TTL
      gcTime: 300_000,      // 5 minutes — keep inactive queries in memory
    },
  },
});
```
Scan mutation uses `onSuccess` to update relevant query caches via `queryClient.setQueryData` — no refetch round trip after a scan.

**Cache Clarification:** `IMemoryCache` is for read-only display endpoints only. The scan pipeline always reads from the database for claim evaluation and hunt progression — never from cache. Display staleness of up to 30 seconds on Taag detail and hunt list endpoints is acceptable at MVP.

**Scaling Awareness:** Known first bottleneck: concurrent scans of the same Taag create contention on the Taag row. At MVP scale (<10K users), retry-once handles this. If hot-Taag contention becomes measurable, consider: (1) read-committed snapshot isolation, (2) separate claim evaluation into an async step, (3) optimistic read + pessimistic write on claim changes only.

**Deep Link Note:** URLs contain full UUIDv7 IDs (`https://taagback.app/hunt/019513a4-7b6c-...`). Digital sharing hides the URL behind preview cards. Manual URL entry is not a supported use case at MVP.

