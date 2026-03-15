---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
  - '_bmad-output/planning-artifacts/prd-validation-report.md'
---

# TaagBack - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for TaagBack, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: Users can scan any real-world QR code using the in-app camera to source it as a Taag.
- FR2: The system can extract raw encoded data from a QR code before URL resolution.
- FR3: The system can create a unique Taag record from a QR code's encoded data and GPS coordinates.
- FR4: Users can view a Taag's profile card showing its name, Original Discoverer, Current Controller, and scan metadata.
- FR5: Users can claim an unclaimed Taag by being the first authenticated user to scan it.
- FR6: Users can assign a custom name to a Taag they control, subject to content moderation. Account required.
- FR7: The system can suggest contextual Taag names based on GPS location data (Phase 2 — Gen AI).
- FR8: The system can maintain three-tier attribution for each Taag: Original Discoverer (permanent), Current Controller (maintainable), Custom Name (set by controller).
- FR9: Users can view their personal Taag collection — every Taag they have ever scanned.
- FR10: Users can add any claimed Taag to a personal watchlist.
- FR11: Users can receive notifications when a watchlisted Taag becomes uncontested.
- FR12: Users can view leaderboards ranked by Taags sourced, total scans, and hunts completed.
- FR13: Users can view a basic player profile with their stats and collection summary.
- FR14: The system can expire a Taag claim if the controller does not re-scan within the maintenance period (30 days).
- FR15: Users can re-scan a Taag they control to renew their claim for another maintenance period.
- FR16: Users can claim a previously claimed Taag after its prior claim has expired.
- FR17: The system can notify the previous controller when their claim expires.
- FR18: The system can notify watchlist subscribers when a Taag becomes uncontested.
- FR19: The system can send a pre-expiration warning notification when a user's Taag claim is within 1 day of the 30-day maintenance deadline.
- FR20: Users can create a new hunt with a title and description.
- FR21: Users can add Taags to a hunt as sequenced stops with clue text (draft-as-you-go mode).
- FR22: Users can add Taags to a hunt from a map view showing all sourced Taags in an area (map-based builder mode).
- FR23: Users can reorder stops within a hunt.
- FR24: Users can write a custom completion message displayed when a player finishes the hunt.
- FR25: Users can optionally add a hint to any hunt stop to assist players who are stuck.
- FR26: Users can publish a draft hunt to make it playable.
- FR27: The system can generate a shareable deep link for a published hunt. Where feasible, deep link context should survive app installation for users who don't yet have the app.
- FR28: Users can discover hunts by scanning a Taag that is part of an active hunt.
- FR29: Users can accept a hunt invitation and begin the clue sequence.
- FR30: The system can present clues sequentially — revealing the next clue only after the current stop is scanned.
- FR31: The system can offer a hint to players after 3 unsuccessful scan attempts at a stop, but only if the hunt creator provided a hint for that stop.
- FR32: The system can verify a scan against the expected stop using QR token matching and geofence verification.
- FR33: The system can display the blackout crescendo celebration upon hunt completion.
- FR34: The system can display the creator's custom completion message after the celebration.
- FR35: Users can view their hunt completion stats and rank on the hunt leaderboard.
- FR36: The system can display a safety reminder and TOU acceptance gate before a user's first hunt.
- FR37: The system can filter user-submitted text (Taag names, clues, descriptions, completion messages) through automated content moderation.
- FR38: Users can report any Taag or hunt for community guideline violations.
- FR39: Admins can review reported content in a moderation queue.
- FR40: Admins can reset a Taag's custom name, issue user warnings, or restrict accounts.
- FR41: The system can reject inappropriate custom names with a playful, non-punitive message.
- FR42: Users can create an account on first app launch to access all platform features (scanning, claiming, naming, hunt creation, leaderboards).
- FR43: The system can require account creation on first app launch before allowing any platform interaction.
- FR44: The system can require age verification at account creation and enforce COPPA-compliant flows for users under 13.
- FR45: Users can authenticate via email/password or social login (Google Sign-In, Apple Sign-In).
- FR46: The system can detect and invalidate duplicate/mass-produced QR codes scanned at significantly different GPS locations (snack wrapper problem).
- FR47: The system can flag impossible movement speeds between consecutive scans from the same user.
- FR48: The system can verify physical presence via geofence check (GPS coordinates within configurable radius of stop location) before accepting a scan.
- FR49: The system can enforce rate limiting on scan attempts per user.
- FR50: Users can capture an image of the QR code's surroundings during the scan process.
- FR51: The system can upload scan images asynchronously without blocking the scan result flow.
- FR52: The system can extract EXIF metadata (GPS coordinates, compass bearing, estimated distance) from scan images to triangulate Taag location.
- FR53: The system can refine Taag location using triangulated data from multiple scan images over time.
- FR54: _(Phase 2)_ The system can enrich Taag profiles with contextual data from external sources (reverse geocoding, nearby points of interest).
- FR55: _(Phase 2/3)_ The system can process uploaded images through vision analysis to extract contextual data (business type, surroundings, name suggestions, Taag personality graphic), then delete source images after processing.

### NonFunctional Requirements

- NFR1: Scan API endpoint responds in <500ms at p95 under normal load as measured by application monitoring.
- NFR2: End-to-end QR decode to UI result completes in <2 seconds on supported devices.
- NFR3: Hunt data (stops, clues) loads within 3 seconds on 4G connections.
- NFR4: Leaderboard data refreshes within 10 seconds of a qualifying scan event.
- NFR5: App cold start to camera-ready state completes in <4 seconds.
- NFR6: All API communication encrypted via TLS 1.2+.
- NFR7: Authentication tokens stored in platform-provided secure storage — never in client-side local storage.
- NFR8: All user-facing text inputs validated server-side against injection attacks using parameterized queries.
- NFR9: CORS restricted to known origins in production (not the current open-any-origin dev configuration).
- NFR10: JWT validated on every authenticated API request.
- NFR11: Platform attestation validated for scan claims to verify requests originate from the authentic app on a genuine device.
- NFR12: System supports up to 10,000 concurrent users on MVP infrastructure (<$80/month).
- NFR13: Taag database handles up to 500,000 unique Taags without performance degradation on a single database instance with geospatial capability.
- NFR14: Architecture supports horizontal scaling via read replication and caching layer addition without application rewrite.
- NFR15: GPS coordinates collected at minimum precision necessary for geofence verification (approximately city-block level).
- NFR16: Location data never sold or shared with third parties in raw form.
- NFR17: User data deletion requests fulfilled within 45 days per state privacy law requirements.
- NFR18: Global Privacy Control (GPC) signals honored for opt-out preferences.
- NFR19: Under-13 user data handled per COPPA requirements with Verifiable Parental Consent before collection.
- NFR20: API maintains 99.5% uptime measured monthly.
- NFR21: Offline-queued scan claims sync correctly when connectivity returns with zero data loss. Hunt progression requires connectivity; queued scans advance hunts upon sync.
- NFR22: Idempotency keys prevent duplicate scan records on network retry.
- NFR23: Audio signatures for celebrations must be designed and integrated before public release. Celebrations must be visually complete without audio for initial development phases.

### Additional Requirements

**From Architecture:**

- Re-scaffold both projects from fresh templates (dotnet new webapi + create-expo-app --template tabs). Existing code is reference material, not foundation.
- PostgreSQL + PostGIS database migration from in-memory List<T> stores — critical path, must be Sprint 1.
- Feature-folder code organization by domain (ADR-1): Scanning, Taags, Hunts, Players, Leaderboard, Reports, Watchlist, Admin.
- API versioning /api/v1/ from Sprint 1 via Asp.Versioning.Http (ADR-3).
- No repository pattern — services inject DbContext directly (ADR-4).
- Rate limiting via built-in .NET middleware: scan 30/min per user, Taag detail 60/min per user, global 100/min per IP (ADR-5).
- Firebase Auth with client-side abstraction layer for portability. Firebase App Check for device attestation.
- Content moderation via single CheckText function: OpenAI Moderation API with regex blocklist fallback. Circuit breaker: 2s timeout, 3 failures → 5min open.
- Bounded Channel<T> (~1000 capacity) + single BackgroundService consumer for notification dispatch (ADR-2).
- QR content normalization is a security-critical boundary. Normalize URL (lowercase scheme/host, strip trailing slash, sort query params, strip default ports, strip fragments). Non-URL content: trim, NFC normalize, normalize line endings.
- Lazy claim expiration with optimistic concurrency — check ClaimRenewedAt + 30 days at scan time. Daily BackgroundService for expiration + pre-expiration notifications.
- Docker + docker-compose for local dev (PostGIS container + MinIO for blob storage).
- CI/CD: 2 GitHub Actions workflows (backend-ci.yml + frontend-ci.yml). OpenAPI drift detection. Docker image tagged with git SHA.
- Health check endpoint: GET /health with DB connectivity, schema version, auth mode.
- 8 architectural guardrail tests as Day 1 scaffold.
- UUIDv7 primary keys (Guid.CreateVersion7). Gap-based SortOrder (100, 200, 300...) for hunt stops.
- 9 core entities: Player, Taag, ScanEvent, ScanImage, Hunt, HuntStop, HuntProgress, Watchlist, Report.
- Scan image capture + EXIF extraction via MetadataExtractor + Azure Blob Storage.
- OpenAPI spec committed to repo → TypeScript type generation via openapi-typescript.
- Spike task: verify expo-camera raw QR data behavior on Android before finalizing scanner library.
- RFC 9457 Problem Details for error handling. MVP cap: ≤5 custom problem types.
- Structured logging with ILogger<T>. No GPS in Information-level logs.
- Testing: NUnit 4 + Testcontainers (real PostGIS). No mocking framework at MVP.
- Two environments only: Development and Production. No staging.
- Fail-fast startup validation of required environment variables.
- ScanEvent as append-only log — never updated, never deleted.
- Taags are never hard-deleted — Status enum controls visibility.
- Collection is derived from ScanEvents, not a separate entity.
- Deep link format: https://taagback.app/hunt/{huntId}. Expo universal links.

**From UX Design:**

