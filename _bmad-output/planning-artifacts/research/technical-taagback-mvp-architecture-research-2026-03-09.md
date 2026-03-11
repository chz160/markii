---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments: ['_bmad-output/brainstorming/brainstorming-session-2026-03-09-001.md', '_bmad-output/planning-artifacts/research/market-taagback-qr-platform-research-2026-03-09.md', '_bmad-output/planning-artifacts/research/domain-taagback-qr-overlay-platform-research-2026-03-09.md']
workflowType: 'research'
lastStep: 1
research_type: 'technical'
research_topic: 'TaagBack MVP Technical Architecture — comprehensive evaluation of .NET 10 + React Native (Expo SDK 55) stack against full MVP requirements, covering QR scanning & interception, spatial database selection, real-time systems, authentication, AI integration, anti-fraud, content moderation, deployment strategy, and build-vs-buy decisions'
research_goals: 'Validate current tech stack for MVP delivery, make specific architecture and tooling decisions, evaluate build-vs-buy for key components, identify deep-dive areas requiring further investigation'
user_name: 'Noah.Porch'
date: '2026-03-09'
web_research_enabled: true
source_verification: true
---

# TaagBack MVP Architecture: Comprehensive Technical Research

**Date:** 2026-03-09
**Author:** Noah.Porch
**Research Type:** Technical

---

## Executive Summary

TaagBack occupies a validated white space in the $6.18B location-based entertainment market — zero direct competitors offer QR-code-overlay scavenger hunts with a creator economy model. This technical research confirms that the existing .NET 10 + React Native (Expo SDK 55) stack is **fully capable of delivering the MVP**, with a clear evolution path from launch through scale. The primary risks are execution-related, not technological.

The research evaluated 10+ major architectural decisions across database, authentication, real-time communication, caching, deployment, and AI integration. Every component was validated against current (2026) documentation, pricing, and community adoption data. The result is a concrete, opinionated technical blueprint — not a menu of options, but a specific set of decisions with rationale.

**Key Technical Findings:**

- **Stack validated**: .NET 10 LTS (support through Nov 2028) + React Native 0.83 / Expo SDK 55 (New Architecture mandatory) is a strong, well-supported foundation
- **PostgreSQL + PostGIS confirmed** over SQL Server and MongoDB — geography type with GiST indexes, EF Core + Npgsql + NetTopologySuite for seamless spatial LINQ queries
- **Firebase Auth** with anonymous-first pattern + `linkWithCredential()` is the ideal identity solution — free to 50K MAU, standard JWT, no vendor lock-in on the API side
- **REST + SSE** over GraphQL + SignalR — simpler, sufficient for TaagBack's API surface and real-time needs
- **MVP infrastructure costs: ~$32-51/month** — Azure App Service B1 + PostgreSQL Flexible Server B1ms + free tiers for Firebase, EAS Build, and OpenAI Moderation
- **7-layer scan security pipeline** combining QR token validation, Firebase JWT auth, PostGIS geofence verification, rate limiting, idempotency, speed checks, and platform attestation

**Top 5 Actionable Recommendations:**

1. **Migrate from in-memory `List<T>` to EF Core + PostgreSQL immediately** — this is the critical path; all other features depend on persistent storage
2. **Integrate Firebase Auth with anonymous-first pattern** — enables "play first, sign up later" while preserving all scan history on account promotion
3. **Organize code by feature (vertical slices)** — the current three-layer architecture is sound; add feature folders as the natural evolution path toward modular monolith
4. **Set up CI/CD in Sprint 1** — GitHub Actions for .NET + EAS Build/Update for React Native; every manual deployment step is accumulated debt for a solo developer
5. **Defer Redis, AI features, and real-time until Phase 2** — focus MVP on the core scan-claim-progress loop with persistent storage

## Table of Contents