- Camera-first scanner as default tab with 4-tab bottom navigation: Scan, Collection, Leaderboard, Profile.
- Passport metaphor for collection: swipeable pages, stamp/sticker cards for Taags, visa stamps for hunt completions.
- Gen-Z vintage aesthetic: dark-first palette (#0D0D0D to #1A1A1A), monospace/typewriter typography, handmade texture system with 4-level Volume Knob (Clean, Ambient, Styled, Immersive).
- 6 custom signature components: TaagCard, PassportPage, CelebrationOverlay, ScanTransition, ClueCard, VisaStamp.
- NativeWind + Tailwind CSS as styling foundation (zero-opinion base layer).
- Pioneer celebration: confetti + fanfare + THUNK stamp + naming ceremony. Screenshot-worthy. Full-screen immersive.
- "Darn!" moment: theatrical disappointment for already-claimed Taags + watchlist invitation as power move.
- Blackout crescendo: 2-3 seconds of pure black screen → celebratory fanfare CRESCENDOS → confetti/fireworks → creator's completion message as personal letter.
- Hunt transition zone: 3-second atmospheric build (dim, mood shift, title, first clue materializes).
- Sound design required: minimum 4 audio signatures (pioneer fanfare, "darn!" sound, hunt entry atmospheric, crescendo build). Sound follows device mode — silent/vibrate → haptic patterns.
- Accessibility Day 1: reduced motion (respect system settings), screen reader descriptions, high contrast for outdoor use, no color-only communication.
- Scan image capture UX: post-celebration optional prompt ("Help TaagBack see what's around this Taag"), framed as contribution, async upload.
- Manual code entry: text input fallback on scan screen for pasting/typing QR content.
- Hunt recovery UX: broken stop detection (3 failed scans → Report/Hint), progress auto-save and resume, partial completion credit in history.
- No admin UI at MVP — admin operations via direct API calls (Postman/curl).
- Creator stats on hunt detail: X started | Y completed | Created date.
- Deferred deep linking: hunt links should survive app install (best-effort via expo-linking).
- Scan-to-result transition: purpose-built "decoding" animation, not generic spinner. QR code visually transforms into Taag card.
- Taag card species: visual categories by type (Restaurant, Ghost, Transit, Retail, Art/Culture, Municipal, Unknown).
- Three-tier attribution visual design: permanent discoverer (etched/immovable) vs. temporary controller/name (dynamic banner).
- Context-aware emotional design: Discovery mode → emotion first; Maintenance mode → efficiency first; Creation mode → efficiency with creator celebrations.
- Creation-mode efficiency: suppressed player celebrations during active draft scanning. Quick "Added as Stop N" confirmation.
- Completion card (Gift Shop Exit): shareable hunt completion artifact with hunt name, time, rank, date, unique visual.
- "One More Run" hooks: every screen's closing beat points toward next action.
- ClueCard states: Peek (minimized single-line bar at screen top during camera) and Active (full clue display).
- Watchlist notification copy: premium emotional copywriting referencing specific Taag names and user history.
- Claim-loss notification: emotionally designed narratives, not informational alerts. Loss becomes plot twist.
- Pre-expiration warning notification: 1 day before 30-day claim deadline.

### FR Coverage Map

- FR1: Epic 1 — QR code scanning via in-app camera
- FR2: Epic 1 — Raw encoded data extraction before URL resolution
- FR3: Epic 1 — Create unique Taag record from QR data + GPS
- FR4: Epic 1 — Taag profile card display
- FR5: Epic 1 — Claim unclaimed Taag as first scanner
- FR6: Epic 1 — Custom naming with content moderation
- FR7: Phase 2 — AI contextual name suggestions (deferred)
- FR8: Epic 1 — Three-tier attribution maintenance
- FR9: Epic 1 — Personal Taag collection view
- FR10: Epic 1 — Watchlist add for claimed Taags
- FR11: Epic 3 — Watchlist notifications on claim expiry
- FR12: Epic 2 — Leaderboards (sourcing, scanning, hunts completed)
- FR13: Epic 2 — Player profile with stats and collection summary
- FR14: Epic 3 — 30-day claim expiration
- FR15: Epic 3 — Re-scan to renew claim
- FR16: Epic 3 — Claim expired Taag
- FR17: Epic 3 — Notify previous controller on claim expiry
- FR18: Epic 3 — Notify watchlist subscribers on Taag uncontested
- FR19: Epic 3 — Pre-expiration warning notification (1 day before deadline)
- FR20: Epic 4 — Create hunt with title and description
- FR21: Epic 4 — Add Taags as sequenced stops with clue text (field mode)
- FR22: Epic 4 — Add Taags from map view (map-based builder mode) ⚠️ HIGH EFFORT
- FR23: Epic 4 — Reorder stops within a hunt
- FR24: Epic 4 — Custom completion message
- FR25: Epic 4 — Optional hint per hunt stop
- FR26: Epic 4 — Publish draft hunt
- FR27: Epic 4 — Shareable deep link generation
- FR28: Epic 5 — Discover hunts by scanning a Taag in an active hunt
- FR29: Epic 5 — Accept hunt invitation and begin clue sequence
- FR30: Epic 5 — Sequential clue presentation
- FR31: Epic 5 — Hint after 3 unsuccessful scan attempts (if creator provided)
- FR32: Epic 5 — Verify scan against expected stop (QR token + geofence)
- FR33: Epic 5 — Blackout crescendo celebration ⚠️ HIGH EFFORT
- FR34: Epic 5 — Creator's custom completion message display
- FR35: Epic 5 — Hunt completion stats and leaderboard rank
- FR36: Epic 5 — Safety reminder and TOU gate before first hunt
- FR37: Epic 1 — Automated content moderation on all UGC
- FR38: Epic 1 — User reporting for community guideline violations
- FR39: Epic 6 — Admin moderation queue review
- FR40: Epic 6 — Admin reset Taag name, issue warnings, restrict accounts
- FR41: Epic 1 — Playful rejection of inappropriate names
- FR42: Epic 1 — Account creation on first launch
- FR43: Epic 1 — Require account before any platform interaction
- FR44: Epic 1 — Age verification and COPPA-compliant flows ⚠️ HIGH EFFORT
- FR45: Epic 1 — Email/password and social login authentication
- FR46: Epic 6 — Duplicate/mass-produced QR code detection
- FR47: Epic 6 — Impossible travel speed flagging
- FR48: Epic 1 — Geofence verification for scan claims
- FR49: Epic 1 — Rate limiting on scan attempts
- FR50: Epic 7 — Capture image of QR code surroundings
- FR51: Epic 7 — Async image upload without blocking scan flow
- FR52: Epic 7 — EXIF metadata extraction for location triangulation
- FR53: Epic 7 — Refine Taag location from multiple scan images
- FR54: Phase 2 — Taag profile enrichment from external sources (deferred)
- FR55: Phase 2/3 — Vision analysis on scan images (deferred)

**Coverage Summary:** 52 of 55 FRs mapped to MVP epics. 3 FRs deferred to Phase 2/3 (FR7, FR54, FR55).

## Epic List

### Epic 1: Foundation & Complete Scan Experience

A user can create an account (passport issuance), scan any QR code and experience ALL scan outcomes — pioneer celebration with naming, "darn!" moment with watchlist invitation, re-scan confirmation, and collection add. Basic collection view, Taag profile cards, geofence verification, rate limiting, and user reporting ensure the platform is trustworthy and safe from Day 1.

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR8, FR9, FR10, FR37, FR38, FR41, FR42, FR43, FR44, FR45, FR48, FR49 (18 FRs)

**High-effort FRs:** FR44 (COPPA age gate + VPC flows), celebration UX layer (CelebrationOverlay, ScanTransition, sound design spans multiple FRs)

**Implementation notes:**
- Backend stories (scaffold, DB, auth, scan pipeline) in Sprint 1 unlock parallel development of Epics 2-4 backend work. Celebration UX polish follows in Sprint 2. This epic is 2+ sprints.
- Includes: re-scaffold both projects, PostgreSQL + PostGIS migration, Firebase Auth with abstraction layer, QR content normalization (security-critical boundary), content moderation with circuit breaker, CI/CD pipelines, Docker, health checks, 8 architectural guardrail tests, expo-camera spike.
- UX: passport issuance ceremony, camera-first scanner with 4-tab navigation shell, pioneer celebration, "darn!" moment, naming ceremony, ScanTransition, TaagCard, basic PassportPage collection view.
- **Critical path of the entire project.** Highest risk + highest importance. Deserves the most sprint planning attention.

### Epic 2: Leaderboards & Player Profiles

Users can compete on leaderboards (sourcing, scanning, hunts completed), view other players' public profiles, and see their own stats summary.

**FRs covered:** FR12, FR13 (2 FRs)

**Implementation notes:**
- 3 leaderboard types with period filters (week, month, alltime), player profile with aggregated stats.
- Backend can begin once Epic 1 Sprint 1 (data model + auth) completes.
- **Quick win epic.** Lightest, safest, no unknowns. Ship early for visible competitive motivation. Highest composite score in comparative analysis.

### Epic 3: Territory Defense & Claim Maintenance

The competitive territory loop — claims expire after 30 days, users re-scan to maintain, pre-expiration warnings fire, previous controllers get notified, watchlist subscribers get alerts, expired Taags can be reclaimed. Push notification infrastructure built here as the first epic that motivates it.

**FRs covered:** FR11, FR14, FR15, FR16, FR17, FR18, FR19 (7 FRs)

**Implementation notes:**
- Story 1 is push notification infrastructure setup (bounded Channel consumer, Expo Push, token storage). Infrastructure is motivated by this epic's user value — not built speculatively.
- Architecture: lazy claim expiration with optimistic concurrency, daily BackgroundService for expiration + pre-expiration notifications.
- UX: re-scan confirmation, claim-loss narrative notifications, pre-expiration warnings, watchlist alerts with emotional copywriting.
- Backend can begin once Epic 1 Sprint 1 completes.
- **Best value-to-effort ratio.** The mechanic that makes TaagBack a GAME — the retention engine.

### Epic 4: Hunt Creation & Publishing

Creators can build scavenger hunts using field mode (draft-as-you-go with creation-mode efficiency — suppressed celebrations) and map mode (couch builder), sequence stops with clues and optional hints, write a custom completion message, reorder stops, and publish with a shareable deep link. Deep links are the primary hunt discovery mechanism at launch.

**FRs covered:** FR20, FR21, FR22, FR23, FR24, FR25, FR26, FR27 (8 FRs)

**High-effort FRs:** FR22 (map-based builder — map integration, spatial Taag display, drag-to-reorder)

**Implementation notes:**
- Architecture: gap-based SortOrder, hunt publish validation (≥2 stops), deep link format.
- UX: creation-mode efficiency (suppressed player celebrations during active draft), dual creation modes, publish celebration, deep link generation.
- **Parallelism:** Epic 5 (Hunt Play) can develop against seeded test hunts — does not need to wait for Epic 4's UI to complete.
- **Weakest standalone score.** Creation without play is incomplete. Epics 4+5 are a natural delivery pair in sprint planning.

### Epic 5: Hunt Play & Completion

Players can discover hunts organically through Taag scans, accept invitations, play through sequential clues, receive hints after 3 failed attempts, experience hunt-specific geofence verification, and experience the blackout crescendo with creator's personal message on completion. Safety/TOU gate before first hunt.

**FRs covered:** FR28, FR29, FR30, FR31, FR32, FR33, FR34, FR35, FR36 (9 FRs)

**High-effort FRs:** FR33 (blackout crescendo — 2-3s dramatic pause, Lottie + sound crescendo, full-screen immersive)

**Implementation notes:**
- Architecture: scan-time hunt progression check (3-step query), geofence verification, HuntProgress entity.
- UX: hunt invitation discovery, ClueCard (peek/active states), transition zone, blackout crescendo (2-3s black → fanfare → creator message as personal letter), completion card, safety/TOU gate, hunt recovery (progress auto-save, partial completion), "one more run" hooks, creator stats (started/completed counts) on hunt detail.
- Organic discovery (FR28) is MVP path. Hunt browse/search is documented Fast Follow dependency for the flywheel.
- **Can develop against seeded hunt data in parallel with Epic 4.**
- **The "movie moment."** Highest user value + strategic value. The crescendo needs iteration time — allocate extra sprint capacity for tuning.

### Epic 6: Safety & Platform Integrity

Admins can review the moderation queue, act on reports, reset Taag names, issue warnings, and restrict accounts. The platform detects duplicate/mass-produced QR codes and flags impossible travel speeds.

**FRs covered:** FR39, FR40, FR46, FR47 (4 FRs) + NFR17 (data deletion)

**Implementation notes:**
- Admin tooling via direct API calls — no admin UI at MVP. The sole admin is the developer.
- Duplicate QR detection ("snack wrapper problem") and impossible travel flagging are algorithmic hardening.
- **Flexible scheduling.** High standalone viability, no dependency load. Can slide in the schedule without affecting other epics. Ideal for filling gaps between other epics or post-launch hardening.

### Epic 7: Location Intelligence & Scan Imagery

Users can capture images of QR code surroundings, and the system extracts EXIF metadata to progressively refine Taag location accuracy through triangulation from multiple scans.

**FRs covered:** FR50, FR51, FR52, FR53 (4 FRs)

**Implementation notes:**
- Architecture: ScanImage entity, Azure Blob Storage / MinIO, MetadataExtractor for EXIF extraction, triangulation service.
- UX: post-celebration optional prompt ("Help TaagBack see what's around this Taag"), framed as contribution, async upload.
- **Strategic sleeper.** Low immediate user impact but highest strategic value — builds the hidden data asset. Can be deprioritized for launch and shipped post-launch without affecting user experience.

### Phase 2/3 Features (Not in MVP Epics)

- FR7: AI contextual Taag name suggestions based on GPS location data
- FR54: Taag profile enrichment from external sources (reverse geocoding, nearby POI)
- FR55: Vision analysis on scan images (business type extraction, name suggestions, Taag personality graphic)

---

## Epic 1: Foundation & Complete Scan Experience

A user can create an account (passport issuance), scan any QR code and experience ALL scan outcomes — pioneer celebration with naming, "darn!" moment with watchlist invitation, re-scan confirmation, and collection add. Basic collection view, Taag profile cards, geofence verification, rate limiting, and user reporting ensure the platform is trustworthy and safe from Day 1.

### Story 1.1: Backend Project Scaffold & Database Foundation

As a developer,
I want a freshly scaffolded .NET 10 API with PostgreSQL + PostGIS, core entity model, health check, Docker dev environment, and CI pipeline,
So that all subsequent stories have a working backend foundation to build on.

**Acceptance Criteria:**

**Given** the existing TaagBack.Api project
**When** the backend is re-scaffolded with `dotnet new webapi`
**Then** the project uses .NET 10, feature-folder structure (Scanning/, Taags/, Hunts/, Players/, Leaderboard/, Reports/, Watchlist/, Admin/, Shared/, Data/), and API versioning via `Asp.Versioning.Http` at `/api/v1/`
**And** `Program.cs` includes `AddProblemDetails()`, structured logging with `ILogger<T>`, and fail-fast startup validation for required environment variables
**And** Kestrel HTTPS is configured with `SslProtocols.Tls12 | SslProtocols.Tls13` minimum (NFR6)
**And** CORS is configured via environment variable allowlist in Production (not open-any-origin); Development retains open CORS for local dev (NFR9)

**Given** the re-scaffolded project
**When** the database layer is configured
**Then** `TaagBackDbContext` uses EF Core with Npgsql + NetTopologySuite for PostGIS support
**And** Player, Taag, and ScanEvent entities exist with UUIDv7 primary keys, `IEntityTypeConfiguration<T>` fluent API configuration, and all indexes per Architecture doc
**And** Taag.NormalizedContent has a unique index, Taag.Location has a GiST spatial index, ScanEvent.IdempotencyKey has a unique index

**Given** the database entities
**When** an initial EF Core migration is generated
**Then** the migration creates all three tables with correct column types (GEOGRAPHY(Point, 4326) for location columns, timestamptz for all timestamps)

**Given** the project root
**When** `docker-compose.yml` is configured
**Then** it runs PostGIS (`postgis/postgis:17-3.5`) with a persistent volume and MinIO for blob storage
**And** `appsettings.Development.json` contains local connection strings

**Given** the API project
**When** `GET /health` is called
**Then** it returns `{ "status": "healthy", "dbConnected": true/false, "schemaVersion": "<migration_id>" }` using `AspNetCore.HealthChecks.NpgSql`

**Given** the project repository
**When** code is pushed to main touching `TaagBack.Api/**` or `TaagBack.Tests/**`
**Then** `backend-ci.yml` GitHub Actions workflow runs: restore → build → test (Testcontainers with PostGIS) → validate OpenAPI spec matches committed `openapi.json`

**Given** the test project
**When** tests are configured
**Then** `TaagBack.Tests` uses NUnit 4 with Testcontainers (`postgis/postgis:17-3.5`), `[SetUpFixture]` boots one container per run, transaction rollback per test
**And** `ArchitecturalGuardrailTests.cs` includes all 8 guardrail tests from Architecture doc (entities not in responses, no unprotected endpoints, no content fields in DTOs, feature folder structure, migration linearity, every service has tests, cross-feature entity access, no provider-specific names)

**Given** the API project
**When** rate limiting middleware is configured
**Then** scan endpoint allows 30 requests/min per authenticated user, Taag detail allows 60/min per user, and global fallback is 100/min per IP
**And** rate-limited requests return 429 with standard Problem Details response

### Story 1.2: Frontend Project Scaffold & Navigation Shell

As a user,
I want to open TaagBack and see a clean 4-tab navigation with a camera-first scanner as the default tab,
So that I can immediately start scanning QR codes.

**Acceptance Criteria:**

**Given** the existing TaagBack frontend project
**When** the frontend is re-scaffolded with `create-expo-app --template tabs`
**Then** the project uses Expo SDK 55, expo-router file-based routing, TypeScript, and NativeWind + Tailwind CSS
**And** `tailwind.config.js` defines the dark-first color palette (#0D0D0D to #1A1A1A primary), monospace typography tokens, and 4px spacing scale

**Given** the scaffolded app
**When** the user opens the app
**Then** a 4-tab bottom navigation is displayed with tabs: Scan (default/active), Collection, Leaderboard, Profile
**And** the Scan tab is the default landing — camera-ready with no navigation required

**Given** the navigation shell
**When** the user taps each tab
**Then** placeholder screens load for Collection, Leaderboard, and Profile tabs
**And** the Scan tab shows a camera viewfinder placeholder (camera integration is Story 1.4)

**Given** the project
**When** NativeWind is configured
**Then** all screens use dark-first theme with the Gen-Z vintage aesthetic — near-black backgrounds, warm off-white text (not pure white), monospace font for headers/labels

**Given** the frontend project
**When** code is pushed to main touching `TaagBack/**`
**Then** `frontend-ci.yml` GitHub Actions workflow runs: npm ci → lint → typecheck
**And** ESLint `no-restricted-imports` rules enforce Firebase SDK restricted to `authService.ts` and camera library restricted to `scannerService.ts`

**Given** the project setup
**When** TypeScript types are generated
**Then** `npm run generate-types` generates TypeScript interfaces from the committed `openapi.json` via `openapi-typescript`
**And** generated types are in `src/types/api.ts` (never hand-edited)

### Story 1.3: Authentication & Account Creation

As a new user,
I want to create my account on first app launch through a delightful passport issuance ceremony with age verification,
So that I feel like I'm joining a secret society and can access all platform features.

**Acceptance Criteria:**

**Given** the backend API
**When** Firebase Auth is integrated
**Then** `JwtAuthHandler.cs` in `Shared/Auth/` validates Firebase JWTs on every authenticated request
**And** JWKS is cached after first fetch with exponential backoff retry (up to 60s) on API restart during Firebase outage
**And** if JWKS fetch fails, the API starts in degraded auth mode returning 503 on authenticated endpoints (not 401)
**And** a `RequirePromotedAccount` authorization policy checks age-verification claim for endpoints requiring verified users
**And** Firebase App Check is configured — scan endpoint validates app attestation token to verify requests originate from the authentic app on a genuine device (NFR11)
**And** the API honors the `Sec-GPC: 1` header — when present, non-essential data collection (scan images, detailed location logging) is suppressed (NFR18)

**Given** the frontend app
**When** `authService.ts` is implemented
**Then** it wraps the Firebase Auth SDK as the sole Firebase import point
**And** it provides `signUp`, `signIn`, `signOut`, `getCurrentUser`, and `getToken` methods
**And** auth tokens are stored in platform-provided secure storage (iOS Keychain / Android Keystore) via `expo-secure-store`

**Given** a user who has never opened TaagBack
**When** they launch the app for the first time
**Then** they are presented with the passport issuance ceremony — a delightful registration flow themed as "joining a hidden world"
**And** account creation is required before any platform interaction (FR43)
**And** the ceremony collects: display name, date of birth, and authentication credentials (email/password or social login via Google/Apple Sign-In)

**Given** the registration flow
**When** the user enters their date of birth
**Then** the system calculates age and enforces COPPA: users under 13 are blocked from proceeding until Verifiable Parental Consent (VPC) is obtained (FR44)
**And** users 13+ proceed normally with age-verification claim added to their profile

**Given** a user under 13 requires Verifiable Parental Consent
**When** the COPPA VPC flow initiates
**Then** the system collects a parent/guardian email address from the child
**And** an email is sent to the parent with a unique verification link explaining: what TaagBack collects (display name, location during scans, scan history), why, and a consent/deny action
**And** the parent must click the consent link to promote the child's account — the child sees "Waiting for your parent to approve" until then
**And** the verification link expires after 48 hours — child can re-request
**And** no personal data beyond display name is stored for the child until consent is granted

**Given** the user selects authentication method
**When** they choose email/password
**Then** account is created via Firebase Auth with email/password provider
**When** they choose Google Sign-In or Apple Sign-In
**Then** account is created via the respective social login provider (Apple Sign-In is mandatory per App Store policy if offering social login)

**Given** successful authentication
**When** the backend receives the first authenticated request
**Then** a Player entity is created with `ExternalAuthId` (unique index), `DisplayName`, and `CreatedAt`
**And** the Player entity uses UUIDv7 for the primary key
**And** Player.DisplayName is NOT unique — display names are cosmetic, not identifiers

### Story 1.4: QR Scanning & Scan Pipeline

As a user,
I want to point my camera at any QR code and have TaagBack instantly read it and send it to the server,
So that I can discover what's hidden behind every QR code I encounter.

**Acceptance Criteria:**

**Given** the Scan tab is active
**When** `scannerService.ts` is implemented
**Then** it wraps the camera library (expo-camera or react-native-vision-camera per spike result) as the sole camera import point
**And** it provides `onCodeScanned` callback that extracts raw encoded QR data before URL resolution (FR2)

**Given** a QR code is detected by the camera
**When** `onCodeScanned` fires
**Then** the ScannerService decision flow executes: (1) check content length ≤ 2048 chars — reject if longer, (2) check if TaagBack URL → route to deep link handler (no API call), (3) otherwise → call scan API mutation

**Given** the scan API
**When** `POST /api/v1/scans` receives a `ScanRequestDto` with `qrContent`, `location` (nullable), and `idempotencyKey`
**Then** `QrContentNormalizer.cs` normalizes the content: for URLs — lowercase scheme/host, strip trailing slash, sort query params, strip default ports 80/443, strip fragments, normalize URL encoding; for non-URLs — trim whitespace, NFC Unicode normalization, normalize line endings to `\n`
**And** the normalized content is used as the primary lookup key against `Taag.NormalizedContent` unique index

**Given** a scan request with GPS coordinates
**When** geofence verification runs (FR48)
**Then** the system validates physical presence via `ST_DWithin` PostGIS distance check using the configurable geofence radius (default 50m)
**And** scans outside the geofence radius are still recorded but flagged

**Given** a scan request with null or low-accuracy GPS (indoor, basement, no signal)
**When** the location field is null or accuracy exceeds threshold (>100m)
**Then** the scan proceeds normally — Taag sourcing, claiming, and collection all work
**And** geofence verification is skipped (not failed)
**And** `ScanEvent.Location` is stored as null
**And** the Taag's location is not updated from a null-GPS scan

**Given** an authenticated user submits a scan
**When** rate limiting is evaluated (FR49)
**Then** the scan endpoint enforces token bucket 30/min per authenticated user
**And** rate-limited requests return 429 — client handles with silent retry and backoff (never shown to user)

**Given** a scan is processed successfully
**When** the ScanResultDto is returned
**Then** it includes: `outcome` (firstDiscovery, unclaimedDiscovery, claimRenewal, collection), `taag` (TaagSummaryDto), `isNewDiscovery`, `previouslyScannedByUser`, `pioneerEligible`, `claimStatus`
**And** a ScanEvent entity is created with IdempotencyKey — duplicate idempotency keys return the original result without creating a new event

**Given** the scan request has an idempotencyKey matching an existing ScanEvent
**When** the scan is processed
**Then** the original ScanResultDto is returned without creating a duplicate ScanEvent (FR22 — idempotency)

**Given** the camera is active
**When** a QR code is visually detected (before server response)
**Then** immediate visual feedback is shown: frame highlight and haptic pulse via `expo-haptics`
**And** a "Reading..." decoding animation plays (not a generic spinner)

**Given** the frontend scan screen
**When** a `ManualCodeEntry` component is present
**Then** users can type or paste QR content as a text input fallback
**And** manual entry feeds the same `useScanMutation` hook as camera scans

**Given** the device is offline or has no connectivity
**When** a scan is attempted
**Then** the `useScanQueue` hook stores the pending scan (qrContent, location, idempotencyKey, timestamp) in AsyncStorage (NFR21)
**And** when connectivity returns, queued scans are synced in order using their original idempotencyKeys — preventing duplicates
**And** the user sees a "Queued — will sync when online" confirmation instead of an error
**And** hunt progression for queued scans advances upon successful sync

**Given** `QrContentNormalizer.cs` is the security-critical boundary
**When** tests are written
**Then** `QrContentNormalizerTests.cs` has exhaustive coverage: scheme case, host case, trailing slash, query param order, default ports 80/443, fragment stripping, URL encoding normalization, non-URL content handling, max length rejection, scheme whitelist (http/https only normalized)

### Story 1.5: Taag Creation & Pioneer Claiming

As a user scanning a QR code for the first time in TaagBack,
I want to be celebrated as the Pioneer who discovered this Taag and have my name permanently etched as Original Discoverer,
So that I feel ownership and delight from my very first scan.

**Acceptance Criteria:**

**Given** a scan where `NormalizedContent` does not exist in the database
**When** the scan is processed
**Then** a new Taag entity is created with: `RawContent` (original encoded string), `NormalizedContent` (unique lookup key), `Location` (PostGIS GEOGRAPHY point from scan GPS), `OriginalDiscovererId` set to the scanning player, `CurrentControllerId` set to the scanning player, `Status` = Active, `ClaimRenewedAt` = now
**And** a ScanEvent is created with `Outcome` = `FirstDiscovery`
**And** the ScanResultDto returns `outcome: "firstDiscovery"`, `isNewDiscovery: true`, `pioneerEligible: true`

**Given** two users scan the same unclaimed QR code simultaneously
**When** both requests attempt to create the same Taag (unique constraint on NormalizedContent)
**Then** the first transaction succeeds with `FirstDiscovery` outcome
**And** the second transaction catches `DbUpdateException`, reloads the existing Taag, and processes as `Collection` outcome with `previouslyScannedByUser: false`
**And** the second user never sees an error

**Given** a scan returns `outcome: "firstDiscovery"`
**When** the frontend receives the result
**Then** the `CelebrationOverlay` component fires: full-screen confetti animation, pioneer fanfare sound (or haptic pattern in silent mode), and THUNK stamp animation
**And** the celebration is screenshot-worthy — full-screen immersive (Volume Knob level 3: Immersive)
**And** the celebration respects system reduced-motion settings (static reveal instead of animation)
**And** screen reader announces: "You are the first person to discover this Taag!"

**Given** a scan returns `outcome: "unclaimedDiscovery"` (Taag exists but CurrentControllerId is null — claim expired)
**When** the frontend receives the result
**Then** a discovery celebration variant plays with a "Claim it / Just collect" choice
**And** if the user claims, `CurrentControllerId` is updated and `ClaimRenewedAt` is set to now

**Given** a scan returns `outcome: "claimRenewal"` (user is CurrentController)
**When** the frontend receives the result
**Then** a quick, satisfying "Claim renewed!" confirmation displays — efficient, not theatrical (Maintenance mode UX)
**And** `ClaimRenewedAt` is extended by 30 days on the server

**Given** a scan returns `outcome: "collection"` (Taag is claimed by another user)
**When** the frontend receives the result
**Then** the Taag is added to the user's collection (derived from ScanEvent)
**And** the scan result shows the Taag profile card with current controller info

**Given** the Taag entity
**When** `NormalizedContent` or `RawContent` fields are accessed
**Then** these fields NEVER appear in any API response — enforced by architectural guardrail test #3

### Story 1.6: Taag Naming & Content Moderation

As a Pioneer who just discovered a Taag,
I want to give it a personal name through a naming ceremony with content moderation,
So that my mark is left on the hidden world for everyone to see.

**Acceptance Criteria:**

**Given** a user who is the `CurrentControllerId` of a Taag
**When** they submit a name via `PUT /api/v1/taags/{taagId}/name` with `TaagNamingRequestDto`
**Then** the name is validated: varchar 30 max, required, non-empty
**And** the name is checked through `IContentModerator.CheckTextAsync()` before saving
**And** if approved, `Taag.CustomName` is updated and the response returns the updated TaagDetailDto

**Given** the content moderation system
**When** `ExternalContentModerator` is configured
**Then** it calls the OpenAI Moderation API with a 2-second HttpClient timeout
**And** on timeout or error, it falls back to regex blocklist only
**And** a circuit breaker (Polly v8 via `Microsoft.Extensions.Http.Resilience`) breaks after 3 consecutive failures, skips API call for 5 minutes (blocklist only), logs every skip, resets after successful call
**And** moderation NEVER blocks the user from naming — worst case, a marginal name passes during an outage

**Given** a user submits a name that fails content moderation
**When** the moderation check returns rejected
**Then** the system returns a `moderation-rejected` Problem Details (422) response
**And** the frontend displays a playful, non-punitive rejection message: "Nice try! How about something your grandma would approve of?" (FR41)
**And** the user can immediately try a different name

**Given** the `IContentModerator` interface
**When** tests are written
**Then** `FakeContentModerator` provides configurable results: pass, reject, timeout → fallback to blocklist
**And** all three moderation paths are tested: API pass, API reject, API timeout with blocklist fallback

**Given** the pioneer celebration has completed
**When** the naming ceremony UX mounts
**Then** the `TaagNamingSheet` component presents a deliberate, paced naming experience — "This Taag is waiting for its name"
**And** the user's chosen name appears engraved/stamped on the Taag card (the naming IS the emotional apex, not the confetti)
**And** `PUT /api/v1/taags/{taagId}/name` requires `[Authorize(Policy = "PromotedAccount")]` — age-verified users only

**Given** content moderation is needed across the platform
**When** any UGC is submitted (Taag names, clue text, hunt descriptions, completion messages)
**Then** the same `IContentModerator.CheckTextAsync()` function is called inline before every UGC save (FR37)
**And** the single `CheckText` function handles all UGC types — no separate modes needed

### Story 1.7: Taag Profile Card & Already-Claimed Experience

As a user who scans an already-claimed Taag,
I want to see a dramatic reveal of who owns it and be invited to watchlist it,
So that I feel rivalry and anticipation instead of disappointment.

**Acceptance Criteria:**

**Given** an authenticated user
**When** they request `GET /api/v1/taags/{taagId}`
**Then** the response returns `TaagDetailDto` with: `id`, `customName`, `approximateLocation` (GPS truncated to 2 decimal places ~1.1km — truncation in service layer), `claimStatus`, `claimExpiresAt` (only for requesting user's claimed Taags), `userRelationship` (pioneered/claimed/visited/watchlisted/none), `originalDiscoverer` (PlayerSummaryDto), `currentController` (PlayerSummaryDto, nullable)
**And** `TaagDetailDto` never contains `NormalizedContent` or `RawContent`

**Given** a scan returns `outcome: "collection"` with a Taag claimed by another user
**When** the frontend renders the result
**Then** the "darn!" moment plays: theatrical disappointment animation with "darn!" sound (or haptic in silent mode)
**And** the current controller's name is revealed with dramatic flair — not a label, a REVEAL
**And** the Taag profile card shows three-tier attribution: Original Discoverer (etched/permanent visual), Current Controller (dynamic banner), Custom Name (set by controller) (FR8)

**Given** the "darn!" moment has played
**When** the watchlist invitation appears
**Then** it's framed as a power move: "Want to know when this one's up for grabs?" (not "Add to watchlist")
**And** tapping the invitation calls `POST /api/v1/taags/{taagId}/watchlist` (FR10)
**And** the Watchlist entity is created with unique constraint (PlayerId, TaagId) — no duplicate entries

**Given** a user wants to remove a Taag from their watchlist
**When** they call `DELETE /api/v1/taags/{taagId}/watchlist`
**Then** the Watchlist entry is removed and the response returns 204

**Given** the TaagCard component
**When** rendering different Taag relationships
**Then** the card visual varies by `userRelationship`: Owned/pioneered (full stamp aesthetic), Visited (pencil sketch), Claimed-by-other (faded), based on the passport metaphor
**And** the card uses Volume Knob level 2 (Styled) — stamp borders, torn edges, illustrated elements

**Given** a repeat scan of an already-visited Taag (not yours, seen before)
**When** the frontend renders the result
**Then** it shows updated intelligence: fresh context about the current controller's activity
**And** the scan is never dismissed as "already scanned" — every outcome is an invitation

### Story 1.8: Collection View & User Reporting

As a user,
I want to browse all the Taags I've ever scanned in my passport-style collection and report inappropriate content,
So that I can see my journey grow and help keep the community safe.

**Acceptance Criteria:**

**Given** an authenticated user
**When** they request `GET /api/v1/players/me/collection`
**Then** the response returns an array of `CollectionItemDto` representing all distinct Taags from their ScanEvents (collection is derived, not a separate entity)
**And** items are sorted by most recently scanned first (using `ScanEvent(PlayerId, ScannedAt DESC)` index)
**And** each item includes the TaagSummaryDto with `userRelationship` for card variant selection
**And** the response has an implicit ceiling of 500 items (no pagination at MVP)
**And** an optional `relationship` query parameter filters by: Pioneered, Controlled, Visited, Watchlisted (default: all)

**Given** the Collection tab
**When** the user navigates to it
**Then** the PassportPage component renders a swipeable, horizontal-scroll collection of TaagCard components
**And** cards display with visual weight by relationship: pioneered Taags as bold entry stamps ("FIRST DISCOVERY"), claimed Taags as name written in ink, visited Taags as pencil sketches (passport metaphor)
**And** the collection screen is designed as an emotional gravity well — territory map / trophy wall, not a flat list

**Given** an empty collection (new user, no scans yet)
**When** the Collection tab is displayed
**Then** an inviting empty state encourages the user to scan their first QR code — "Your passport is empty. Time to explore!"

**Given** the user is viewing a Taag card or hunt detail
**When** they want to report a community guideline violation (FR38)
**Then** a report button is available on Taag cards and hunt details
**And** tapping it calls `POST /api/v1/reports` with `ReportCreateDto`: `targetType` (Taag/Hunt/HuntStop), `targetId`, `reason` (Offensive/Dangerous/Spam/Other), `detail` (optional text, moderated)
**And** the Report entity is created with `Status` = Pending and `ReporterId` = current player

**Given** the Report entity
**When** created
**Then** it uses polymorphic targeting: `TargetType` enum (Taag, Hunt, HuntStop) + `TargetId` (UUID)
**And** the `Detail` text field is passed through content moderation before saving

**Given** all screens in the app
**When** accessibility requirements are evaluated
**Then** sound follows device mode — silent/vibrate uses haptic celebration patterns
**And** reduced motion is respected — system reduced-motion settings replace animations with static reveals
**And** screen reader provides emotional state descriptions for all celebrations and transitions
**And** high contrast is maintained for outdoor use in direct sunlight
**And** no color-only communication — emotional states use multiple channels (animation + sound/haptic + text)

---

That's all 8 stories for Epic 1. Let me verify FR coverage:

| FR | Story | Covered? |
|----|-------|----------|
| FR1 (scan QR code) | 1.4 | ✓ |
| FR2 (extract raw data) | 1.4 | ✓ |
| FR3 (create Taag record) | 1.5 | ✓ |
| FR4 (Taag profile card) | 1.7 | ✓ |
| FR5 (claim unclaimed Taag) | 1.5 | ✓ |
| FR6 (custom naming) | 1.6 | ✓ |
| FR8 (three-tier attribution) | 1.7 | ✓ |
| FR9 (personal collection) | 1.8 | ✓ |
| FR10 (watchlist add) | 1.7 | ✓ |
| FR37 (content moderation) | 1.6 | ✓ |
| FR38 (user reporting) | 1.8 | ✓ |
| FR41 (playful rejection) | 1.6 | ✓ |
| FR42 (account creation) | 1.3 | ✓ |
| FR43 (require account) | 1.3 | ✓ |
| FR44 (COPPA age gate) | 1.3 | ✓ |
| FR45 (social login) | 1.3 | ✓ |
| FR48 (geofence) | 1.4 | ✓ |
| FR49 (rate limiting) | 1.4 | ✓ |

**All 18 FRs covered. 8 stories. Each independently completable in sequence.**

---

## Epic 2: Leaderboards & Player Profiles

Users can compete on leaderboards (sourcing, scanning, hunts completed), view other players' public profiles, and see their own stats summary.

### Story 2.1: Leaderboard API & Display

As a user,
I want to see how I rank against other players on leaderboards for sourcing, scanning, and hunt completion,
So that I feel competitive motivation to keep scanning and playing.

**Acceptance Criteria:**

**Given** an unauthenticated or authenticated user
**When** they request `GET /api/v1/leaderboards/{type}?period=`
**Then** the response returns `LeaderboardDto` with `type` (sourcers/scanners/hunters), `period` (week/month/alltime — default alltime), and `entries` array
**And** each entry contains `rank`, `player` (PlayerSummaryDto with displayName + discriminator), and `score`
**And** the endpoint is `[AllowAnonymous]` — leaderboards are publicly viewable
**And** leaderboard data uses `IMemoryCache` with 30-second TTL

**Given** the `sourcers` leaderboard type
**When** scores are calculated
**Then** score = COUNT of Taags where `OriginalDiscovererId` = player (pioneered Taags)

**Given** the `scanners` leaderboard type
**When** scores are calculated
**Then** score = COUNT of ScanEvents for the player (total scans)

**Given** the `hunters` leaderboard type
**When** scores are calculated
**Then** score = COUNT of HuntProgress where `CompletedAt IS NOT NULL` for the player

**Given** the Leaderboard tab
**When** the user navigates to it
**Then** the leaderboard screen displays with arcade aesthetic (Volume Knob level 1: Ambient — dark background, monospace type, neon accent highlights)
**And** three leaderboard types are selectable via tabs or segmented control
**And** period filter (week/month/all time) is available
**And** the user's own position is highlighted if they appear on the board
**And** tapping a player name navigates to their public profile

**Given** `PlayerSummaryDto`
**When** duplicate display names exist
**Then** the `discriminator` field (first 4 chars of PlayerId) is shown alongside the display name for visual disambiguation

**Given** two players with the same leaderboard score
**When** ties occur in ranking
**Then** ties are broken by earliest achievement date — the first player to reach the score ranks higher
**And** tie-breaking is deterministic and consistent across all leaderboard types and periods

### Story 2.2: Player Profile & Public Stats

As a user,
I want to view my own stats and other players' public profiles,
So that I can track my progress and scout the competition.

**Acceptance Criteria:**

**Given** an authenticated user
**When** they request `GET /api/v1/players/{playerId}/profile`
**Then** the response returns `PlayerPublicProfileDto` with: `displayName`, `discriminator`, `taagsSourced` (COUNT of pioneered Taags), `totalScans` (COUNT of ScanEvents), `currentlyControlledCount` (COUNT of Taags where CurrentControllerId = player AND claim not expired), `memberSince` (Player.CreatedAt)
**And** the response contains aggregate stats only — no activity history, no location data, no scan details

**Given** the Profile tab
**When** the user navigates to it
**Then** their own profile displays with full stats: Taags sourced, total scans, member since date, collection count
**And** links to their collection and active/completed hunts are available
**And** the profile uses the passport cover metaphor — visual identity that evolves with milestones (Fast Follow)

**Given** a player's public profile
**When** accessed from a leaderboard entry or Taag card
**Then** the public profile shows the same `PlayerPublicProfileDto` stats
**And** no private data is exposed (no email, no location history, no watchlist)

---

## Epic 3: Territory Defense & Claim Maintenance

The competitive territory loop — claims expire after 30 days, users re-scan to maintain, pre-expiration warnings fire, previous controllers get notified, watchlist subscribers get alerts, expired Taags can be reclaimed. Push notification infrastructure built here as the first epic that motivates it.

### Story 3.1: Push Notification Infrastructure

As a platform,
I want a notification dispatch system using bounded Channel and BackgroundService with push token management,
So that the territory defense system can deliver timely alerts to users.

**Acceptance Criteria:**

**Given** the notification system
**When** `NotificationChannel.cs` is implemented in `Shared/Infrastructure/`
**Then** a bounded `Channel<ScanNotification>` with ~1000 capacity is configured
**And** `TryWrite` returns false when full — the scan still succeeds, the notification is dropped and logged
**And** all Channel messages are immutable records with `TraceId` (HttpContext.TraceIdentifier) and `OccurredAt`

**Given** the notification consumer
**When** `NotificationBackgroundService.cs` is implemented
**Then** a single `BackgroundService` reads from the Channel and dispatches push notifications
**And** `Task.Run()` is banned — always use `BackgroundService`
**And** notifications are best-effort — scan success is critical, lost notifications during outage are acceptable at MVP

**Given** the push notification system
**When** a user authenticates
**Then** the client registers its push token with the backend (Expo Push token)
**And** tokens are stored per-user and updated on each app launch

**Given** push token lifecycle
**When** the app launches
**Then** the push token is re-registered with the backend on every launch (overwrites previous token for that user)
**And** backend ignores delivery failures to invalid tokens — no stale token cleanup at MVP

**Given** the user denies push notification permissions
**When** the OS permission prompt is declined
**Then** the app functions normally — all features work, notifications degrade gracefully
**And** no in-app notification center at MVP — push is the only notification channel
**And** notification preference endpoint `PUT /api/v1/players/me/preferences` with per-type opt-out is a Fast Follow (not in this story)

**Given** notification design principles
**When** notifications are sent
**Then** notifications are conservative — fewer is better
**And** notification content uses emotionally designed copy, not generic alerts

### Story 3.2: Claim Expiration & Re-scan Renewal

As a Taag controller,
I want my claim to expire if I don't re-scan within 30 days and be able to renew by re-scanning,
So that the territory game stays alive and unclaimed Taags become available for others.

**Acceptance Criteria:**

**Given** a Taag with `CurrentControllerId` set and `ClaimRenewedAt` more than 30 days ago
**When** any user scans this Taag
**Then** the system evaluates `ClaimRenewedAt + 30 days < now` at scan time (lazy evaluation — no background job changes claim state) (FR14)
**And** the expired claim is cleared: `CurrentControllerId` set to null, `CustomName` optionally preserved or reset
**And** the scanning user receives `outcome: "unclaimedDiscovery"` with option to claim

**Given** a user who is the `CurrentControllerId` of a Taag
**When** they scan that Taag
**Then** `ClaimRenewedAt` is updated to now, extending the claim for another 30 days (FR15)
**And** the ScanEvent is created with `Outcome: ClaimRenewal`
**And** claim renewal is implicit — no separate endpoint, the scan itself renews

**Given** a Taag whose claim has expired
**When** a different user scans and claims it
**Then** `CurrentControllerId` is updated to the new user (FR16)
**And** `OriginalDiscovererId` remains unchanged — permanent credit
**And** the new controller can set a new `CustomName`

**Given** two users attempt to claim the same unclaimed Taag simultaneously
**When** optimistic concurrency detects a conflict via `Taag.ClaimRenewedAt` concurrency token
**Then** the first transaction succeeds with `unclaimedDiscovery`
**And** the second transaction catches `DbUpdateConcurrencyException`, reloads the Taag, retries once, and processes as `collection`
**And** max 1 retry — if second attempt also fails, return 409 Conflict

### Story 3.3: Expiration Notifications & Watchlist Alerts

As a Taag controller,
I want to receive warnings before my claims expire and notifications when they do, and watchlist subscribers should be alerted when Taags become available,
So that everyone has a fair chance to defend or claim territory.

**Acceptance Criteria:**

**Given** the daily expiration notification service
**When** `ExpirationNotificationService` (a `BackgroundService` with `PeriodicTimer`) runs daily
**Then** it queries for claims where `ClaimRenewedAt + 30 days < now` and dispatches expiration notifications to previous controllers via Channel (FR17)
**And** it queries for claims where `ClaimRenewedAt + 29 days < now` (within 1 day of deadline) and dispatches pre-expiration warning notifications (FR19)
**And** this service does NOT change claim state — claims remain lazy-evaluated at scan time

**Given** a Taag claim has expired
**When** the expiration notification is dispatched
**Then** the previous controller receives an emotionally designed notification: "'[CustomName]' has fallen. Your Pioneer legacy endures — you'll always be the one who found it first. [Add to Watchlist] [View Taag]" (FR17)
**And** watchlist subscribers receive notifications: "Remember '[CustomName]'? It's uncontested. This is your moment." (FR18)
**And** notifications use premium emotional copywriting referencing specific Taag names

**Given** a user's Taag claim is within 1 day of expiration
**When** the pre-expiration warning fires
**Then** the user receives: "Your claim on '[CustomName]' expires tomorrow. Re-scan to keep it yours!" (FR19)

**Given** notification budgeting
**When** multiple notifications would fire for a single user
**Then** maintenance notifications are aggregated per user per period
**And** priority tiers apply: watchlist alerts > claim expiry warnings > general updates

**Given** the `TaagSummaryDto`
**When** `claimExpiresAt` is populated
**Then** it is only populated when `claimStatus` is "claimed" by the requesting user
**And** the client computes 7-day warning locally from this field

---

## Epic 4: Hunt Creation & Publishing

Creators can build scavenger hunts using field mode (draft-as-you-go with creation-mode efficiency — suppressed celebrations) and map mode (couch builder), sequence stops with clues and optional hints, write a custom completion message, reorder stops, and publish with a shareable deep link.

### Story 4.1: Hunt CRUD & Draft Management

As a creator,
I want to create a new hunt with a title and description and manage it as a draft,
So that I can start building my scavenger hunt experience.

**Acceptance Criteria:**

**Given** an age-verified user (PromotedAccount policy)
**When** they call `POST /api/v1/hunts` with `HuntCreateDto` (title varchar 50, description varchar 200)
**Then** a Hunt entity is created with `Status: Draft`, `CreatorId` = current player, `CreatedAt` and `UpdatedAt` timestamps
**And** title and description are passed through content moderation before saving
**And** the response is 201 + `HuntDetailDto` + `Location` header (FR20)

**Given** the hunt creator
**When** they call `PUT /api/v1/hunts/{huntId}` with updated title, description, or completion message
**Then** the hunt is updated (full PUT replacement) and moderation runs on all text fields
**And** only the hunt's creator can update (verified server-side)
**And** `CompletionMessage` is moderated — this is the creator's personal message displayed at hunt completion (FR24)

**Given** the hunt creator
**When** they call `DELETE /api/v1/hunts/{huntId}`
**Then** the hunt status is set to `Archived` (soft delete) — 204 response
**And** active players mid-hunt can still complete it
**And** the hunt no longer appears in discovery

**Given** the Hunt entity
**When** it is created
**Then** it uses UUIDv7 primary key, and all text fields (Title, Description, CompletionMessage) have varchar limits enforced by data annotations

### Story 4.2: Hunt Stop Management & Clue Writing (Field Mode)

As a creator walking through the real world,
I want to scan Taags and add them as sequenced hunt stops with clues and optional hints,
So that I can build hunts in the field while experiencing the player's future journey.

**Acceptance Criteria:**

**Given** the hunt creator with an active draft
**When** they call `POST /api/v1/hunts/{huntId}/stops` with a TaagId, ClueTitle (varchar 30, required), ClueText (varchar 280, required), and optional HintText
**Then** a HuntStop entity is created with server-assigned SortOrder (gap-based: 100, 200, 300...) and GeofenceRadius (default 50m) (FR21)
**And** all text fields (ClueTitle, ClueText, HintText) are moderated before saving
**And** response is 201 + `HuntStopDetailDto`

**Given** the same Taag is added to the same hunt twice
**When** the unique constraint `(HuntId, TaagId)` is violated
**Then** the request is rejected with a 409 Conflict Problem Details response

**Given** the hunt creator wants to remove a stop
**When** they call `DELETE /api/v1/hunts/{huntId}/stops/{stopId}`
**Then** the stop is removed and the response is 204
**And** only the hunt's creator can delete stops

**Given** the hunt creator wants to reorder stops
**When** they call `POST /api/v1/hunts/{huntId}/stops/reorder` with `{ stopIds: [...] }` (FR23)
**Then** the server re-assigns SortOrder values as `index × 100` for the new order
**And** client never does gap math — server manages all SortOrder values

**Given** optional hints (FR25)
**When** a creator provides HintText for a stop
**Then** it is saved and will be offered to players after 3 unsuccessful scan attempts at that stop
**When** HintText is null
**Then** no hint is available for that stop

**Given** the user has an active draft hunt
**When** they scan a Taag in the field
**Then** creation-mode efficiency activates: player celebrations are suppressed
**And** a quick "Added as Stop N" confirmation appears with inline clue writing
**And** the scan still records normally (ScanEvent created) but the UX prioritizes creation flow

### Story 4.3: Map-Based Hunt Builder

As a creator at home on the couch,
I want to see all my sourced Taags on a map and add them to my hunt by tapping,
So that I can build or refine hunts without being physically at each location.

**Acceptance Criteria:**

**Given** an age-verified creator with an active draft
**When** they open the map-based builder
**Then** all sourced Taags in the area are displayed on a map using `GET /api/v1/taags?lat=&lng=&radiusMeters=` (max 100 results, Active status only) (FR22)
**And** map is rendered via `react-native-maps` (Google Maps provider on Android, Apple Maps on iOS)
**And** Taag pins cluster at zoom level <14 via `react-native-map-clustering`
**And** the map uses info-dense Taag pins with status indicators (yours/claimed/unclaimed) using the stamp/sticker aesthetic
**And** `onRegionChangeComplete` is debounced 500ms before triggering API refresh for the visible region

**Given** the map view
**When** the creator taps a Taag pin
**Then** they can add it as a hunt stop with ClueTitle, ClueText, and optional HintText — same endpoint as field mode
**And** the stop appears in the hunt's stop sequence

**Given** the map view with existing stops
**When** stops are displayed
**Then** the hunt route is shown as a dashed polyline connecting stops in order (no animation at MVP)
**And** the creator can visually assess the journey flow

**Given** map loading states
**When** Taags are loading for the visible region
**Then** a subtle loading indicator displays on the map (not a full-screen spinner)
**When** no Taags exist in the visible region
**Then** an empty state message appears: "No sourced Taags nearby. Scan some QR codes first!"

**Given** draft state persistence
**When** the creator switches between field mode and map mode
**Then** the draft persists seamlessly — stops added in field mode appear on the map and vice versa
**And** the transition between modes is frictionless (same hunt, same data, different view)

### Story 4.4: Hunt Publishing & Deep Links

As a creator,
I want to publish my completed hunt and get a shareable link,
So that players can discover and play my scavenger hunt.

**Acceptance Criteria:**

**Given** a draft hunt with 2+ stops
**When** the creator publishes the hunt (status transition: Draft → Published) (FR26)
**Then** the server validates `COUNT(HuntStops) >= 2` — if fewer, returns `hunt-not-publishable` Problem Details (422)
**And** hunt status changes to Published and becomes playable

**Given** a published hunt
**When** the system generates a deep link (FR27)
**Then** the format is `https://taagback.app/hunt/{huntId}` using Expo universal links
**And** the link is shareable via native share sheet
**And** where feasible, deep link context survives app installation (deferred deep linking via expo-linking — best-effort)

**Given** the publish moment
**When** the creator hits Publish
**Then** a creator-specific celebration plays — this feels like releasing art, not submitting a form
**And** the shareable deep link is prominently displayed for easy sharing

**Given** a published hunt
**When** the creator wants to fix text content
**Then** `PUT /api/v1/hunts/{huntId}` allows editing title, description, and completion message on published hunts
**And** `PUT /api/v1/hunts/{huntId}/stops/{stopId}` allows editing ClueTitle, ClueText, and HintText on published hunts
**And** structural changes (add/remove/reorder stops) are NOT allowed on published hunts — returns `hunt-published-structural-change` Problem Details (422)
**And** all text edits are moderated before saving

**Given** a published hunt
**When** viewed by the creator via `GET /api/v1/hunts/{huntId}`
**Then** `HuntDetailDto` includes creator-only fields: `playerCount` (COUNT of HuntProgress) and `completionCount` (COUNT of HuntProgress WHERE CompletedAt IS NOT NULL) (FR35 — creator stats)

---

## Epic 5: Hunt Play & Completion

Players can discover hunts organically through Taag scans, accept invitations, play through sequential clues, receive hints after 3 failed attempts, experience hunt-specific geofence verification, and experience the blackout crescendo with creator's personal message on completion.

### Story 5.1: Hunt Discovery & Join

As a player scanning Taags,
I want to organically discover hunts when I scan a Taag that's part of one and be invited to join,
So that the game finds me through the real world.

**Acceptance Criteria:**

**Given** a player scans a Taag that is stop #1 (SortOrder = 100) of a published hunt they haven't joined
**When** the scan-time hunt check runs (step 3 of the 3-step query)
**Then** the system auto-creates a HuntProgress entity with `CurrentStopOrder = 0`, `StartedAt = now`
**And** the ScanResultDto includes `huntProgress` with `huntId`, `huntTitle`, `progressPhase: "early"`, and the first clue (FR28)

**Given** a player who hasn't started a hunt
**When** they receive the hunt invitation in the scan result
**Then** the UX presents: "This Taag is part of an active hunt: [Hunt Title]. Want to join?" — natural and exciting, no pressure
**And** the hunt transition zone plays: 3-second atmospheric build (screen dims, ambient mood shifts, hunt title + tagline appear, then first clue materializes)

**Given** a player scans a Taag that is stop #1 of multiple published hunts
**When** the scan-time hunt check finds multiple matching hunts
**Then** the ScanResultDto includes `availableHunts` array with `huntId`, `huntTitle`, and `stopCount` for each
**And** the frontend presents a hunt picker: "This Taag is part of [N] hunts — which one?" with hunt titles
**And** if the player is mid-hunt, only the active hunt progresses — other hunt invitations are suppressed

**Given** a player receives a hunt deep link
**When** they call `POST /api/v1/hunts/{huntId}/join`
**Then** a HuntProgress entity is created with `CurrentStopOrder = 0`
**And** the response returns `HuntProgressDto` + first clue details
**And** unique constraint `(PlayerId, HuntId)` prevents duplicate joins

**Given** a player who has completed a hunt
**When** they call `POST /api/v1/hunts/{huntId}/join` again
**Then** a new HuntProgress entity is created (previous one is archived with `CompletedAt` intact)
**And** the player can replay the hunt from the beginning
**And** only the latest HuntProgress counts for leaderboard ranking

**Given** the safety/TOU gate (FR36)
**When** a user attempts to join their first-ever hunt
**Then** a safety reminder and TOU acceptance gate is displayed before proceeding
**And** acceptance is recorded and not shown again for subsequent hunts

**Given** hunt clue data
**When** a player joins a hunt
**Then** hunt stop data (clues, stop count) is pre-cached on-device for fast display (offline resilience)
**And** hunt progression requires connectivity — queued offline scans advance hunts upon sync

### Story 5.2: Clue Progression & Hints

As a player in an active hunt,
I want to follow clues sequentially — solving each one to reveal the next — with hints available if I'm stuck,
So that I experience the rhythmic clue-think-walk-scan loop.

**Acceptance Criteria:**

**Given** a player with active HuntProgress
**When** they scan the Taag matching the next expected stop (QR token match + geofence verification via `ST_DWithin`)
**Then** `HuntProgress.CurrentStopOrder` advances to this stop's SortOrder (FR30)
**And** the next clue is revealed in the ScanResultDto's `huntProgress.nextClue`
**And** a reward animation plays for the successful stop scan

**Given** the `progressPhase` field in `ScanResultDto.huntProgress`
**When** the server computes it
**Then** thresholds are: 0-25% = "early", 25-60% = "middle", 60-90% = "late", 90-100% = "final"
**And** no numeric position is leaked — the mystery of "how many are left?" builds tension (FR30)

**Given** a player scans the wrong QR code during an active hunt
**When** the scanned Taag does not match the expected stop
**Then** the scan processes normally (Taag sourcing/collection) but hunt progression is not advanced
**And** the player's unsuccessful attempt count for the current stop increments

**Given** a player has 3 unsuccessful scan attempts at a stop (FR31)
**When** the stop has a creator-provided HintText
**Then** the hint is offered: "Having trouble? [Try the hint]"
**When** the stop has no HintText (null)
**Then** no hint is available — only the report option: "Having trouble? [Report this stop]"

**Given** a player reports a hunt stop as broken/inaccessible
**When** the report is submitted
**Then** the system offers: "Skip this stop and continue to the next clue?"
**And** if the player skips, `HuntProgress.CurrentStopOrder` advances past the skipped stop
**And** the skipped stop is recorded in HuntProgress metadata — completion is marked as partial ("X of Y stops completed, 1 skipped")
**And** the hunt completion celebration still fires if all remaining stops are completed
**And** the completion card notes partial completion: "[Hunt Name] — completed with 1 stop skipped"

**Given** the ClueCard component
**When** the camera is active during a hunt
**Then** the ClueCard displays in Peek state: minimized single-line bar at screen top showing ClueTitle only
**When** the player taps the ClueCard
**Then** it expands to Active state showing full ClueText
**And** ClueCard states: Locked (mysterious/next), Active (readable/current), Solved (stamped/completed)

**Given** geofence verification for hunt stops (FR32)
**When** the player scans at the correct Taag but outside the stop's GeofenceRadius
**Then** the hunt progression is NOT advanced (scan still succeeds as a normal Taag scan)
**And** the player receives feedback that they need to be closer to the location

**Given** hunt progress persistence
**When** the player quits the app and returns
**Then** progress resumes from the last completed stop, not stop 1
**And** abandoned hunts show in history: "[Hunt Name] — X stops completed (incomplete)"

### Story 5.3: Hunt Completion & Blackout Crescendo

As a player completing a hunt,
I want to experience a cinematic blackout crescendo celebration followed by the creator's personal message,
So that the completion feels like a movie moment that inspires me to create my own hunts.

**Acceptance Criteria:**

**Given** a player scans the final stop of a hunt
**When** `HuntProgress.CompletedAt` is set (isComplete: true in ScanResultDto)
**Then** the server includes `totalStops` (revealed only at completion) and up to 2 `nearbyHuntHints` in the response
**And** `nearbyHuntHints` are other published hunts with stops near the player's recent scan locations — powering the "one more run" retention prompt

**Given** the hunt is complete
**When** the frontend receives `isComplete: true`
**Then** the blackout crescendo plays (FR33):
1. Screen goes completely black — 2-3 seconds of pure black (the dramatic pause). True fullscreen: status bar hidden via `expo-status-bar` (`setStatusBarHidden(true)`), navigation bar hidden via `expo-navigation-bar` (`setVisibilityAsync('hidden')`)
2. Taps during the blackout phase are ignored (no dismiss, no skip)
3. Celebratory fanfare fades in and CRESCENDOS with confetti, music, fireworks (Lottie + expo-av)
4. Taps during the celebration phase skip forward to the completion card
5. Full-screen immersive (Volume Knob level 3: Immersive)
**And** Lottie animation files are bundled in the app binary (not downloaded at runtime). Audio/Lottie asset creation is a separate design task — story is implementable with placeholder assets
**And** the crescendo respects reduced-motion settings (static reveal with sound/haptic only)
**And** sound follows device mode — silent/vibrate replaces audio with haptic crescendo pattern: 3 light pulses (200ms apart) → 2 medium pulses → 1 heavy pulse with 100ms vibrate
**And** the blackout pause timing is critical: shorter = feels like a glitch, longer = feels like magic

**Given** the crescendo has completed
**When** the creator's completion message is displayed (FR34)
**Then** it is presented as a personal letter — handwritten-style visual treatment with the creator's name signed at the bottom
**And** the presentation transforms metadata into parasocial connection

**Given** hunt completion
**When** the completion card is generated
**Then** a shareable completion card (Gift Shop Exit) is created with: hunt name, player time, rank, date, unique visual
**And** the card is designed for sharing — visually comprehensible to non-users
**And** share functionality is one tap to native share sheet (never modal, never prompted)

**Given** the hunt completion screen
**When** "one more run" hooks display
**Then** nearby hunt hints appear: "[Hunt Title] — [X stops] — [distance]m away"
**And** the screen never ends on a closed note — always points toward the next adventure

**Given** hunt completion stats (FR35)
**When** the player views their completion
**Then** they see their time, rank on the hunt leaderboard, and the total number of stops (revealed for the first time)

---

## Epic 6: Safety & Platform Integrity

Admins can review the moderation queue, act on reports, reset Taag names, issue warnings, and restrict accounts. The platform detects duplicate/mass-produced QR codes and flags impossible travel speeds.

### Story 6.1: Admin Moderation Tools

As an admin,
I want to review reported content and take enforcement actions via API,
So that the platform remains safe and compliant.

**Acceptance Criteria:**

**Given** an admin user
**When** they call `GET /api/v1/admin/reports` with optional status filter
**Then** the response returns a list of `ReportListItemDto` with report details, target info, and reporter info (FR39)
**And** the endpoint requires `[Authorize(Policy = "AdminOnly")]`

**Given** an admin reviewing a report
**When** they call `PUT /api/v1/admin/reports/{reportId}` with updated status (Reviewed/Dismissed)
**Then** the report status is updated
**And** if reviewed with action needed, the admin proceeds to Taag/account actions

**Given** an admin acting on a Taag
**When** they call `PUT /api/v1/admin/taags/{taagId}/status` with new status (Active/Suspended/Removed) (FR40)
**Then** the Taag status changes
**And** if the Taag is part of any hunt, `AdminService` queries `HuntStop(TaagId)` index, finds affected hunts, and dispatches creator notifications via Channel
**And** players mid-hunt with a suspended stop get a skip option

**Given** an admin resetting a Taag name (FR40)
**When** the admin updates a Taag's CustomName
**Then** the offensive name is replaced with a system-generated default
**And** the offending user receives a warning (dispatched via notification Channel)

**Given** all admin endpoints
**When** accessed
**Then** no admin UI exists at MVP — all operations via direct API calls (Postman/curl)
**And** admin operations are logged at `Information` level with admin PlayerId and action details

### Story 6.2: Anti-Fraud Detection

As the platform,
I want to detect duplicate QR codes scanned at different locations and flag impossible travel between scans,
So that the databank maintains integrity and leaderboards reflect real-world effort.

**Acceptance Criteria:**

**Given** a QR code that has been scanned at significantly different GPS locations (FR46)
**When** ≥3 scans of the same NormalizedContent have locations >500m from the centroid of all scan locations for that Taag
**Then** the Taag is flagged with `IntegrityFlag = DuplicateSuspect`
**And** flagged Taags are marked for admin review but not automatically removed
**And** duplicate detection is inline — a lightweight `ST_DWithin` query against existing ScanEvents during the scan pipeline (not a batch job)

**Given** a user submits scans with impossible movement speeds (FR47)
**When** haversine distance / time between consecutive ScanEvents from the same user exceeds 300 km/h (accommodates high-speed rail, flags teleportation)
**Then** the scans are flagged for review
**And** the user is not blocked — flags are for admin investigation
**And** flagging is logged at `Warning` level with PlayerId and scan details
**And** travel speed check is dispatched async via the notification Channel — non-blocking to the scan response

**Given** anti-fraud detection
**When** it runs
**Then** duplicate detection is inline (lightweight query). Travel speed check is async (via Channel).
**And** false positive rate is prioritized — better to miss some fraud than to penalize legitimate users
**And** flagged items surface in `GET /api/v1/admin/reports` alongside user-submitted reports — `TargetType = Taag`, `Reason = SystemFlagged`

### Story 6.3: Account Deletion & Data Purge

As a user,
I want to delete my account and have my personal data purged within 45 days,
So that my privacy rights are respected per state privacy law requirements.

**Acceptance Criteria:**

**Given** an authenticated user
**When** they call `DELETE /api/v1/players/me`
**Then** the Player entity is soft-deleted: `Status = PendingDeletion`, `DeletionRequestedAt = now` (NFR17)
**And** the user is immediately signed out and their auth tokens are invalidated
**And** the response returns 202 Accepted with a confirmation message

**Given** a player with `Status = PendingDeletion`
**When** 45 days have elapsed since `DeletionRequestedAt`
**Then** the daily `DataPurgeBackgroundService` permanently anonymizes the player's data:
- `Player.DisplayName` → "Deleted User", `Player.ExternalAuthId` → null (unique index drops)
- `ScanEvent` records are retained (append-only log) but `PlayerId` is anonymized to a tombstone UUID
- `Taag.OriginalDiscovererId` and `Taag.CurrentControllerId` references are set to null where they point to the deleted player
- `HuntProgress`, `Watchlist`, and `Report` (as reporter) records are hard-deleted
- `ScanImage` blobs are deleted from blob storage
- Firebase Auth account is deleted via Admin SDK
**And** the purge is logged at `Information` level with anonymized stats (record counts, not player details)

**Given** a player with `Status = PendingDeletion`
**When** they attempt to log in within the 45-day window
**Then** the system allows them to cancel the deletion request and reactivate their account

**Given** all deletion operations
**When** the purge runs
**Then** the 45-day SLA is enforced — `DeletionRequestedAt + 45 days` is the hard deadline
**And** hunt creator deletion: hunts created by the deleted player are archived (Status = Archived), not deleted — active players can still complete them

---

## Epic 7: Location Intelligence & Scan Imagery

Users can capture images of QR code surroundings, and the system extracts EXIF metadata to progressively refine Taag location accuracy through triangulation from multiple scans.

### Story 7.1: Scan Image Capture & Upload

As a user who just scanned a Taag,
I want to optionally capture an image of the QR code's surroundings,
So that I can help TaagBack understand where Taags are in the real world.

**Acceptance Criteria:**

**Given** the scan celebration has settled (~2-3 seconds post-scan)
**When** the image capture prompt appears
**Then** it displays: "Help TaagBack see what's around this Taag" — framed as contribution, not data collection (FR50)
**And** the interaction is distinct from QR scanning — a deliberate shutter button tap, NOT the automatic QR detection
**And** dismissing the prompt is always easy and never penalizing
**And** the prompt appears during the emotional airlock / summary card phase — never interrupts the celebration itself

**Given** the user captures an image
**When** the image is submitted
**Then** it is uploaded asynchronously via `POST /api/v1/scans/{scanEventId}/image` (multipart/form-data) without blocking the scan result flow (FR51)
**And** the endpoint returns 202 Accepted
**And** if the upload fails, it retries silently — no error shown to user

**Given** the ScanImage entity
**When** created
**Then** it stores: `ScanEventId` (FK), `StorageKey` (blob storage path), `ExifLatitude/Longitude/Bearing` (nullable, populated after extraction), `ProcessedAt` (nullable), `CreatedAt`
**And** images are stored in Azure Blob Storage (MinIO for local dev)

### Story 7.2: EXIF Extraction & Location Triangulation

As the platform,
I want to extract GPS metadata from scan images and refine Taag locations using triangulated data from multiple scans,
So that Taag placement accuracy improves over time.

**Acceptance Criteria:**

**Given** a scan image is uploaded
**When** EXIF extraction runs via `MetadataExtractor` NuGet package
**Then** GPS coordinates, compass bearing, and estimated distance are extracted and stored on the ScanImage entity (FR52)
**And** EXIF extraction runs in the `NotificationBackgroundService` consumer (alongside notification dispatch) — not inline with the upload request
**And** `ProcessedAt` is set after successful extraction

**Given** EXIF GPS coordinates are extracted
**When** validation runs
**Then** the extracted EXIF GPS is compared against the scan's GPS location — if >5km apart, the EXIF GPS is discarded (stale device location cache)
**And** validated EXIF data is stored; invalid data is logged and ignored

**Given** multiple scan images exist for a Taag from different angles
**When** the triangulation service runs (FR53)
**Then** it refines `Taag.Location` using weighted centroid of all validated EXIF GPS points for that Taag (not bearing intersection at MVP)
**And** outlier points >1km from the current centroid are discarded from the calculation
**And** location refinement is progressive — each new validated image recalculates the centroid
**And** no convergence guarantee at MVP — accuracy improves with more data points but is not bounded

**Given** EXIF data variability
**When** a scan image has no GPS data (some devices strip EXIF on capture)
**Then** the image is stored for future Phase 2 vision analysis but contributes no location data
**And** missing EXIF data is expected and handled gracefully — no errors, no user-facing messages

**Given** image retention
**When** images are stored
**Then** they are retained for Phase 2 vision analysis processing
**And** source images are deleted only after Phase 2/3 vision analysis has extracted all useful data (FR55 — future)

---

## Cross-Cutting Conventions

### Error Handling Defaults

All API-consuming stories follow these defaults unless overridden by story-specific ACs:

| Condition | Frontend Behavior |
|-----------|------------------|
| Network failure | Retry once silently, then show "Something went wrong. Try again?" with retry button |
| 404 Not Found | Navigate back with toast: "This [item] is no longer available" |
| 500 Server Error | Generic error screen with retry button |
| Request timeout (>5s) | Same as network failure |
| 401 Unauthorized | Silent token refresh via `authService.getToken(forceRefresh: true)`, retry once, then redirect to login |
| 403 Forbidden | Toast: "You don't have permission to do that" |
| 409 Conflict | Story-specific handling (see individual ACs) |
| 422 Validation | Story-specific handling (see individual ACs) |
| 429 Rate Limited | Silent backoff retry (never shown to user) |
| Stale cached data | Show cached data with subtle "Updating..." indicator, refresh in background |

**Story-specific overrides documented in:** 1.4 (rate limiting), 1.5 (concurrent claims), 1.6 (moderation rejection), 3.2 (concurrent claims), 4.2 (duplicate stop), 4.4 (publish validation, structural edit rejection).

### DTO Reference

DTOs fully specified in story ACs: `ScanResultDto` (1.4), `TaagDetailDto` (1.7), `TaagSummaryDto` (1.7), `CollectionItemDto` (1.8), `LeaderboardDto` (2.1), `PlayerPublicProfileDto` (2.2), `PlayerSummaryDto` (2.1), `HuntCreateDto` (4.1), `HuntDetailDto` (4.4), `ReportCreateDto` (1.8), `TaagNamingRequestDto` (1.6).

DTOs referenced but requiring field definition at implementation:

| DTO | Source Story | Required Fields |
|-----|-------------|----------------|
| `ScanNotification` | 3.1 | `type` (ClaimExpired/PreExpiration/WatchlistAlert/AdminAction), `recipientPlayerId`, `taagId`, `taagCustomName`, `traceId`, `occurredAt`, `title`, `body` |
| `HuntStopDetailDto` | 4.2 | `id`, `taagId`, `taagSummary` (TaagSummaryDto), `sortOrder`, `clueTitle`, `clueText`, `hintText` (nullable), `geofenceRadius` |
| `HuntProgressDto` | 5.1 | `huntId`, `huntTitle`, `huntDescription`, `currentStopOrder`, `progressPhase` (early/middle/late/final), `startedAt`, `nextClue` (ClueDto nullable), `totalStopsCompleted`, `skippedStops` (count) |
| `ClueDto` | 5.2 | `clueTitle`, `clueText`, `hintAvailable` (boolean — never reveals hint text until requested) |
| `HuntCompletionDto` | 5.3 | `huntId`, `huntTitle`, `totalStops`, `stopsCompleted`, `stopsSkipped`, `startedAt`, `completedAt`, `rank`, `creatorMessage`, `creatorDisplayName`, `nearbyHuntHints` (array) |
| `ReportListItemDto` | 6.1 | `id`, `targetType`, `targetId`, `targetName` (Taag custom name or Hunt title), `reason`, `detail`, `status`, `reporterDisplayName`, `createdAt` |

### Creation-Mode State Management

**Given** a user has an active draft hunt (Story 4.2 cross-reference)
**When** the app needs to determine creation-mode vs. discovery-mode for the scanner
**Then** `useActiveDraft()` hook checks for a Hunt entity with `Status: Draft` AND `CreatorId = currentPlayer`
**And** if an active draft exists, the scanner enters creation-mode: celebrations are suppressed, "Added as Stop N" confirmations replace pioneer/darn! UX
**And** a persistent banner on the Scan tab displays: "Building: [Hunt Title] — [N stops]" with a "Done building" dismiss action
**And** dismissing creation-mode does NOT delete the draft — the draft persists for later editing
**And** only one active draft is allowed at a time — creating a new hunt while a draft exists prompts: "You have an unfinished hunt. Continue editing or start fresh?"

---

## Fast Follow Registry

Items explicitly deferred from MVP stories. Track these for post-launch prioritization.

| ID | Item | Source Story | Description |
|----|------|-------------|-------------|
| FF-1 | Passport cover evolution | 2.2 | Profile visual identity that evolves with player milestones |
| FF-2 | Notification preferences | 3.1 | `PUT /api/v1/players/me/preferences` with per-type opt-out |
| FF-3 | Hunt browse/search | 5.1 | Discovery beyond organic scan — browse by location, category, popularity |
| FF-4 | Audio/Lottie asset creation | 5.3 | Professional sound design and animation assets (placeholder-implementable) |
| FF-5 | Collection pagination | 1.8 | Currently capped at 500 items — needs cursor pagination for power users |
| FF-6 | Stale push token cleanup | 3.1 | Backend currently ignores delivery failures — needs token invalidation |
| FF-7 | In-app notification center | 3.1 | Fallback for users who deny push permissions |
| FF-8 | Hunt stop skip analytics | 5.2 | Track which stops are frequently skipped/reported to surface to creators |
| FF-9 | Admin UI | 6.1 | Currently API-only — web dashboard for moderation queue |
| FF-10 | Bearing-based triangulation | 7.2 | Upgrade from weighted centroid to compass bearing intersection |

---

## NFR Traceability

| NFR | Story Coverage | Status |
|-----|---------------|--------|
| NFR1 (scan <500ms p95) | 1.4 (scan pipeline) | Covered — measurable via APM |
| NFR2 (scan-to-result <2s) | 1.4, 1.5 (scan + transition) | Covered — end-to-end in scan stories |
| NFR3 (hunt data <3s on 4G) | 5.1, 5.2 (hunt load) | Implicit — no explicit AC. **Add to 5.1: hunt data pre-cache targets <3s on 4G.** |
| NFR4 (leaderboard refresh <10s) | 2.1 (30s cache TTL) | Covered — cache TTL ensures freshness |
| NFR5 (cold start <4s) | 1.2 (frontend scaffold) | **GAP — no AC measures cold start time. Operational metric, not story AC. Track via monitoring.** |
| NFR6 (TLS 1.2+) | 1.1 (backend scaffold) | **GAP — add to 1.1: `Program.cs` configures Kestrel HTTPS with TLS 1.2 minimum via `SslProtocols`.** |
| NFR7 (secure token storage) | 1.3 (expo-secure-store) | Covered |
| NFR8 (server-side input validation) | 1.4, 1.6, 4.1, 4.2 | Covered — EF Core parameterized queries + data annotations |
| NFR9 (CORS restricted in prod) | 1.1 (backend scaffold) | **GAP — add to 1.1: `Program.cs` configures CORS with allowlist from env var in Production, open in Development.** |
| NFR10 (JWT validated every request) | 1.3 (JwtAuthHandler) | Covered |
| NFR11 (platform attestation) | None | **GAP — Firebase App Check not in any story. Add to 1.3: configure Firebase App Check for device attestation on scan endpoint.** |
| NFR12 (10K concurrent users, <$80/mo) | 1.1 (infrastructure) | Operational — architecture supports this, no story AC needed |
| NFR13 (500K Taags, single DB) | 1.1 (PostGIS indexes) | Covered — spatial + content indexes |
| NFR14 (horizontal scaling path) | 1.1 (architecture) | Covered by design — no story AC needed |
| NFR15 (GPS minimum precision) | 1.7 (2-decimal truncation) | Covered |
| NFR16 (no raw location sharing) | 1.7 (approximate location only) | Covered |
| NFR17 (data deletion <45 days) | None | **GAP — no story covers account/data deletion. Critical for privacy compliance.** |
| NFR18 (GPC signal honored) | None | **GAP — no story implements Global Privacy Control. Low effort but legally required.** |
| NFR19 (COPPA VPC) | 1.3 (email-based VPC flow) | Covered |
| NFR20 (99.5% uptime) | 1.1 (health check) | Operational — monitoring, not story AC |
| NFR21 (offline scan queue) | 1.4 (idempotency key) | **PARTIAL — idempotency prevents duplicates, but no explicit offline queue implementation. Add to 1.4: `useScanQueue` hook stores pending scans in AsyncStorage when offline, syncs on reconnect with idempotency keys.** |
| NFR22 (idempotency keys) | 1.4 (ScanEvent idempotency) | Covered |
| NFR23 (audio signatures) | 1.5, 1.7, 5.3 (celebrations) | Covered as placeholder — FF-4 tracks real assets |

### NFR Gaps Requiring Action

| Priority | NFR | Proposed Fix |
|----------|-----|-------------|
| **HIGH** | NFR17 (data deletion) | Add Story 6.3: Account Deletion & Data Purge — `DELETE /api/v1/players/me` initiates 45-day deletion pipeline. Soft-delete Player, anonymize ScanEvents, remove from leaderboards, cancel notifications. |
| **HIGH** | NFR11 (platform attestation) | Add AC to Story 1.3: Firebase App Check configured, scan endpoint validates app attestation token. |
| **MEDIUM** | NFR21 (offline queue) | Add AC to Story 1.4: offline scan queue with sync-on-reconnect. |
| **MEDIUM** | NFR9 (CORS) | Add AC to Story 1.1: CORS env-based allowlist. |
| **LOW** | NFR6 (TLS) | Add AC to Story 1.1: Kestrel TLS 1.2 minimum. |
| **LOW** | NFR18 (GPC) | Add AC to Story 1.3: honor GPC header for opt-out. |
| **LOW** | NFR5 (cold start) | Operational metric — no story AC needed. |

---

### Prioritization Insights (from Comparative Analysis)

| Rank | Epic | Weighted Score | Sprint Planning Signal |
|------|------|:---:|----------------------|
| — | Epic 1: Foundation & Scan | 2.90 | Critical path. Highest risk + importance. 2+ sprints. Plan first. |
| 1 | Epic 2: Leaderboards | 3.85 | Quick win. Ship immediately after Epic 1 Sprint 1 for visible progress. |
| 2 | Epic 3: Territory Defense | 3.75 | Best value-to-effort. The retention engine. |
| 3 | Epic 5: Hunt Play | 3.60 | High value, needs iteration time for crescendo tuning. |
| 4 | Epic 6: Safety & Integrity | 3.35 | Flexible. Ship when ready, no scheduling pressure. |
| 5 | Epic 7: Location Intel | 3.30 | Strategic investment. Deprioritizable for initial launch. |
| 6 | Epic 4: Hunt Creation | 3.05 | Weakest standalone. Pair with Epic 5 as delivery unit. |

### Parallelism Opportunities

- **Epic 1 Sprint 1 (backend)** unlocks parallel development of Epics 2, 3, 4 backend stories.
- **Epics 4 + 5** can run in parallel — Epic 5 develops against seeded test hunt data.
- **Epics 6 + 7** are independently schedulable with zero impact on other epics.