1. [Research Overview](#research-overview) — Scope, methodology, and input documents
2. [Technical Research Scope Confirmation](#technical-research-scope-confirmation) — Research boundaries and approach
3. [Technology Stack Analysis](#technology-stack-analysis) — Languages, frameworks, database, cloud, build-vs-buy
4. [Integration Patterns Analysis](#integration-patterns-analysis) — API design, communication protocols, event-driven architecture, security
5. [Architectural Patterns and Design](#architectural-patterns-and-design) — System architecture, data architecture, caching, security, deployment
6. [Implementation Approaches and Technology Adoption](#implementation-approaches-and-technology-adoption) — Adoption roadmap, CI/CD, testing, monitoring, cost, risk
7. [Technical Research Recommendations](#technical-research-recommendations) — Roadmap, stack validation, success metrics
8. [Research Synthesis and Conclusion](#research-synthesis-and-conclusion) — Key findings, strategic assessment, next steps

---

## Research Overview

This comprehensive technical research evaluates TaagBack's .NET 10 + React Native (Expo SDK 55) technology stack against full MVP requirements across QR scanning & interception, spatial database selection, real-time systems, authentication, AI integration, anti-fraud, content moderation, deployment strategy, and build-vs-buy decisions. The research synthesizes three prior research documents — a brainstorming session (76 ideas, three MVP pillars), market research (zero direct competitors, validated white space), and domain research (six domains covering QR technology, location-based gaming, crowdsourced data, gamification psychology, creator economy, and regulatory landscape).

**Research Methodology:** All technical claims are verified against current (2026) web sources including official documentation, developer surveys, pricing pages, and industry analyses. Multiple sources were consulted for critical decisions. Confidence levels are noted where data is uncertain or rapidly evolving. The full executive summary and strategic recommendations are in the sections above and below.

**Key finding from prior research:** TaagBack's core technical model is sound — QR interception at the decoder stage is well-documented, the existing stack is capable, and the primary risks are execution-related rather than fundamental.

---

## Technical Research Scope Confirmation

**Research Topic:** TaagBack MVP Technical Architecture — comprehensive evaluation of .NET 10 + React Native (Expo SDK 55) stack against full MVP requirements, covering QR scanning & interception, spatial database selection, real-time systems, authentication, AI integration, anti-fraud, content moderation, deployment strategy, and build-vs-buy decisions

**Research Goals:** Validate current tech stack for MVP delivery, make specific architecture and tooling decisions, evaluate build-vs-buy for key components, identify deep-dive areas requiring further investigation

**Technical Research Scope:**

- Architecture Analysis - design patterns, frameworks, system architecture
- Implementation Approaches - development methodologies, coding patterns
- Technology Stack - languages, frameworks, tools, platforms
- Integration Patterns - APIs, protocols, interoperability
- Performance Considerations - scalability, optimization, patterns
- Build vs Buy - component evaluation for key subsystems

**Research Methodology:**

- Current web data with rigorous source verification
- Multi-source validation for critical technical claims
- Confidence level framework for uncertain information
- Comprehensive technical coverage with architecture-specific insights

**Scope Confirmed:** 2026-03-09

---

## Technology Stack Analysis

### Programming Languages

**Backend: C# (.NET 10 LTS)**

TaagBack's backend runs on .NET 10, released November 11, 2025 as a Long-Term Support release with support through **November 14, 2028**. This is the ideal release track for a production application — no forced migration for roughly 2.5 years, with the next LTS (.NET 12) expected November 2027.

Key .NET 10 features relevant to TaagBack:
- **Built-in OpenAPI 3.1**: ASP.NET Core 10 generates OpenAPI 3.1 documents natively with JSON Schema 2020-12 support and YAML output. No Swashbuckle dependency needed. Compatible with Native AOT builds.
- **Native Server-Sent Events (SSE)**: First-class SSE support via `Results.ServerSentEvents` returning `IAsyncEnumerable<T>`. The `SseItem<T>` type supports event IDs and retry intervals for reconnection replay.
- **Passkey authentication**: Built into ASP.NET Core Identity (scoped to web/Blazor scenarios; native mobile passkeys need `fido2-net-lib`).
- **EF Core 10 JSON updates**: `ExecuteUpdate`/`ExecuteUpdateAsync` can directly update JSON properties in SQL Server 2025 / Azure SQL without loading entire entities. Vector search support included.
- **Minimal API improvements**: Empty form strings now map to `null` for nullable types with `[FromForm]`, fixing common parse errors.

_Source: [Microsoft Learn — What's new in ASP.NET Core 10](https://learn.microsoft.com/en-us/aspnet/core/release-notes/aspnetcore-10.0), [InfoQ — ASP.NET Core in .NET 10](https://www.infoq.com/news/2025/12/asp-net-core-10-release/), [Visual Studio Magazine — .NET 10 Arrives](https://visualstudiomagazine.com/articles/2025/11/12/net-10-arrives-with-ai-integration-performance-boosts-and-new-tools.aspx), [.NET Support Policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core)_

**Frontend: TypeScript (React Native 0.83 / Expo SDK 55)**

TaagBack's frontend runs on Expo SDK 55 with React Native 0.83.2 and React 19.2. Key facts:
- **New Architecture is now mandatory** — the `newArchEnabled` config option was removed from app.json. All SDK 55+ projects run exclusively on the New Architecture (Fabric renderer, TurboModules, JSI).
- **React Native 0.83 had zero breaking changes** — the first RN release to achieve this, making future upgrades safer.
- **Performance gains**: 60fps rendering, up to 40% faster startup, 20-30% lower memory usage, Metro bundler 3x faster cold startup.
- **Hermes v1 available as opt-in** via `useHermesV1` in expo-build-properties, with meaningful performance improvements. Hermes bytecode diffing reduces OTA update download sizes by ~75%.
- **Expo Router v7** with new Native Tabs API for platform-native tab experience.

_Source: [Expo SDK 55 Changelog](https://expo.dev/changelog/sdk-55), [React Native 0.83 Release Blog](https://reactnative.dev/blog/2025/12/10/react-native-0.83), [Callstack — RN Wrapped 2025](https://www.callstack.com/blog/react-native-wrapped-2025-a-month-by-month-recap-of-the-year)_

**TaagBack Stack Validation:** Both the backend and frontend languages/runtimes are current, well-supported, and performant. No technology changes needed at the language level. The project is on the ideal LTS tracks for both .NET and React Native.

---

### Development Frameworks and Libraries

#### Backend: Controllers vs Minimal APIs

Microsoft recommends **Minimal APIs for new projects**. Performance benchmarks show slightly faster throughput and fewer memory allocations than controllers. Calling `builder.Services.AddControllers()` loads the full MVC pipeline including Razor view engine assemblies, even for API-only endpoints.

TaagBack currently uses controllers (`HuntsController`, `HuntStopsController`, `ScanController`). **No urgent migration needed** — controllers are fully supported and the performance difference is negligible at TaagBack's scale. Both patterns can coexist, so new endpoints can use Minimal APIs while existing controllers remain.

A third option, **FastEndpoints**, combines controller-like structure with minimal API performance and is gaining popularity.

_Source: [C# Corner — Minimal API vs MVC Controllers in .NET 10](https://www.c-sharpcorner.com/article/minimal-api-vs-mvc-controllers-in-net-10/), [Microsoft Learn — APIs overview](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/apis), [NimblePros — FastEndpoints, Controllers, and Minimal APIs Compared](https://blog.nimblepros.com/blogs/fastendpoints-controllers-and-minimal-apis-compared/)_

#### Frontend: QR Scanning Libraries

| Library | Approach | Strengths | Limitations |
|---------|----------|-----------|-------------|
| **react-native-vision-camera** | Platform-native APIs; MLKit on Android, AVFoundation on iOS | Raw data access, no auto-URL opening, frame processors, active development, multi-code detection | Requires MLKit model (~2.2MB on Android) |
| **expo-camera (CameraView)** | Google Code Scanner (Android) via Play Services; VisionKit (iOS 16+) | Quick setup, Expo ecosystem native | Abstracts lower-level operations, limited raw data control on Android |

**Recommendation: react-native-vision-camera** is the correct choice for TaagBack. When a code is scanned, the `onCodeScanned` callback receives a `Code` object containing the **raw decoded string value**, the code type, and frame coordinates. It does NOT automatically open URLs — the app receives the raw data and decides what to do with it. This is exactly TaagBack's core technical requirement for the QR interception model.

_Source: [VisionCamera Code Scanning Guide](https://react-native-vision-camera.com/docs/guides/code-scanning), [Scanbot — React Native Vision Camera vs Expo Camera](https://scanbot.io/blog/react-native-vision-camera-vs-expo-camera/)_

#### Frontend: Location & Notifications

**Location tracking:**
- **expo-location** — Sufficient for MVP. Background tracking via `startLocationUpdatesAsync()`, six accuracy levels, geofencing support. **Limitation**: Background updates stop if user terminates the app on Android.
- **Transistorsoft react-native-background-geolocation** (commercial) — Most sophisticated option with ML-based predictive tracking and sensor fusion. Upgrade path if background tracking becomes critical.

**Push notifications:**
- **expo-notifications** — Primary option in Expo ecosystem. Works with Expo Push Service, FCM, and APNs. SDK 55 updated Firebase dependencies and fixed background task crashes. **Note**: Cannot test push notifications in Expo Go on Android anymore (SDK 53+) — requires development builds.

_Source: [Expo Location Documentation](https://docs.expo.dev/versions/latest/sdk/location/), [Transistorsoft Background Geolocation](https://www.transistorsoft.com/shop/products/react-native-background-geolocation), [Expo Notifications Documentation](https://docs.expo.dev/versions/latest/sdk/notifications/)_

---

### Database and Storage Technologies

#### Primary Database: PostgreSQL + PostGIS (Recommended)

PostGIS extends PostgreSQL with geometry/geography types, spatial indexing (GiST), and over 1,000 spatial functions. It is used in production by Uber, Lyft, and other ride-sharing/location apps at massive scale.

**Why PostGIS wins for TaagBack:**
- "Find nearby Taags" maps directly to `ST_DWithin(taag.location, user_point, search_radius)` — index-aware, uses GiST spatial indexes for fast bounding-box filtering before exact distance computation.
- Storing GPS coordinates as `GEOGRAPHY(Point, 4326)` gives accurate distance calculations in meters on Earth's surface.
- The `<->` nearest-neighbor operator provides efficient closest-first sorting without full table scan.
- Fully supported on all major clouds: AWS RDS, Azure Database for PostgreSQL, Google Cloud SQL, Supabase.

**Why NOT SQL Server:** Despite the .NET backend, SQL Server offers fewer spatial functions, lower spatial query performance, and requires commercial licensing. The Npgsql provider for PostgreSQL is a first-class .NET citizen with full EF Core support.

**Why NOT MongoDB:** TaagBack's data model is relational (hunts have many stops, stops have scans, players have scores). MongoDB provides only 3 geospatial functions vs PostGIS's 1,000+. Academic benchmarks confirm "the superiority of PostgreSQL in almost all cases."

_Source: [PostGIS Official](https://postgis.net/), [Neon — Geospatial Search in Postgres](https://neon.com/guides/geospatial-search), [Springer — MongoDB vs PostgreSQL Geospatial Study](https://link.springer.com/article/10.1007/s10707-020-00407-w), [EDB — PostgreSQL vs SQL Server](https://www.enterprisedb.com/blog/microsoft-sql-server-mssql-vs-postgresql-comparison-details-what-differences)_

#### .NET Integration: EF Core + Npgsql + NetTopologySuite

The `Npgsql.EntityFrameworkCore.PostgreSQL.NetTopologySuite` NuGet package (version 10.0.0, matching .NET 10) provides full EF Core integration with PostGIS:
- NetTopologySuite (NTS) provides `Point`, `Polygon`, `LineString` types conforming to OGC Simple Features
- EF Core LINQ queries using NTS methods translate server-side to PostGIS SQL (e.g., `context.Taags.Where(t => t.Location.IsWithinDistance(userPoint, 500))` translates to `ST_DWithin`)
- Setup requires adding `UseNetTopologySuite()` to Npgsql configuration in `Program.cs`
- Entity model gains `public Point Location { get; set; }` properties mapped to PostGIS geography columns

**This is the established, recommended approach for .NET + PostgreSQL spatial work. No concerns.**

_Source: [Npgsql EF Core Spatial Mapping](https://www.npgsql.org/efcore/mapping/nts.html), [NuGet — Npgsql.EntityFrameworkCore.PostgreSQL.NetTopologySuite 10.0.0](https://www.nuget.org/packages/npgsql.entityframeworkcore.postgresql.nettopologysuite/)_

#### Leaderboards: Redis Sorted Sets (Growth Phase)

Redis sorted sets (ZSETs) provide O(log N) insertions and rank lookups with sub-millisecond response times, even with millions of entries. Core commands: `ZADD`, `ZREVRANGE`, `ZREVRANK`, `ZINCRBY`. The `StackExchange.Redis` .NET client provides `SortedSetAddAsync`, `SortedSetRangeByRankWithScoresAsync`, and related methods.

**For MVP, PostgreSQL handles leaderboard queries fine.** Redis becomes valuable when leaderboard reads are frequent and must be sub-millisecond. Add Redis when leaderboard traffic justifies a second data store.

_Source: [OneUptime — Gaming Leaderboards with Redis Sorted Sets](https://oneuptime.com/blog/post/2026-01-27-gaming-leaderboards-redis-sorted-sets/view), [Redis Sorted Sets Documentation](https://redis.io/docs/latest/develop/data-types/sorted-sets/), [Redis Leaderboard Demo .NET (GitHub)](https://github.com/redis-developer/basic-redis-leaderboard-demo-dotnet)_

#### Database Scaling Path

| Phase | Scale | Strategy |
|-------|-------|----------|
| **MVP** | <10K users | Single PostgreSQL + PostGIS instance. Handles hundreds of thousands of Taags without issue. |
| **Growth** | 10K-100K users | Add read replicas for leaderboard/browse queries. Add Redis for leaderboard caching. |
| **Scale** | 100K+ users | Partition Taags by geographic region. Connection pooling (PgBouncer). Evaluate Aurora PostgreSQL. |

**Immediate action:** Replace the in-memory `List<T>` services with EF Core backed by PostgreSQL + PostGIS.

_Source: [SpaceO Technologies — Application Scalability Guide](https://www.spaceotechnologies.com/blog/what-is-application-scalability/), [DevCookies — Scale 0 to 1 Million Users](https://devcookies.medium.com/how-to-scale-a-system-from-0-to-1-million-users-a-real-world-approach-e76e3e11ab14)_

---

### Development Tools and Platforms

#### Authentication (CRITICAL GAP)

**TaagBack currently has no authentication.** This is the most critical gap to address before any public deployment.

Three viable patterns for mobile API auth:

1. **JWT Bearer Tokens (recommended for MVP)** — The standard for mobile API authentication. Stateless, works across all platforms. Use `Microsoft.AspNetCore.Authentication.JwtBearer`.
2. **OAuth 2.0 / OpenID Connect** — Enables "Sign in with Google/Apple." Duende IdentityServer (commercial) and OpenIddict (open-source) are leading .NET implementations.
3. **Passkeys / FIDO2 (future)** — .NET 10's built-in passkey support is scoped to web/Blazor, not native mobile. Use `fido2-net-lib` for native mobile. Google reported 120% increase in passkey usage in 2025.

**Recommendation:** Start with JWT bearer tokens. Flow: user authenticates → server issues JWT → app stores token → sends with API requests. Consider allowing anonymous play for initial discovery, with accounts required for hunt creation and claiming.

_Source: [Auth0 — Authentication and Authorization in .NET 10](https://auth0.com/blog/authentication-authorization-enhancements-dotnet-10/), [WorkOS — Top 5 Authentication Solutions for .NET 2026](https://workos.com/blog/top-authentication-solutions-net-2026), [Andrew Lock — Passkey Support for ASP.NET Core Identity](https://andrewlock.net/exploring-dotnet-10-preview-features-6-passkey-support-for-aspnetcore-identity/)_

#### Real-Time Communication: Server-Sent Events

.NET 10 adds native SSE support via `Results.ServerSentEvents` with `IAsyncEnumerable<T>`. The `SseItem<T>` type wraps data with metadata (event ID, event type, retry interval) enabling automatic reconnection and event replay.

**SSE vs SignalR:** SSE is simpler, one-directional (server-to-client), HTTP-native. SignalR is better for bidirectional communication. TaagBack's real-time needs (leaderboard updates, hunt progress, notifications) are all server-to-client push — SSE is the right fit.

**React Native concern:** No built-in `EventSource` implementation. Need a library like `react-native-sse` or `@microsoft/fetch-event-source`. Test reconnection behavior carefully on mobile.

_Source: [Anton Dev Tips — Real-Time SSE in ASP.NET Core and .NET 10](https://antondevtips.com/blog/real-time-server-sent-events-in-asp-net-core), [Milan Jovanovic — SSE in .NET 10](https://www.milanjovanovic.tech/blog/server-sent-events-in-aspnetcore-and-dotnet-10)_

#### AI Integration: Microsoft.Extensions.AI

| Package | Version | Notes |
|---------|---------|-------|
| `Microsoft.Extensions.AI.OpenAI` | 10.3.0 (Feb 2026) | Official Microsoft abstraction via `IChatClient` interface |
| `OpenAI` (NuGet) | 2.9.1 | Official OpenAI .NET SDK, co-developed with Microsoft |
| `Anthropic` (NuGet) | 12.8.0 | Official Anthropic C# SDK, also implements `IChatClient` |

**Key architecture point:** `Microsoft.Extensions.AI` provides a unified `IChatClient` abstraction that works with both OpenAI and Anthropic. TaagBack can code against `IChatClient` and swap providers without changing business logic — fits perfectly with the existing DI/interface pattern.

**Recommendation:** Create an `IAiService`/`AiService` following the existing pattern (like `IHuntService`/`HuntService`). Register `IChatClient` in `Program.cs` as a singleton alongside existing services.

_Source: [Microsoft Learn — Microsoft.Extensions.AI Libraries](https://learn.microsoft.com/en-us/dotnet/ai/microsoft-extensions-ai), [NuGet — Microsoft.Extensions.AI.OpenAI](https://www.nuget.org/packages/Microsoft.Extensions.AI.OpenAI)_

#### Content Moderation

| Service | Cost | Strengths |
|---------|------|-----------|
| **OpenAI Moderation API** | **FREE** | Detects hate, harassment, self-harm, sexual, violence. Multi-language. No usage limits. |
| **Azure AI Content Safety** | $0.38/1K records | .NET native, customizable categories |

**Recommendation: OpenAI Moderation API (free)** as primary filter. TaagBack's moderation surface is narrow: hunt names, stop names, clue text, Taag custom names. All short text strings. Building custom moderation would be massive overkill.

_Source: [OpenAI Moderation API Guide](https://developers.openai.com/api/docs/guides/moderation/), [OpenAI — Free Confirmation](https://help.openai.com/en/articles/4936833-is-the-moderation-endpoint-free-to-use)_

#### Mobile CI/CD: EAS Build + Workflows

**EAS Workflows** is the gold standard for React Native CI/CD in 2026. YAML-based pipelines handle cloud builds, credential management, app store submission, OTA updates, and testing.
- **Free tier**: 30 builds/month (max 15 iOS), OTA updates to 1,000 MAU, 100 GiB bandwidth
- **OTA updates via EAS Update**: Push JS bundle changes without app store review — critical for rapid iteration
- **Hermes bytecode diffing**: Reduces OTA download sizes by ~75%

_Source: [Expo — EAS Workflows](https://expo.dev/blog/expo-workflows-automate-your-release-process), [Expo Pricing](https://expo.dev/pricing)_

---

### Cloud Infrastructure and Deployment

#### Recommended Cloud: Azure

Azure is the natural fit for a .NET backend with first-party integrations (Visual Studio, Azure DevOps, Entra ID). If you hold Windows Server or SQL Server licenses, Azure Hybrid Benefit can cut VM costs by 40-80%.

**Microsoft for Startups Founders Hub** offers up to **$150,000 in Azure credits**, no VC funding required, no equity taken. $1,000 immediately, up to $5,000 after business verification.

_Source: [Microsoft for Startups](https://www.microsoft.com/en-us/startups), [Wiz — Azure vs AWS Pricing 2026](https://www.wiz.io/academy/cloud-cost/azure-vs-aws-cloud-cost)_

#### Deployment Architecture by Phase

**Phase 1: MVP (Months 1-6)**

| Component | Service | Monthly Cost |
|-----------|---------|-------------|
| API Hosting | Azure App Service (Free or B1 tier) | $0-55 |
| Database | Azure Database for PostgreSQL (Flexible Server, Burstable B1ms) | $13-25 |
| Mobile CI/CD | EAS Build (free tier) | $0 |
| OTA Updates | EAS Update (free tier) | $0 |
| Domain + SSL | Azure App Service (included) | $0 |
| **Total** | | **$13-80/month** |

With Microsoft for Startups credits: **$0/month** for 6-12+ months.

**Phase 2: Growth (Months 6-18)**

| Component | Service | Monthly Cost |
|-----------|---------|-------------|
| API Hosting | Azure Container Apps (scale-to-zero) | $50-150 |
| Database | Azure PostgreSQL Flexible Server (General Purpose) | $50-100 |
| Leaderboards | Azure Cache for Redis (Basic) | $16-55 |
| API Gateway | Azure API Management (Consumption tier, 1M calls free) | $0-20 |
| Mobile CI/CD | EAS Production plan | ~$99 |
| **Total** | | **$215-424/month** |

**Phase 3: Scale (18+ months)**

| Component | Service | Monthly Cost |
|-----------|---------|-------------|
| API Hosting | Azure Container Apps or AKS | $200-500 |
| Database | Azure PostgreSQL with read replicas | $200-400 |
| Edge | Azure Front Door | $35+ |
| Monitoring | Azure Application Insights + Grafana | $50-100 |
| **Total** | | **$500-2,000+/month** |

_Source: [Mindster — Mobile App Backend Cost 2026](https://mindster.com/mindster-blogs/mobile-app-backend-development-cost/), [Azure Container Apps vs App Service](https://learn.microsoft.com/en-us/answers/questions/1337789/azure-app-service-vs-azure-container-apps-which-to), [Docker — .NET Deployment Guide](https://docs.docker.com/guides/dotnet/deploy/)_

---

### Technology Adoption Trends

#### AI-Assisted Development
The `Microsoft.Extensions.AI` abstraction layer (`IChatClient`) enables provider-agnostic AI integration — a clear industry trend toward avoiding vendor lock-in while leveraging AI capabilities. TaagBack can start with GPT-4o mini and swap to Claude or another provider without code changes.

#### Serverless for Bursty Workloads
Azure Functions on the Flex Consumption plan and AWS Lambda with SnapStart reduce cold starts to sub-second for .NET. The `/api/scan/{token}` endpoint is a natural serverless candidate (stateless, bursty). However, keep everything in one App Service for MVP simplicity.

#### On-Device AI: Not Yet Ready for TaagBack
SLMs like Llama 3.2 1B run on-device at 20-30 tokens/second, but require ~650MB RAM — too heavy for a utility app. **Skip on-device AI for now.** TaagBack's AI needs are lightweight, infrequent tasks better served by cloud API calls at ~$3.20/month.

#### React Native New Architecture: Mature
With SDK 55 making New Architecture mandatory and RN 0.83 achieving zero breaking changes, the framework has reached production maturity. JSI-based native module calls eliminate bridge overhead — directly benefiting camera/scanning performance.

_Source: [MIT Technology Review — AI in 2026](https://www.technologyreview.com/2026/01/05/1130662/whats-next-for-ai-in-2026/), [SLM Guide 2026](https://calmops.com/ai/small-language-models-slm-complete-guide-2026/), [Software Mansion — RN in 2026](https://blog.swmansion.com/react-native-in-2026-trends-our-predictions-463a837420c7)_

---

### Build vs Buy Summary

| Component | Decision | Solution | Cost |
|-----------|----------|----------|------|
| **QR Scanning** | Buy (OSS) | react-native-vision-camera | Free |
| **Location Tracking** | Buy (OSS) | expo-location → Transistorsoft upgrade path | Free → $299 |
| **Push Notifications** | Buy (OSS) | expo-notifications | Free |
| **Database** | Buy (managed) | Azure PostgreSQL + PostGIS | $13-25/mo |
| **Authentication** | Build + Buy | JWT bearer tokens + ASP.NET Core Identity | Free |
| **Real-time Updates** | Build | SSE via .NET 10 native support | Free |
| **Leaderboards** | Build (MVP) → Buy (Growth) | PostgreSQL queries → Redis sorted sets | Free → $16/mo |
| **AI Generation** | Buy (API) | GPT-4o mini via Microsoft.Extensions.AI | ~$3/mo |
| **Content Moderation** | Buy (API) | OpenAI Moderation API | **Free** |
| **URL Categorization** | Buy (API) | GPT-4o mini (LLM-based classification) | ~$0.50/mo |
| **Mobile CI/CD** | Buy (SaaS) | EAS Build + EAS Update | Free → $99/mo |
| **Cloud Hosting** | Buy (PaaS) | Azure App Service → Container Apps | $0-55/mo |

**Total estimated infrastructure cost at MVP: $13-80/month** (potentially $0 with startup credits)
**Total estimated AI cost at 10K requests/month: ~$3.20/month**

---

### Recommended Deep-Dive Areas

Based on this broad technology stack analysis, the following areas warrant dedicated deep-dive research before implementation:

#### 1. Authentication Architecture (Priority: CRITICAL)
The project has zero authentication. This needs a detailed design covering: anonymous vs authenticated flows, JWT token lifecycle, social login (Google/Apple), account creation timing (before or after first scan), and COPPA-compliant age gating. This is the highest-priority technical gap.

#### 2. QR Scanning Pipeline & Taag Database Schema (Priority: HIGH)
The scan → decode → lookup → claim flow is TaagBack's core technical loop. Deep dive needed on: raw data extraction with react-native-vision-camera, QR content hashing/fingerprinting for the Taag identifier, PostgreSQL + PostGIS schema design for the Taag entity, and the duplicate detection algorithm ("snack wrapper problem").

#### 3. Anti-Fraud & Data Integrity System (Priority: HIGH)
GPS spoofing prevention, location drift detection, duplicate code detection, and Taag expiration mechanics all need detailed technical design. The domain research identified Tier 1 detection (spoofing app detection, impossible travel, location drift) as MVP-appropriate, with sensor fusion as a near-MVP enhancement.

#### 4. Real-Time Architecture for Leaderboards & Notifications (Priority: MEDIUM)
SSE implementation patterns in .NET 10 + React Native, leaderboard update strategies, push notification infrastructure (expo-notifications + FCM/APNs), and re-scan reminder scheduling all need implementation-level design.

#### 5. Deployment Pipeline & DevOps (Priority: MEDIUM)
Azure App Service configuration, PostgreSQL provisioning, EAS Build pipeline setup, environment management (dev/staging/prod), and the Microsoft for Startups application process.

---

## Integration Patterns Analysis

### API Design Patterns

#### REST API Architecture (Recommended)

REST remains the right choice for TaagBack. The data model is straightforward (hunts, stops, scans, leaderboards), and the API surface is small. The scan endpoint (`GET /api/scan/{token}`) is a single-resource lookup that REST handles perfectly.

**GraphQL evaluation:** Over 50% of enterprises now use GraphQL in production (up from 10% in 2021), and it reduces over-fetching on mobile networks. However, GraphQL adds backend complexity (query cost analysis, N+1 prevention, schema management) not justified for TaagBack's current API surface. **Verdict: REST now, evaluate GraphQL for future complex screens** (activity feeds combining hunts, friends, achievements).

**API-first development:** The API contract (already exposed via OpenAPI at `/openapi/v1.json`) should be the source of truth driving both backend and mobile client development. Lock down routes and request/response shapes early — mobile app updates are slow to deploy.

_Source: [Zuplo — REST API Design Best Practices for Mobile](https://zuplo.com/learning-center/designing-rest-apis-for-mobile-applications-best-practices), [AWS — GraphQL vs REST](https://aws.amazon.com/compare/the-difference-between-graphql-and-rest/), [Java Code Geeks — GraphQL vs REST vs gRPC 2026](https://www.javacodegeeks.com/2026/02/graphql-vs-rest-vs-grpc-the-2026-api-architecture-decision.html)_

#### API Versioning

**URL path versioning** (`/api/v1/hunts`, `/api/v2/hunts`) is the most widely recommended strategy for public-facing .NET APIs. It is visible at a glance, trivial to test, and easy for mobile clients to pin to a specific version. The official `Asp.Versioning` NuGet packages integrate with ASP.NET Core endpoint routing and OpenAPI generation.

**Critical for TaagBack:** Once the app is in users' hands, old versions must keep hitting `/api/v1/` while new features land on `/api/v2/`. Wire this in early — retrofitting versioning is painful. Default unversioned requests to v1.

_Source: [Milan Jovanovic — API Versioning in ASP.NET Core](https://www.milanjovanovic.tech/blog/api-versioning-in-aspnetcore), [GitHub — dotnet/aspnet-api-versioning](https://github.com/dotnet/aspnet-api-versioning)_

#### Rate Limiting

.NET 7+ ships **built-in rate limiting middleware** (no third-party packages needed). Configured in `Program.cs`, it supports Fixed Window, Sliding Window, Token Bucket, and Concurrency limiter algorithms.

**Recommended policies for TaagBack:**

| Endpoint | Algorithm | Limit |
|----------|-----------|-------|
| `/api/scan/{token}` | Token Bucket | High burst (30/min per user) — players may scan several codes quickly |
| `/api/hunts` (create) | Fixed Window | Low (10/min per user) |
| Leaderboard reads | Sliding Window | Moderate |

Token Bucket is best for mobile APIs — it allows short bursts while enforcing sustained rate limits. Return `Retry-After` headers so the mobile client backs off gracefully.

_Source: [Microsoft Learn — Rate Limiting Middleware in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/performance/rate-limit), [Syncfusion — Performance Tuning ASP.NET Core 2026](https://www.syncfusion.com/blogs/post/performance-tuning-in-aspnetcore-2026)_

#### Idempotency for Scan Claims

**Idempotency keys are critical** for state-changing operations. Mobile clients on flaky outdoor connections may retry requests. TaagBack should use idempotency keys on the Taag claiming endpoint to prevent double-claims when a user scans a QR code on spotty connectivity.

---

### Communication Protocols

#### Mobile ↔ API: HTTP/HTTPS + JSON

Standard HTTP/HTTPS with JSON payloads is the correct protocol for TaagBack's API communication. HTTP/2 multiplexing (100+ streams over a single TCP connection) resolves legacy browser connection limits and is the default on modern mobile platforms.

#### Real-Time: Server-Sent Events

**.NET 10 adds first-class SSE support** via `TypedResults.ServerSentEvents()` in Minimal APIs. SSE is unidirectional (server-to-client), uses plain HTTP, auto-reconnects, and is simpler to deploy than WebSockets.

**React Native client:** The `react-native-sse` npm package provides an `EventSource` implementation using `XMLHttpRequest` (no native module needed). Supports custom headers for auth, TypeScript, and auto-reconnect. **Known Expo issue**: Expo's CDP interceptor can block SSE in development (GitHub issue #27526), but production builds work fine.

**SSE vs SignalR:** Multiple 2026 articles argue "you probably don't need SignalR" for server-push scenarios. SSE is perfect for TaagBack's leaderboard updates, hunt progress, and notifications — all server-to-client. If bidirectional communication is needed later (e.g., live chat), SignalR can coexist with SSE endpoints.

**Recommended SSE endpoint:** `/api/hunts/{id}/leaderboard/stream` — pushes score changes to connected players during a hunt.

_Source: [System Shogun — You Probably Don't Need SignalR in .NET 10](https://systemshogun.com/p/you-probably-dont-need-signalr-in), [Milan Jovanovic — SSE in .NET 10](https://www.milanjovanovic.tech/blog/server-sent-events-in-aspnetcore-and-dotnet-10), [npm — react-native-sse](https://www.npmjs.com/package/react-native-sse)_

#### Push Notifications: Expo Push Service → Azure Notification Hubs

**MVP:** Use **Expo Push Notifications** (free, managed). Backend stores Expo push tokens per user. When a scan event fires (contested Taag, hunt completion), a handler sends push via Expo's HTTP API.

**Growth:** Add **Azure Notification Hubs** or direct FCM/APNs integration for tag-based targeting (e.g., `hunt:123` to notify all players in a hunt), scheduled sends, and analytics. Queue notification sends behind a message broker so they don't block scan processing.

_Source: [DevCom — React Native Push Notifications 2026](https://devcom.com/tech-blog/react-native-push-notifications/), [Microsoft Learn — Azure Notification Hubs Architecture](https://learn.microsoft.com/en-us/azure/notification-hubs/notification-hubs-enterprise-push-notification-architecture)_

---

### Data Formats and Standards

#### API Request/Response: JSON

Standard JSON for all API communication. The OpenAPI 3.1 spec (built into .NET 10) serves as the contract. Use `System.Text.Json` source generators for optimal serialization performance.

#### Offline Data: TanStack Query Cache

**TanStack Query (React Query)** is the dominant pattern for managing server state in React Native in 2026. It abstracts fetching, caching, background re-fetching, and stale-while-revalidate logic. This replaces manual `useEffect` + `useState` patterns.

**TaagBack's offline-first strategy** (critical for outdoor scavenger hunts):
1. **Cache hunt data locally** when a user opens a hunt (stops, clues). Fetch and store before the hunt begins.
2. **Queue scan claims offline** — when a user scans without connectivity, store the claim locally with a timestamp and sync when online. The server accepts claims with timestamps for ordering.
3. **Use TanStack Query's persisted cache** for hunt lists and leaderboards (stale data acceptable for minutes).
4. **Idempotency tokens** on queued retries prevent double-claims.

_Source: [react.wiki — Production-Ready API Client in React](https://react.wiki/api/production-api-client/), [Sachith Dassanayake — Offline Sync & Conflict Resolution Patterns](https://www.sachith.co.uk/offline-sync-conflict-resolution-patterns-architecture-trade%E2%80%91offs-practical-guide-feb-19-2026/)_

---

### System Interoperability Approaches

#### Mobile API Client Architecture

The current `src/services/api.ts` typed API client is a good foundation. Evolve it with:
- **TanStack Query** for automatic caching, background refresh, and stale-while-revalidate
- **Axios interceptors** for transparent JWT refresh (catch 401 → refresh token → retry)
- **Retry logic with exponential backoff** specifically for the scan endpoint (latency-critical)
- **Secure credential storage** via `expo-secure-store` (iOS Keychain / Android Keystore) — never `AsyncStorage` for tokens

#### External Service Integration

| Service | Integration Pattern | Protocol |
|---------|-------------------|----------|
| Firebase Auth | SDK (client) + JWT validation (server) | HTTPS / OAuth 2.0 |
| OpenAI APIs | HTTP client from .NET backend | HTTPS / REST |
| Expo Push Service | HTTP POST from .NET backend | HTTPS / REST |
| PostGIS | EF Core + Npgsql (direct DB) | TCP / PostgreSQL wire protocol |

---

### Event-Driven Integration

#### In-Process Event Bus (MVP)

**MediatR** (free for companies under $5M revenue) or a hand-rolled mediator for in-process event dispatching. Define events like `ScanProcessedEvent`, `HuntCompletedEvent`, `TaagClaimedEvent` as notifications with multiple handlers.

Example flow:
```
QR Scan Request → ScanController → ProcessScanCommand (handler)
  → Writes scan record to DB
  → Publishes ScanProcessedEvent
    → Handler 1: Update leaderboard
    → Handler 2: Check hunt completion
    → Handler 3: Queue URL crawl (BackgroundService)
    → Handler 4: Send push notification if contested Taag
```

**No external message broker needed for MVP.** Use .NET's `Channel<T>` with `BackgroundService` for async work (URL crawling, auto-categorization) that shouldn't block the scan response.

**Open-source alternatives to MediatR:** Wolverine (by creator of Marten), Brighter (MIT-licensed), Cortex.Mediator (MIT), or a simple hand-rolled implementation (~50 lines of code).

_Source: [Code Maze — Event-Driven Architecture in C#](https://code-maze.com/csharp-event-driven-architecture/), [Milan Jovanovic — MediatR and MassTransit Going Commercial](https://www.milanjovanovic.tech/blog/mediatr-and-masstransit-going-commercial-what-this-means-for-you)_

#### CQRS (Lightweight, Single-Database)

Separate **Commands** (writes with validation/business rules) from **Queries** (reads optimized for presentation). In TaagBack, reads vastly outnumber writes (leaderboard views, hunt browsing >> scans, claims).

**MVP:** Lightweight CQRS with interface split (`ICommandHandler<T>` / `IQueryHandler<T, TResult>`). Single database. Example: `ProcessScanCommand` writes the scan record and publishes `ScanProcessedEvent`; `GetLeaderboardQuery` reads a denormalized leaderboard view.

**Growth:** If leaderboard reads bottleneck, introduce Redis sorted sets as a separate read model updated by event handlers.

_Source: [Microsoft Azure Architecture Center — CQRS Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs), [codewithmukesh — CQRS and MediatR in ASP.NET Core](https://codewithmukesh.com/blog/cqrs-and-mediatr-in-aspnet-core/)_

#### Distributed Messaging (Growth Phase)

When the monolith outgrows in-process eventing:
- **MassTransit or Wolverine** with **Azure Service Bus** (zero ops, built-in retry/DLQ, native .NET integration)
- Decouple scan processing from HTTP response — scan returns immediately, async work processes via message queue
- Enable independent scaling of notification sending, URL crawling, and leaderboard updates

_Source: [BoldSign — Azure Service Bus vs RabbitMQ for .NET Apps](https://boldsign.com/blogs/azure-service-bus-vs-rabbitmq/), [PIT Solutions — Message Brokers in .NET Applications](https://www.pitsolutions.com/blog/message-brokers-in-net-applications-rabbitmq-azure-service-bus-and-kafka)_

---

### Integration Security Patterns

#### Authentication: Firebase Auth + JWT Validation

**Firebase Auth is the recommended identity provider** for TaagBack. It provides:
- **Anonymous auth** — perfect for the "play first, sign up later" pattern. Creates a temporary UID at app launch.
- **User promotion** — `linkWithCredential()` upgrades anonymous accounts to permanent ones, preserving the UID and all associated data (scan history, claimed Taags).
- **Social login** — Google Sign-In + Apple Sign-In (mandatory per App Store if offering any social login) with unified JWT format.
- **Free tier** — up to 50K MAU, then ~$0.0055/MAU.
- **Phone auth** — useful for frictionless signup in markets where email is less common.

**Backend validation:** The .NET 10 API validates Firebase JWTs using `AddAuthentication().AddJwtBearer()` configured with Google's public keys. Endpoints use `[Authorize]` for protected routes and `[AllowAnonymous]` for public scanning/browsing.

**Why not ASP.NET Core Identity?** Requires significant DIY work for social login and anonymous-to-authenticated user promotion. **Why not Auth0?** Overkill and expensive for a consumer app at this stage.

_Source: [BuildMVPFast — Auth0 vs Firebase 2026](https://www.buildmvpfast.com/compare/auth0-vs-firebase), [LeanCode — IAM Solutions Compared](https://leancode.co/blog/identity-management-solutions-part-2-the-choice), [blog.markvincze.com — Secure ASP.NET Core API with Firebase](https://blog.markvincze.com/secure-an-asp-net-core-api-with-firebase/)_

#### Token Management

Firebase SDK handles token refresh automatically on the client side (access tokens are ~1 hour, refreshed transparently). Store the Firebase ID token in **Expo SecureStore** (iOS Keychain / Android Keystore) for offline access. **Never use AsyncStorage** for tokens.

For any custom tokens issued by the .NET API (e.g., API keys for B2B partners), implement **refresh token rotation**: each refresh invalidates the old token. Allow a ~30-second grace period for network failures on mobile.

_Source: [OneUptime — Token Rotation Strategies 2026](https://oneuptime.com/blog/post/2026-01-30-token-rotation-strategies/view), [Security Boulevard — Refresh Tokens Guide 2026](https://securityboulevard.com/2026/01/what-are-refresh-tokens-complete-implementation-guide-security-best-practices/)_

#### COPPA Age Gating

**Major regulatory update (2026):** New platform APIs are now live:
- **Google Play Age Signals API** (beta) — retrieves user age range from the OS
- **Apple Declared Age Range API** — equivalent for iOS
- **FTC enforcement discretion policy (Feb 25, 2026)** — the FTC will not enforce COPPA against mixed-audience operators collecting data solely for age verification, provided they follow safeguards (limited purpose, data minimization, retention limits).

**TaagBack implementation:** Since anonymous scanning requires no personal data, COPPA does not apply to the anonymous phase. At account creation, implement an age gate using platform APIs + self-reported date of birth. Under-13 users either require Verifiable Parental Consent (VPC) or enter a restricted mode with no personal data collection.

_Source: [Cooley — FTC COPPA Enforcement Discretion Policy 2026](https://www.cooley.com/news/insight/2026/2026-03-02-ftc-issues-coppa-enforcement-discretion-policy-to-incentivize-use-of-age-verification-technologies), [Sigosoft — Google Play Age Signals API Guide](https://sigosoft.com/blog/google-play-age-signals-api-guide/), [FKKS — App Store Accountability Acts Jan 2026](https://technologylaw.fkks.com/post/102lxsp/countdown-to-jan-1-2026-mobile-developers-must-adopt-apple-google-apis-to-com)_

#### API Hardening Checklist

| Action | Priority | Status |
|--------|----------|--------|
| Tighten CORS from "any origin" | CRITICAL | Current: open for dev |
| Add rate limiting middleware | HIGH | Built-in .NET support |
| Enforce HTTPS everywhere | HIGH | Standard |
| Validate all inputs server-side | HIGH | Parameterized queries with EF Core |
| Add `[Authorize]` to protected endpoints | HIGH | After Firebase Auth integration |
| Server-side QR token validation | HIGH | Never trust client |
| No secrets in React Native bundle | HIGH | Use env vars + secure config |
| Certificate pinning (optional) | MEDIUM | Adds operational complexity |

_Source: [OWASP Mobile Application Security](https://mas.owasp.org/), [Vervali — Mobile App Security Testing 2026](https://www.vervali.com/blog/mobile-app-security-testing-in-2026-statistics-owasp-threats-and-what-it-costs-to-get-it-wrong/)_

---

### Integration Architecture Summary

```
┌─────────────────────────────────────────────────────────┐
│                    REACT NATIVE APP                      │
│  ┌─────────┐  ┌──────────┐  ┌────────────┐            │
│  │VisionCam│  │ TanStack │  │  Firebase   │            │
│  │QR Scan  │  │  Query   │  │  Auth SDK   │            │
│  └────┬────┘  └────┬─────┘  └──────┬─────┘            │
│       │            │               │                    │
│  ┌────┴────────────┴───────────────┴─────┐             │
│  │          API Client (api.ts)           │             │
│  │   Axios + Interceptors + Retry         │             │
│  │   Expo SecureStore for tokens          │             │
│  └────────────────┬──────────────────────┘             │
└───────────────────┼─────────────────────────────────────┘
                    │ HTTPS / JSON
                    │ SSE (leaderboard stream)
                    ▼
┌───────────────────────────────────────────────────────┐
│              .NET 10 ASP.NET CORE API                  │
│  ┌────────────┐  ┌────────────┐  ┌───────────────┐   │
│  │ Controllers│  │  MediatR   │  │ Rate Limiting  │   │
│  │ /api/v1/*  │  │ Commands   │  │ Middleware     │   │
│  │            │  │ Queries    │  │                │   │
│  └─────┬──────┘  │ Events     │  └───────────────┘   │
│        │         └──────┬─────┘                       │
│        │                │                              │
│  ┌─────┴────────────────┴──────────────────────┐      │
│  │            Event Handlers                    │      │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────┐│      │
│  │  │Leaderboard│ │URL Crawl │ │ Push Notify  ││      │
│  │  │Update    │ │(BgService)│ │(Expo Push)   ││      │
│  │  └──────────┘ └──────────┘ └──────────────┘│      │
│  └─────────────────────────────────────────────┘      │
│                                                        │
│  ┌──────────────┐  ┌───────────┐  ┌──────────────┐   │
│  │ PostgreSQL   │  │ Firebase  │  │ OpenAI APIs  │   │
│  │ + PostGIS    │  │ JWT Valid │  │ Moderation   │   │
│  │ (EF Core)    │  │           │  │ Generation   │   │
│  └──────────────┘  └───────────┘  └──────────────┘   │
└───────────────────────────────────────────────────────┘
```

---

## Architectural Patterns and Design

### System Architecture Patterns

#### Current State: Three-Layer Architecture

TaagBack's existing codebase follows a clean **three-layer architecture** (Controllers → Services → Models) with dependency injection. This is the correct starting point — it's simple, well-understood, and maps directly to the current team size and feature set.

#### Recommended Evolution Path

**Phase 1 — MVP: Feature-Organized Layered Architecture**

Organize the existing layered architecture by feature (vertical slices) rather than by technical concern. This means grouping all code for a feature together:

```
server/TaagBack.Api/
├── Features/
│   ├── Hunts/
│   │   ├── HuntsController.cs
│   │   ├── HuntService.cs / IHuntService.cs
│   │   ├── HuntModels.cs (DTOs)
│   │   └── HuntValidators.cs
│   ├── HuntStops/
│   │   ├── HuntStopsController.cs
│   │   ├── HuntStopService.cs / IHuntStopService.cs
│   │   └── HuntStopModels.cs
│   ├── Scanning/
│   │   ├── ScanController.cs
│   │   ├── ScanService.cs / IScanService.cs
│   │   ├── ScanProcessedEvent.cs
│   │   └── ScanEventHandlers/
│   ├── Leaderboard/
│   │   ├── LeaderboardController.cs
│   │   ├── LeaderboardService.cs
│   │   └── LeaderboardSseEndpoint.cs
│   └── Identity/
│       ├── FirebaseAuthExtensions.cs
│       └── CurrentUserService.cs
├── Infrastructure/
│   ├── Persistence/ (DbContext, Migrations, Configurations)
│   ├── Caching/ (HybridCache setup, invalidation)
│   └── ExternalServices/ (OpenAI, Expo Push)
└── Program.cs
```

This structure keeps the simplicity of layered architecture while making feature boundaries visible. Each feature folder is a potential future module boundary.

**Phase 2 — Growth: Modular Monolith**

When team size exceeds 3-4 developers or features start conflicting, formalize the feature folders into **modules** with explicit boundaries:

- Each module gets its own `IServiceCollection` extension method for DI registration
- Modules communicate via in-process events (MediatR notifications), not direct service calls
- Each module owns its database tables (no cross-module joins)
- Shared kernel for cross-cutting entities (User, common value objects)

This is the "modular monolith" pattern championed by Milan Jovanovic and Microsoft's eShop reference architecture. It provides 80% of microservices' isolation benefits with zero deployment complexity.

**Phase 3 — Scale: Extract to Microservices (If Needed)**

Only extract modules that have genuinely different scaling requirements. Likely candidates:
- **Scan Processing** — high burst traffic during popular hunts
- **Leaderboard** — read-heavy, benefits from dedicated Redis instance
- **AI/Content Generation** — CPU-intensive, benefits from separate scaling

**Key principle: You may never need Phase 3.** Many successful companies run modular monoliths at scale. Extract only when a specific module's scaling requirements conflict with the rest.

_Source: [Milan Jovanovic — Modular Monolith Architecture](https://www.milanjovanovic.tech/blog/what-is-a-modular-monolith), [Microsoft — eShop Modular Monolith Reference](https://github.com/dotnet/eShop), [Derek Comartin — Modular Monolith: Is This the Trend in Software Architecture?](https://codeopinion.com/modular-monolith-is-this-the-trend-in-software-architecture/)_

---

### Design Principles and Best Practices

#### Domain-Driven Design (Tactical Patterns Only)

Full DDD (bounded contexts, ubiquitous language, context mapping) is premature for TaagBack's MVP. However, **tactical DDD patterns** are immediately useful:

- **Entities with identity:** `Hunt`, `HuntStop`, `Player`, `Scan` — already in place
- **Value Objects:** `QrToken` (immutable, equality by value), `GeoLocation` (lat/lon/accuracy), `GeofenceRadius` — wrap primitives to prevent primitive obsession
- **Aggregates:** `Hunt` is the aggregate root for `HuntStop` entities. All stop modifications go through the hunt — this prevents orphaned stops and enforces ordering invariants
- **Domain Events:** `ScanProcessed`, `HuntCompleted`, `TaagClaimed` — already designed for the MediatR event bus

**Don't over-apply:** Avoid repositories wrapping EF Core (EF Core's `DbContext` is already a Unit of Work + Repository). Don't create domain services when a simple service method works. TaagBack's domain is not complex enough to warrant full DDD ceremony.

_Source: [Microsoft — Domain-Driven Design Fundamentals](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/), [Vladimir Khorikov — DDD and EF Core: Don't Wrap What You Don't Need](https://enterprisecraftsmanship.com/posts/ef-core-vs-nhibernate-ddd/)_

#### SOLID Principles Applied to TaagBack

| Principle | TaagBack Application |
|-----------|---------------------|
| **S**ingle Responsibility | Each feature folder owns one capability end-to-end |
| **O**pen/Closed | MediatR handlers extend behavior without modifying scan pipeline |
| **L**iskov Substitution | `IHuntService` interface allows swapping in-memory → EF Core implementation |
| **I**nterface Segregation | `IHuntService` (CRUD) vs `IHuntDiscoveryService` (spatial search) — split when interfaces grow |
| **D**ependency Inversion | Controllers depend on service interfaces, not implementations (already in place) |

---

### Scalability and Performance Patterns

#### Caching Architecture (Three-Layer Strategy)

TaagBack benefits from a **three-layer caching strategy** coordinating client and server caches:

**Layer 1 — Client (TanStack Query)**
```typescript
// Aligned TTLs with server cache
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,     // 5 min — matches server L1
      gcTime: 30 * 60 * 1000,        // 30 min
      refetchOnWindowFocus: true,
    },
  },
});
```

**Layer 2 — Server In-Memory (HybridCache L1)**
Fast, per-node cache. 5-minute TTL for hunt data, 10-second TTL for leaderboards.

**Layer 3 — Server Redis (HybridCache L2)**
Shared across all API nodes. 1-hour TTL for hunt data, 30-second TTL for leaderboards. Redis Pub/Sub invalidates L1 across nodes when creators edit hunts.

```csharp
// .NET 10 HybridCache setup
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "localhost:6379";
    options.InstanceName = "taagback:";
});
builder.Services.AddHybridCache();
```

**Recommended TTLs:**

| Data Type | Client (TanStack) | Server L1 (Memory) | Server L2 (Redis) |
|-----------|-------------------|--------------------|--------------------|
| Hunt metadata | 5 min | 5 min | 1 hour |
| Stop list (active hunt) | 5 min | 5 min | 30 min |
| Leaderboard | 10 sec | 10 sec | 30 sec |
| QR token lookup | 10 min | 10 min | 24 hours |

**Cache invalidation:** Use FusionCache with Redis backplane for production-tested L1↔L2 invalidation, or implement Redis Pub/Sub manually with `HybridCache`. Creator edits trigger `InvalidateAsync($"hunt:{huntId}")` which propagates across all nodes.

_Source: [Milan Jovanovic — HybridCache + Redis Pub/Sub](https://www.milanjovanovic.tech/blog/solving-the-distributed-cache-invalidation-problem-with-redis-and-hybridcache), [Microsoft — Cache-Aside Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside)_

#### Database Scaling Strategy

**MVP (Launch → 10K users):**
- Single PostgreSQL + PostGIS instance
- GiST indexes on all spatial columns
- Npgsql connection pooling (built-in)
- HybridCache reduces read load

**Growth (10K → 100K users):**
- Add PgBouncer for connection pooling (transaction mode, `Pooling=false` in Npgsql)
- 1-2 read replicas for discovery queries and leaderboards
- Redis sorted sets (ZSETs) for leaderboard read model
- Monitor: if `scan_events` table exceeds ~10M rows, partition by time range

**Scale (100K+ users):**
- Time-partition `scan_events` by quarter
- Regional read replicas
- BRIN indexes on partitioned historical data
- Consider Citus for horizontal sharding only if needed

_Source: [PostGIS Performance Tips](https://postgis.net/docs/manual-2.0/ch07.html), [Alibaba Cloud — PostGIS Index Optimization](https://www.alibabacloud.com/blog/postgresql-best-practices-selection-and-optimization-of-postgis-spatial-indexes-gist-brin-and-r-tree_597034), [PgBouncer Documentation](https://www.pgbouncer.org/)_

---

### Data Architecture Patterns

#### PostGIS Schema Design

The recommended schema uses `GEOGRAPHY(Point, 4326)` for all location data (spherical earth model, distances in meters):

```sql
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE hunts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    creator_id UUID NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    region_hint GEOGRAPHY(Point, 4326),      -- centroid for discovery
    bounding_box GEOGRAPHY(Polygon, 4326),   -- enclosing area
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE hunt_stops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hunt_id UUID NOT NULL REFERENCES hunts(id) ON DELETE CASCADE,
    location GEOGRAPHY(Point, 4326) NOT NULL,
    geofence_radius_m DOUBLE PRECISION NOT NULL DEFAULT 50.0,
    sort_order INT NOT NULL,
    clue_text TEXT,
    qr_token VARCHAR(64) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(hunt_id, sort_order)
);

-- Spatial indexes (GiST for all interactive queries)
CREATE INDEX idx_hunt_stops_location ON hunt_stops USING GIST (location);
CREATE INDEX idx_hunts_region ON hunts USING GIST (region_hint);
CREATE INDEX idx_hunts_bbox ON hunts USING GIST (bounding_box);
```

**Key decisions:**
- **GEOGRAPHY over GEOMETRY**: No need for manual projections; `ST_DWithin()` returns meters natively
- **GiST over BRIN**: GiST supports KNN ordering (`ORDER BY distance`) and `ST_DWithin` acceleration. BRIN only for write-heavy historical tables (scan_events) where data arrives in rough geographic/temporal order
- **`bounding_box` on hunts**: Enables fast "hunts near me" discovery without scanning all stops
- **Gap-based `sort_order`** (10, 20, 30...): Allows inserting stops between existing ones without renumbering

**Critical anti-pattern** — always use `ST_DWithin()` for radius queries, never `ST_Distance()` in WHERE clauses (prevents index usage):

```sql
-- GOOD: uses spatial index
SELECT * FROM hunt_stops
WHERE ST_DWithin(location, ST_MakePoint(-73.985, 40.748)::geography, 5000);

-- BAD: full table scan
SELECT * FROM hunt_stops
WHERE ST_Distance(location, ST_MakePoint(-73.985, 40.748)::geography) < 5000;
```

_Source: [PostGIS Geography Workshop](http://postgis.net/workshops/postgis-intro/geography.html), [Paul Ramsey — Spatial Indexes and Bad Queries](http://blog.cleverelephant.ca/2021/05/indexes-and-queries.html), [PostGIS ST_DWithin Reference](https://postgis.net/docs/ST_DWithin.html)_

#### EF Core + Npgsql Spatial Integration

```csharp
// Entity configuration
public class HuntStop
{
    public Guid Id { get; set; }
    public Guid HuntId { get; set; }
    public Point Location { get; set; }  // NetTopologySuite.Geometries.Point
    public double GeofenceRadiusM { get; set; }
    public int SortOrder { get; set; }
    public string ClueText { get; set; }
    public string QrToken { get; set; }
}

// DbContext configuration
protected override void OnModelCreating(ModelBuilder builder)
{
    builder.HasPostgresExtension("postgis");

    builder.Entity<HuntStop>(e =>
    {
        e.Property(x => x.Location)
            .HasColumnType("geography (point)");
        e.HasIndex(x => x.Location)
            .HasMethod("gist");
        e.HasIndex(x => new { x.HuntId, x.SortOrder })
            .IsUnique();
    });
}
```

**LINQ spatial queries** translate automatically to PostGIS:
```csharp
// Translated to ST_DWithin — uses spatial index
var nearbyStops = await context.HuntStops
    .Where(s => s.Location.IsWithinDistance(playerPoint, 5000))
    .OrderBy(s => s.Location.Distance(playerPoint))
    .ToListAsync();
```

The Npgsql NTS plugin translates 60+ NetTopologySuite methods to PostGIS SQL including `Distance()`, `IsWithinDistance()`, `Contains()`, `Intersects()`, `Buffer()`, and `Transform()`.

_Source: [Npgsql NTS Spatial Mapping](https://www.npgsql.org/efcore/mapping/nts.html), [Microsoft — EF Core Spatial Data](https://learn.microsoft.com/en-us/ef/core/modeling/spatial)_

#### EF Core Migration Strategy

**Production deployment:** Use **idempotent SQL scripts** (not `Database.Migrate()` at startup):

```bash
dotnet ef migrations script --idempotent --output deploy.sql
```

These scripts check `__EFMigrationsHistory` before applying each block and can be reviewed, version-controlled, and applied via CI/CD. For containerized environments, **migration bundles** produce a self-contained executable.

**Zero-downtime migrations:** Follow the **expand-and-contract** pattern:
1. **Expand** — add new columns/tables alongside existing schema
2. **Transition** — backfill data, application reads from new schema
3. **Contract** — drop old columns/tables after all nodes use new schema

**PostgreSQL-specific:** Always create indexes with `CONCURRENTLY` to avoid blocking writes. In EF Core migrations, use raw SQL for concurrent index creation since EF Core doesn't support this natively.

_Source: [Microsoft — Applying EF Core Migrations](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/applying), [Xata — Zero-Downtime PostgreSQL Migrations (pgroll)](https://xata.io/blog/zero-downtime-schema-migrations-postgresql)_

---

### Security Architecture Patterns

#### Defense-in-Depth for Scan Validation

The QR code scan is TaagBack's most critical endpoint. Security layers:

1. **QR Token Validation** — Server-side lookup of the token (never trust client-decoded data)
2. **Authentication** — Firebase JWT required (even anonymous users have a UID)
3. **Geofence Verification** — `ST_DWithin(stop.location, player.location, stop.geofence_radius_m)` confirms physical presence
4. **Rate Limiting** — Token Bucket (30/min per user) prevents automated scanning
5. **Idempotency** — Client-generated idempotency key prevents double-claims on retry
6. **Temporal Consistency** — Flag impossible movement speeds between consecutive scans (>180 km/h)
7. **Platform Attestation** — Play Integrity (Android) / DeviceCheck (iOS) detect emulators and rooted devices

```csharp
// Scan validation pipeline
public async Task<ScanResult> ProcessScanAsync(ScanRequest request)
{
    // 1. Token lookup
    var stop = await _db.HuntStops.FirstOrDefaultAsync(s => s.QrToken == request.Token);
    if (stop is null) return ScanResult.InvalidToken();

    // 2. Geofence check
    var playerPoint = new Point(request.Longitude, request.Latitude) { SRID = 4326 };
    if (!stop.Location.IsWithinDistance(playerPoint, stop.GeofenceRadiusM))
        return ScanResult.OutOfRange();

    // 3. Idempotency check
    if (await _db.Scans.AnyAsync(s => s.IdempotencyKey == request.IdempotencyKey))
        return ScanResult.AlreadyClaimed();

    // 4. Speed check (anti-spoofing)
    var lastScan = await _db.Scans
        .Where(s => s.PlayerId == request.PlayerId)
        .OrderByDescending(s => s.ScannedAt)
        .FirstOrDefaultAsync();
    if (lastScan is not null && IsImpossibleSpeed(lastScan, request))
        return ScanResult.SuspiciousActivity();

    // 5. Record scan + publish event
    var scan = new Scan { /* ... */ };
    _db.Scans.Add(scan);
    await _db.SaveChangesAsync();
    await _mediator.Publish(new ScanProcessedEvent(scan));
    return ScanResult.Success(stop);
}
```

_Source: [OWASP Mobile Application Security](https://mas.owasp.org/), [Google — Play Integrity API](https://developer.android.com/google/play/integrity)_

#### Crowdsourced Content Moderation Architecture

**Tiered moderation for community-created hunts:**

1. **Automated (immediate, on submit):**
   - OpenAI Moderation API (free) for text toxicity/profanity
   - Location validation: all stops on land, not in restricted areas (schools, military)
   - Stop spacing reasonableness check
   - GPS coordinate bounds validation

2. **Community (crowd-sourced):**
   - Players flag hunts/stops with categorized reasons
   - After N flags, hunt suspended pending review
   - Successful completions count as implicit positive signals

3. **Staff review (escalated):**
   - Priority queue ordered by flag count and creator reputation
   - Full audit trail for all moderation decisions

**Creator reputation tiers** (reduce moderation load for trusted creators):

| Tier | Criteria | Benefit |
|------|----------|---------|
| New | < 3 published hunts | All hunts queue for review |
| Established | 3+ hunts, avg rating ≥ 3.5 | Auto-approved unless flagged |
| Trusted | 10+ hunts, avg rating ≥ 4.0, 0 rejected | Skip moderation, can flag others |

_Source: [Enrich Labs — Content Moderation Guide 2026](https://www.enrichlabs.ai/blog/content-moderation-complete-guide), [O'Reilly — Building Web Reputation Systems](https://www.oreilly.com/library/view/building-web-reputation/9781449382193/ch04.html)_

---

### Deployment and Operations Architecture

#### Migration-Safe Deployment Pipeline

```
Developer → git push → GitHub Actions CI
  ├── Build + Test (.NET + React Native)
  ├── Generate idempotent SQL migration script
  ├── Review migration script (manual gate for destructive changes)
  └── Deploy
       ├── Apply migrations to PostgreSQL (expand phase)
       ├── Deploy new API version (Azure App Service slot swap)
       └── EAS Update for React Native (OTA, no app store review)
```

**Key deployment principles:**
- **Database migrations run before application deployment** (expand-and-contract)
- **Slot swaps** on Azure App Service provide zero-downtime deployment with instant rollback
- **EAS Update** pushes JavaScript bundle changes without app store review (~5 min to all users)
- **EAS Build** for native changes (new SDK versions, native modules) — requires app store review

#### Geofence Verification at Scan Time

Application-level geofence checking (not database triggers) is the right pattern for TaagBack because checks happen at discrete scan events, not continuous tracking:

```sql
-- Check if player is within stop's geofence at scan time
SELECT hs.id, hs.clue_text
FROM hunt_stops hs
WHERE hs.qr_token = $1
  AND ST_DWithin(
    hs.location,
    ST_MakePoint($2, $3)::geography,
    hs.geofence_radius_m
  );
```

If continuous proximity alerts are needed later (e.g., "getting warmer" hints), the trigger-based model using `pg_notify()` can broadcast geofence enter/leave events as JSON for real-time SSE delivery.

#### GPS Data Validation Pipeline

Mobile GPS accuracy varies: 3-5m outdoors with clear sky, 10-50m+ in urban canyons or indoors. TaagBack needs validation at both client and server:

**Client-side (before sending):**
- Request `Location.Accuracy.High` (GPS + WiFi + Cell)
- Reject readings where `coords.accuracy > 100m` for scans, `> 50m` for stop placement
- Show user-friendly message: "GPS signal too weak. Move to an open area."

**Server-side validation:**
- Bounds check: latitude [-90, 90], longitude [-180, 180]
- Accuracy threshold enforcement
- Temporal consistency: flag impossible speeds (>180 km/h between consecutive scans)
- Duplicate detection: reject identical coordinates in rapid succession (replay attack indicator)

**Anti-spoofing reality check:** No GPS validation is foolproof. The QR code itself is the primary proof of physical presence; GPS is a secondary verification layer. For competitive hunts, the combination of QR scanning + GPS + rate limiting provides reasonable protection.

_Source: [GPS Outlier Detection Methods (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC3787448/), [Crunchy Data — Moving Objects and Geofencing with PostGIS](https://www.crunchydata.com/blog/moving-objects-and-geofencing-with-postgres-postgis)_

---

### Architecture Decision Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Architecture style** | Feature-organized layered → Modular monolith | Simple start, clear evolution path, no premature complexity |
| **Database schema** | PostgreSQL + PostGIS with GEOGRAPHY type | Spherical earth model, meters natively, GiST index support |
| **Spatial indexing** | GiST (interactive), BRIN (historical) | GiST for KNN + ST_DWithin; BRIN only for scan_events at scale |
| **Caching** | HybridCache (L1 memory + L2 Redis) | Built-in .NET 10, two-tier with Pub/Sub invalidation |
| **Migration strategy** | Idempotent SQL scripts + expand-and-contract | Reviewable, CI/CD friendly, zero-downtime |
| **Content moderation** | Three-tier (automated → community → staff) | Scales with user base, reduces manual review load |
| **Creator trust** | Reputation tiers (New → Established → Trusted) | Earned autonomy, reduces moderation bottleneck |
| **Scan security** | 7-layer defense-in-depth pipeline | QR token + auth + geofence + rate limit + idempotency + speed check + attestation |
| **GPS validation** | Client + server dual validation | Graceful UX + server-side enforcement |
| **Connection pooling** | Npgsql built-in (MVP) → PgBouncer (growth) | Simple start, add pooler when connection count warrants it |

### Deep-Dive Recommendations

Areas warranting dedicated research before implementation:

1. **Offline-First Architecture** — Detailed design for queued scan claims, conflict resolution, and sync protocol. Critical for outdoor scavenger hunts with spotty connectivity.
2. **Leaderboard Real-Time System** — Redis ZSET schema design, SSE endpoint implementation, and race condition handling for contested Taags.
3. **Hunt Discovery Algorithm** — Spatial search ranking that balances proximity, popularity, difficulty, and freshness. The "hunts near me" feed is the primary discovery mechanism.
4. **QR Code Generation Pipeline** — Unique token generation, printable QR code rendering with branding, and batch generation for hunt creators.

---

## Implementation Approaches and Technology Adoption

### Technology Adoption Strategy

#### Migration from In-Memory to EF Core + PostgreSQL

The current codebase uses `List<T>` in-memory storage behind interface abstractions (`IHuntService`, `IHuntStopService`). This is the **critical-path migration** — all data is lost on restart. The interface-based design makes the swap clean:

1. Add NuGet packages: `Npgsql.EntityFrameworkCore.PostgreSQL` + `Npgsql.EntityFrameworkCore.PostgreSQL.NetTopologySuite` (v10.0.0)
2. Create `TaagBackDbContext` with `DbSet<Hunt>`, `DbSet<HuntStop>`, configure PostGIS extension
3. Add `Point Location` property (NetTopologySuite) to `HuntStop` model
4. Create new `DbHuntService : IHuntService` and `DbHuntStopService : IHuntStopService`
5. Swap DI registration in `Program.cs` from `AddSingleton<IHuntService, HuntService>()` to `AddScoped<IHuntService, DbHuntService>()`
6. Run `dotnet ef migrations add InitialCreate` and `dotnet ef database update`
7. Keep original in-memory implementations for unit tests

_Source: [Npgsql EF Core Provider](https://www.npgsql.org/efcore/), [EF Core Spatial Data](https://learn.microsoft.com/en-us/ef/core/modeling/spatial)_

#### Phased Adoption Roadmap

**Phase 1 — MVP (Months 1-3):**
- EF Core + PostgreSQL + PostGIS replacing in-memory storage
- Firebase Auth (email/password + Google Sign-In + anonymous)
- Core CRUD: Hunts, HuntStops, QR scanning flow
- Basic hunt progress tracking
- PostGIS for stop location storage

**Defer to Phase 2:**
- Redis caching, AI features, real-time notifications, social features, offline mode, analytics dashboard

**Phase 2 — Growth (Months 4-8, ~1K-10K users):**
- Add Redis when database query latency exceeds 100ms on hot paths or >50 concurrent users hit the same hunt data
- Azure Cache for Redis Basic: ~$16/mo (250 MB)
- Enable PgBouncer (built into Azure PostgreSQL Flexible Server — free, just enable it)
- Add read replicas when read:write ratio exceeds 10:1 AND CPU saturates on primary
- Leaderboards, SSE real-time updates, AI clue generation

**Phase 3 — Scale (Months 9+, ~10K+ users):**
- Azure Container Apps when auto-scale-to-zero saves cost or multiple services needed
- Time-partition `scan_events` table when it exceeds ~10M rows
- Citus only when single PostgreSQL node can't handle volume (>100GB or >1K concurrent queries/sec)
- Microservice extraction only when monolith deployment blocks independent team velocity

#### Feature Flag Strategy

Use **Microsoft.FeatureManagement** (free, built into ASP.NET Core ecosystem):

```csharp
// Program.cs
builder.Services.AddFeatureManagement();

// Controller or service
if (await _featureManager.IsEnabledAsync("AiClueGeneration"))
{
    // Generate AI-powered clue hints
}
```

Built-in filters: `PercentageFilter` (percentage rollout), `TimeWindowFilter` (scheduled launches), `TargetingFilter` (user/group targeting). Store flags in `appsettings.json` initially; upgrade to Azure App Configuration for dynamic updates without redeployment.

_Source: [Microsoft.FeatureManagement](https://github.com/microsoft/FeatureManagement-Dotnet), [Feature Flags in ASP.NET Core](https://learn.microsoft.com/en-us/azure/azure-app-configuration/quickstart-feature-flag-aspnet-core)_

---

### Development Workflows and Tooling

#### CI/CD Pipeline Architecture

**Backend (GitHub Actions):**

```yaml
# .github/workflows/backend.yml
name: Backend CI
on:
  push:
    paths: ['server/**']
  pull_request:
    paths: ['server/**']

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '10.0.x'
      - run: dotnet restore server/TaagBack.slnx
      - run: dotnet build server/TaagBack.slnx --no-restore
      - run: dotnet test server/TaagBack.slnx --no-build

  deploy:
    needs: build-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '10.0.x'
      - run: dotnet publish server/TaagBack.Api -c Release -o ./publish
      - uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
      - uses: azure/webapps-deploy@v3
        with:
          app-name: 'taagback-api'
          package: ./publish
```

Use **dorny/paths-filter** for monorepo path filtering beyond basic `paths:` triggers.

**Frontend (EAS Build + EAS Update):**
- **EAS Build** for native changes (new SDK versions, native modules) — requires app store review
- **EAS Update** for JS-only changes — OTA delivery in ~5 minutes, no app store review
- **Hermes bytecode diffing** in SDK 55 generates binary patches, significantly reducing update download sizes
- **EAS Workflows** is now the preferred CI/CD orchestration for Expo (replacing deprecated GitHub build triggers)

**Database Migrations in CI/CD:**

```bash
# Generate idempotent SQL script for review
dotnet ef migrations script --idempotent --output migrations.sql

# OR generate a self-contained migration bundle for containerized deployments
dotnet ef migrations bundle --self-contained -r linux-x64
./efbundle --connection "Host=...;Database=taagback"
```

Always run migration scripts **before** application deployment (expand-and-contract pattern).

_Source: [GitHub Docs — Building and Testing .NET](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-net), [EAS Build Introduction](https://docs.expo.dev/build/introduction/), [EAS Update Introduction](https://docs.expo.dev/eas-update/introduction/), [EF Core Migration Bundles](https://devblogs.microsoft.com/dotnet/introducing-devops-friendly-ef-core-migration-bundles/)_

#### Development Experience

**.NET 10:**
- `dotnet watch --project server/TaagBack.Api` for hot reload during development
- Minimal APIs enhancements: built-in validation, SSE support, `PipeReader`-based JSON parsing

**Expo SDK 55:**
- Start with **Expo Go** for early prototyping (zero build step)
- Switch to **Development Builds** (`expo-dev-client`) once QR scanning (camera access) or Firebase native modules are added
- Build once with `npx expo run:android`/`npx expo run:ios`, then connect via `npx expo start --dev-client` — JS reload remains instant

_Source: [Expo Go vs Development Builds](https://expo.dev/blog/expo-go-vs-development-builds), [.NET Hot Reload](https://learn.microsoft.com/en-us/aspnet/core/test/hot-reload)_

#### Code Quality Tools

**Backend (.NET):**
- `.editorconfig` at repo root with naming, formatting, and analyzer severity rules
- `dotnet format server/TaagBack.slnx --verify-no-changes` in CI to fail builds on violations
- Roslyn analyzers: `Microsoft.CodeAnalysis.NetAnalyzers` (ships with SDK) + `Roslynator.Analyzers`

**Frontend (TypeScript):**
- ESLint with `@typescript-eslint` for code quality
- **Biome** (10-25x faster than ESLint+Prettier, single binary) for formatting — or Prettier if already configured
- `lint-staged` + `husky` for pre-commit hooks enforcing both .NET and TypeScript formatting

**Git workflow:** **Trunk-based development** with short-lived feature branches (hours to 1-2 days). Merge to `main` frequently via small PRs. Feature flags decouple deployment from feature activation.

_Source: [dotnet format — Microsoft](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-format), [Biome vs ESLint+Prettier](https://medium.com/better-dev-nextjs-react/biome-vs-eslint-prettier-the-2025-linting-revolution-you-need-to-know-about-ec01c5d5b6c8), [Trunk-Based Development — Atlassian](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development)_

---

### Testing and Quality Assurance

#### Backend Testing Strategy

**Unit Tests (NUnit 4):**

```csharp
[Test]
[CancelAfter(5000)]
public async Task GetHunt_ShouldReturnHunt_WhenExists(CancellationToken ct)
{
    // Arrange
    var service = new HuntService();  // in-memory implementation for unit tests
    var hunt = await service.CreateAsync(new Hunt { Name = "Test" }, ct);

    // Act
    var result = await service.GetByIdAsync(hunt.Id, ct);

    // Assert
    await Assert.ThatAsync(() => result, Is.Not.Null);
    Assert.That(result!.Name, Is.EqualTo("Test"));
}
```

NUnit 4 key improvements: proper `Assert.ThatAsync` (awaitable), `Assert.MultipleAsync` for mixed sync/async asserts, `CancelAfter` attribute for cooperative cancellation.

**Integration Tests (Testcontainers + PostGIS):**

```csharp
[TestFixture]
public class HuntStopSpatialTests
{
    private PostgreSqlContainer _postgres = null!;
    private TaagBackDbContext _db = null!;

    [OneTimeSetUp]
    public async Task Setup()
    {
        _postgres = new PostgreSqlBuilder()
            .WithImage("postgis/postgis:16-3.4")
            .Build();
        await _postgres.StartAsync();

        var options = new DbContextOptionsBuilder<TaagBackDbContext>()
            .UseNpgsql(_postgres.GetConnectionString(), o => o.UseNetTopologySuite())
            .Options;
        _db = new TaagBackDbContext(options);
        await _db.Database.MigrateAsync();
    }

    [Test]
    public async Task FindNearbyStops_ShouldReturnStopsWithinRadius()
    {
        // Test ST_DWithin queries against real PostGIS
    }

    [OneTimeTearDown]
    public async Task Teardown()
    {
        await _postgres.StopAsync();
        await _postgres.DisposeAsync();
    }
}
```

The `postgis/postgis:16-3.4` Docker image provides a real PostGIS environment. NuGet: `Testcontainers.PostgreSql` (v4.10.0).

**API Contract Tests (Pact):**
Consumer-driven contract testing between React Native frontend and .NET API. React Native defines expected interactions → Pact generates JSON contract → .NET provider replays and verifies. NuGet: `PactNet`. npm: `@pact-foundation/pact`.

_Source: [Testcontainers for .NET — PostgreSQL](https://dotnet.testcontainers.org/modules/postgres/), [Testcontainers PostGIS Module](https://testcontainers.com/modules/postgis/), [Milan Jovanovic — Testcontainers Best Practices](https://www.milanjovanovic.tech/blog/testcontainers-best-practices-dotnet-integration-testing), [PactNet](https://github.com/pact-foundation/pact-net)_

#### Frontend Testing Strategy

- **`jest-expo`** preset mocks native Expo SDK parts. Install: `npx expo install jest-expo jest`
- **`@testing-library/react-native`** for component testing with user-centric queries
- Test business logic: form validation, data manipulation, conditional rendering, state management
- Place tests in `__tests__/` directory (not inside `app/` if using Expo Router)
- Avoid snapshot tests for UI — use integration/E2E tests instead

_Source: [Unit Testing with Jest — Expo](https://docs.expo.dev/develop/unit-testing/), [Testing Configuration for Expo Router](https://docs.expo.dev/router/reference/testing/)_

---

### Deployment and Operations Practices

#### Monitoring and Observability

**Backend — OpenTelemetry + Azure Monitor:**

```csharp
// Program.cs
builder.Services.AddOpenTelemetry()
    .UseAzureMonitor(options =>
    {
        options.ConnectionString = builder.Configuration["APPLICATIONINSIGHTS_CONNECTION_STRING"];
    })
    .WithTracing(tracing => tracing
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddNpgsql()
        .AddSource("TaagBack.Api"))
    .WithMetrics(metrics => metrics
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddMeter("TaagBack.Hunts"));
```

Use the **Azure Monitor OpenTelemetry Distro** (not the classic Application Insights SDK). Note: instrumentation key ingestion ended March 2025 — use connection strings only.

**Custom Scavenger Hunt Metrics:**

```csharp
public class HuntMetrics
{
    private readonly Counter<long> _scanCounter;
    private readonly UpDownCounter<long> _activeHunts;
    private readonly Histogram<double> _scanLatency;

    public HuntMetrics(IMeterFactory meterFactory)
    {
        var meter = meterFactory.Create("TaagBack.Hunts");
        _scanCounter = meter.CreateCounter<long>("taagback.scans.total");
        _activeHunts = meter.CreateUpDownCounter<long>("taagback.hunts.active");
        _scanLatency = meter.CreateHistogram<double>("taagback.scans.latency", "ms");
    }
}
```

**Frontend — Sentry for Expo:**
- `@sentry/react-native` with Expo plugin
- Session Replays viewable in EAS dashboard
- `useNativeInit` option initializes Sentry before JS loads, capturing app start errors
- Setup: `npx @sentry/wizard@latest -i reactNative`

**Health Checks:**

```csharp
builder.Services.AddHealthChecks()
    .AddNpgSql(connectionString, name: "postgresql")
    .AddRedis(redisConnectionString, name: "redis")  // when added
    .AddUrlGroup(new Uri("https://firebase.googleapis.com"), name: "firebase");

app.MapHealthChecks("/health");
```

NuGet: `AspNetCore.HealthChecks.Npgsql`, `AspNetCore.HealthChecks.Redis`, `AspNetCore.HealthChecks.UI` for dashboard.

_Source: [OpenTelemetry .NET](https://opentelemetry.io/docs/languages/dotnet/), [Azure Monitor OpenTelemetry Distro](https://dotnetintellect.com/2025/04/15/observability-in-asp-net-core-with-opentelemetry-and-azure-monitor/), [Sentry + Expo](https://docs.expo.dev/guides/using-sentry/), [ASP.NET Core Health Checks](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks)_

---

### Team Organization and Skills

#### Skill Matrix

| Skill Area | Required for MVP | Ramp-Up Time | Priority |
|------------|-----------------|--------------|----------|
| C# / ASP.NET Core / .NET 10 | Yes | Already in codebase | Core |
| EF Core + PostgreSQL | Yes | Low (if C# proficient) | Core |
| PostGIS / NetTopologySuite | Yes | 1-2 weeks | Core |
| React Native / Expo SDK 55 | Yes | Already in codebase | Core |
| TypeScript (strict mode) | Yes | Already in codebase | Core |
| Firebase Auth | Yes | 1 week | Core |
| Azure App Service | Yes | 1-2 days | Core |
| CI/CD (EAS Build + GitHub Actions) | Phase 2 | 2-3 days | Support |
| Redis caching | Phase 2 | 1 week | Deferred |
| Docker / Container Apps | Phase 3 | 1-2 weeks | Deferred |

**PostGIS ramp-up:** For TaagBack's MVP, you need a narrow subset — `Point` type for stop locations, `ST_DWithin` for proximity queries, `ST_Distance` for ordering by distance. That's likely all you need initially.

**Key resources:** [EF Core Spatial Data docs](https://learn.microsoft.com/en-us/ef/core/modeling/spatial) → [Npgsql NTS mapping](https://www.npgsql.org/efcore/mapping/nts.html) → [PostGIS workshop](http://postgis.net/workshops/postgis-intro/)

#### Solo Developer Productivity Patterns

1. **Vertical slices:** Build one complete feature (API + DB + UI) per sprint, not all layers horizontally
2. **2-week sprints with demo-able output:**
   - Sprint 1: EF Core + PostgreSQL migration, Hunt CRUD with persistence
   - Sprint 2: HuntStop CRUD + PostGIS location + QR code generation
   - Sprint 3: Firebase Auth integration + user-scoped hunts
   - Sprint 4: QR scanning flow (camera → API → progress tracking)
   - Sprint 5: Polish, testing, app store preparation
3. **Limit WIP:** Never more than 2 tasks in progress simultaneously
4. **Automate early:** Set up CI/CD in Sprint 1 — every manual step is accumulated debt
5. **Time allocation:** 60% feature dev, 20% testing/bugs, 10% infrastructure, 10% learning

#### When to Hire/Contract

| Trigger | Role | Est. Cost |
|---------|------|-----------|
| MVP launch | Contract QA tester (1-2 weeks) | $2K-4K |
| >1K users, velocity too slow | Part-time React Native dev | $50-80/hr |
| Complex PostGIS perf tuning | PostgreSQL consultant (one-time) | $2K-5K |
| First app store submission | iOS/Android release consultant | $1K-2K |
| Legal compliance (COPPA) | Privacy attorney (one-time review) | $2K-5K |

---

### Cost Optimization and Resource Management

#### MVP Monthly Cost Breakdown

| Service | Monthly Cost |
|---------|-------------|
| Azure App Service B1 (Linux, 1 vCPU, 1.75 GB) | $13.14 |
| Azure PostgreSQL Flexible Server B1ms + 32 GB storage | $16.09 |
| EAS Build (Free tier — 30 builds/month) | $0.00 |
| Firebase Auth (under 50K MAU) | $0.00 |
| GPT-4o mini (~5-6M input tokens/mo) | ~$3.20 |
| OpenAI Moderation API | $0.00 |
| **Total MVP** | **~$32.43/mo** |

At launch with EAS Starter plan: **~$51.43/mo**

#### Growth Phase Cost Projection (~1K-10K users)

| Service | Monthly Cost |
|---------|-------------|
| Azure App Service B2 (2 vCPU, 3.5 GB) | $25.55 |
| Azure PostgreSQL B2s (2 vCore, 4 GiB) + storage | ~$53 |
| Azure Cache for Redis Basic (250 MB) | ~$16 |
| EAS Build Starter | $19 |
| Firebase Auth (growing MAU) | $0-62.50 |
| GPT-4o mini (higher usage) | ~$10 |
| Sentry (free tier) | $0 |
| **Total Growth** | **~$124-186/mo** |

#### Cost Optimization Strategies

- **Reserved Instances:** Azure PostgreSQL reserved capacity saves 40% (1-year) or 60% (3-year). Only commit after ~3 months of validated usage.
- **Auto-stop dev/staging:** Azure Automation to stop non-production resources outside business hours (saves ~65%).
- **PgBouncer:** Built into Azure PostgreSQL Flexible Server at no extra cost — enable from day one.
- **PostgreSQL auto-stop:** Flexible Server supports server stop/start — stop dev servers on weekends.

_Source: [Azure App Service Pricing](https://azure.microsoft.com/en-us/pricing/details/app-service/linux/), [Azure PostgreSQL Pricing](https://azure.microsoft.com/en-us/pricing/details/postgresql/flexible-server/), [Expo EAS Pricing](https://expo.dev/pricing), [Firebase Pricing](https://firebase.google.com/pricing), [Azure Reserved Pricing](https://learn.microsoft.com/en-us/azure/postgresql/configure-maintain/concepts-reserved-pricing)_

---

### Risk Assessment and Mitigation

#### Technical Risks

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| PostGIS learning curve | Medium | High | EF Core + NTS abstracts most complexity. MVP needs only `Point`, `ST_DWithin`, `ST_Distance`. 1-2 week ramp-up. |
| Expo SDK upgrade path | Medium | Medium | SDK 55 dropped Old Architecture entirely. Pin dependency versions. Budget 1-2 days per SDK upgrade. |
| Firebase vendor lock-in | Low | High | Standard JWT tokens validated server-side. Exit strategy: export via Admin SDK → Supabase/Keycloak. Keep all Firebase calls behind a service abstraction. |
| .NET 10 stability | Low | Low | LTS release (Nov 2025), well-supported on Azure. |

#### Operational Risks

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| Single developer bus factor | High | High | Document decisions in `docs/architecture.md` + BMAD artifacts. Comprehensive tests. Automated CI/CD. Consider part-time contractor for code reviews. |
| Deployment failures | Medium | Medium | Azure App Service deployment slots for staging. Health check endpoints. EF Core migration bundles for safe DB updates. Azure Monitor alerts for 5xx errors. |
| Data loss | Critical | Low | Azure PostgreSQL auto-backups (7-35 day retention). Geo-redundant backup available. Test restore procedures quarterly. |
| Secret exposure | High | Low | Azure Key Vault for connection strings and API keys. Never commit secrets to git. Use managed identities where possible. |

#### Business Risks

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| App Store rejection | High | Medium | QR codes must not unlock paid content without IAP (Apple 3.1.1). Include privacy policy URL. Test on physical devices. Budget 1-2 weeks for review cycle. |
| COPPA compliance | High | Medium | Set minimum age 13 in onboarding. Audit all SDKs for COPPA-prohibited data collection. Anonymous scanning collects no personal data. |
| QR code vandalism | Medium | Medium | Tamper-evident stickers. Visual branding on QR codes. Server-side validation rejects unexpected patterns. Creators can regenerate tokens for compromised stops. |

#### Contingency Plans

1. **PostgreSQL outage:** Azure 99.9% SLA on zone-redundant. Accept brief downtime on MVP non-HA. Enable failover when budget allows.
2. **Firebase Auth outage:** 99.95% SLA. Cache validated JWTs locally (short TTL) so sessions survive brief outages.
3. **EAS Build unavailable:** Maintain `eas build --local` capability. Document local build prerequisites.
4. **Azure region outage:** Start single-region. Firebase Auth is multi-region by default. Add geo-redundancy in Phase 3.

---

## Technical Research Recommendations

### Implementation Roadmap

| Phase | Timeline | Focus | Key Deliverables |
|-------|----------|-------|-----------------|
| **Phase 1: MVP** | Months 1-3 (5 sprints) | Core functionality | EF Core + PostgreSQL migration, Firebase Auth, hunt CRUD, QR scanning, basic progress tracking |
| **Phase 2: Growth** | Months 4-8 | Performance + features | Redis caching, leaderboards, SSE real-time, AI clue generation, CI/CD automation |
| **Phase 3: Scale** | Months 9+ | Infrastructure | Container Apps, read replicas, table partitioning, monitoring dashboard |

### Technology Stack Validation

The existing .NET 10 + React Native (Expo SDK 55) stack is **validated and confirmed** for TaagBack's MVP and growth phases:

| Component | Verdict | Confidence |
|-----------|---------|------------|
| .NET 10 LTS API | Validated | High — LTS support through Nov 2028, excellent Azure integration |
| React Native 0.83 / Expo SDK 55 | Validated | High — New Architecture mandatory, strong ecosystem |
| PostgreSQL + PostGIS | Validated | High — GiST indexes, geography type, EF Core integration proven |
| Firebase Auth | Validated | High — Free to 50K MAU, anonymous-first pattern, standard JWT |
| Redis (growth) | Validated | High — HybridCache built into .NET 10, sorted sets for leaderboards |
| Azure App Service → Container Apps | Validated | High — Clear upgrade path, consumption pricing at scale |
| TanStack Query | Validated | High — Dominant pattern for React Native server state, offline support |
| GPT-4o mini + OpenAI Moderation | Validated | Medium — Cost-effective, but AI features are deferrable |

### Success Metrics and KPIs

| Metric | MVP Target | Growth Target |
|--------|-----------|---------------|
| API response time (p95) | < 200ms | < 100ms |
| QR scan latency (end-to-end) | < 500ms | < 300ms |
| App cold start time | < 3s | < 2s |
| Deployment frequency | Weekly | Daily (OTA) |
| Test coverage (backend) | > 60% | > 80% |
| Uptime SLA | 99% | 99.9% |
| Monthly infrastructure cost | < $55 | < $200 |
| Time to first hunt completion (new user) | < 10 min | < 5 min |

---

## Research Synthesis and Conclusion

### Summary of Key Technical Findings

This research conducted across six structured steps — scope confirmation, technology stack analysis, integration patterns, architectural patterns, implementation approaches, and this synthesis — confirms that **TaagBack's technical foundation is sound and the MVP is buildable with the current stack in 8-12 weeks by a solo developer**.

**The 10 most consequential technical decisions, now resolved:**

| # | Decision | Resolution | Impact |
|---|----------|-----------|--------|
| 1 | Database | PostgreSQL + PostGIS (GEOGRAPHY type, GiST indexes) | Eliminates entire class of spatial query complexity |
| 2 | Authentication | Firebase Auth, anonymous-first with `linkWithCredential()` | Enables "play first, sign up later" — core to TaagBack's "Protect the Magic" principle |
| 3 | Architecture | Feature-organized layered → Modular monolith evolution | No premature complexity, clear scaling path |
| 4 | Real-time | SSE via .NET 10 native support + `react-native-sse` | Simpler than SignalR, sufficient for leaderboard streaming |
| 5 | API style | REST with URL path versioning (`/api/v1/`) | Correct for TaagBack's small, resource-oriented API surface |
| 6 | Caching | HybridCache (L1 memory + L2 Redis) with Pub/Sub invalidation | Built into .NET 10, Redis deferred to growth phase |
| 7 | Event system | MediatR in-process (MVP) → MassTransit + Azure Service Bus (Growth) | Decoupled scan processing from HTTP response without infrastructure overhead |
| 8 | Client state | TanStack Query with query key factory pattern | Handles caching, offline, background refresh — replaces manual `useEffect` patterns |
| 9 | AI integration | GPT-4o mini via `Microsoft.Extensions.AI` + free OpenAI Moderation API | ~$3.20/mo for generation, $0 for moderation, deferrable to Phase 2 |
| 10 | Deployment | Azure App Service (slot swaps) + EAS Build/Update (OTA) | Zero-downtime API deploys, 5-minute mobile JS updates |

### Strategic Technical Impact Assessment

**What makes TaagBack technically defensible:**

1. **QR interception pipeline** — intercepting at the decoder stage before URL navigation is well-documented but rarely implemented in consumer apps. The combination of `react-native-vision-camera` + raw data mode creates a unique technical moat.

2. **Spatial-first data model** — PostgreSQL + PostGIS with GEOGRAPHY type is not something most app competitors would invest in early. The "hunts near me" discovery feed, geofence verification at scan time, and bounding-box hunt search all benefit from spatial indexes that would be painful to retrofit.

3. **Anonymous-to-authenticated progression** — Firebase's `linkWithCredential()` preserves the user's UID and all associated data. This is technically elegant and directly supports the "Low Floor, High Ceiling" design principle from the brainstorming session.

4. **Cost efficiency** — At ~$32/month for full infrastructure, TaagBack can operate indefinitely in pre-revenue while iterating on product-market fit. The growth path to $124-186/month at 10K users maintains healthy unit economics.

**What could go wrong (and how to prevent it):**

- **The #1 risk is not shipping.** The in-memory `List<T>` storage must be replaced with PostgreSQL immediately — everything else depends on persistent data. The 5-sprint plan (10 weeks) is realistic but requires discipline: vertical slices, limited WIP, and no premature optimization.
- **The #2 risk is the solo developer bus factor.** Automated CI/CD, comprehensive tests, and documented architecture decisions in BMAD artifacts mitigate this significantly.
- **The #3 risk is App Store rejection.** Budget 1-2 weeks for the review cycle. Ensure QR codes don't bypass IAP, include a privacy policy, and test on physical devices.

### Next Steps

**Immediate actions (this week):**
1. Begin Sprint 1: EF Core + PostgreSQL migration (replace `List<T>` services)
2. Provision Azure PostgreSQL Flexible Server B1ms ($16/mo)
3. Set up GitHub Actions CI pipeline for `server/`

**Before Sprint 2:**
4. Create Firebase project and configure anonymous auth
5. Switch from Expo Go to Development Build (needed for camera/QR scanning)

**Deep-dive research to schedule:**
- Offline-first architecture (queued scan claims, conflict resolution)
- Leaderboard real-time system (Redis ZSET + SSE)
- Hunt discovery algorithm (spatial ranking)
- QR code generation pipeline (token generation, branded rendering)

---

**Technical Research Completion Date:** 2026-03-10
**Research Period:** Comprehensive technical analysis across 6 structured research steps
**Source Verification:** All technical facts cited with current (2026) sources
**Technical Confidence Level:** High — based on multiple authoritative sources per decision
**Input Documents:** Brainstorming session (76 ideas), market research (competitive analysis), domain research (6 domains)

_This technical research document serves as the authoritative architecture reference for TaagBack's MVP development. It provides specific, opinionated decisions — not a menu of options — grounded in current web-verified data and aligned with TaagBack's three MVP pillars: Hunt Builder, Taag Leaderboard/Databank, and Re-scan Retention._
