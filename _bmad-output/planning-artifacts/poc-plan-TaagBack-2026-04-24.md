---
date: 2026-04-24
author: Christopher Gordon (CEO) / Noah Porch (CTPO)
status: Draft for member review
relatedDocuments:
  - '_bmad-output/planning-artifacts/product-brief-TaagBack-2026-03-10.md'
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/epics.md'
  - '_bmad-output/planning-artifacts/architecture.md'
---

# Proof of Concept Plan — TaagBack

## 1. Purpose

Before committing to Epic 1 Sprint 1 of the MVP, build a narrowly scoped proof of concept that validates the riskiest technical assumptions end-to-end: build pipeline, device capabilities, scan capture, server ingest, and push. The POC is throwaway learning code — it is NOT the MVP foundation. The output is a validated stack, a documented set of library choices, and a go/no-go signal for Epic 1.

## 2. POC Objectives

The POC succeeds when all four capability areas from the scoping notes are demonstrated end-to-end on both iOS and Android:

1. **Boilerplate React Native codebase that builds and deploys for Android and iOS.**
2. **Device capabilities — GPS (fine location), camera (third-party library), and network connectivity.**
3. **Core scan pipeline — take a photo, scan a QR code, extract EXIF, send payload to server.**
4. **Push notifications — register token, receive push from server.**

## 3. What the POC Validates (and What It Doesn't)

| In Scope (validated by POC) | Out of Scope (deferred to MVP epics) |
|-----------------------------|--------------------------------------|
| Expo dev-build pipeline and EAS Build for iOS + Android | Firebase Auth integration beyond a stub user ID |
| QR code scanning at the decoder level (raw encoded data before URL resolution) — the strategic moat | Taag claiming, naming, three-tier attribution, re-scan maintenance |
| GPS fine-location permission flow + accuracy sampling | Geofence verification, impossible-travel detection |
| Photo capture + EXIF metadata extraction (GPS, timestamp, device, orientation) | Scan image triangulation, blob storage durability guarantees |
| Multipart upload of image + metadata + QR payload to backend | PostgreSQL + PostGIS persistence layer |
| Expo push token registration and server-triggered delivery | Notification types, opt-outs, copywriting |
| `.NET 10` minimal API endpoint accepting scan payload + issuing test push | Full data model, content moderation, COPPA age gate, safety/TOU gate |
| End-to-end demo recording on physical devices | UI polish, celebrations (pioneer fanfare, blackout crescendo), sound design |

## 4. Technical Stack (POC)

Aligned with the committed architecture so POC learnings transfer directly into Epic 1.

### 4.1 Mobile (React Native)
- **Framework:** Expo SDK (latest) with **custom dev client** — required for third-party native modules and device-hardware testing.
- **Build:** EAS Build (cloud) with `eas.json` profiles for `development`, `preview`, and iOS/Android simulator/device.
- **Camera + QR:** Run the **expo-camera spike** first (architecture doc §Spike Task). If `onBarcodeScanned` returns raw URL strings reliably on Android without auto-opening the browser → use `expo-camera`. If not → fall back to `react-native-vision-camera` with a frame-processor `onCodeScanned` handler. Either way, wrap behind a `ScannerService` abstraction so the choice is reversible.
- **Location:** `expo-location` with `Location.Accuracy.High` for fine location.
- **Photo + EXIF:** Capture still images via the selected camera library. Extract EXIF client-side with `piexifjs` (JPEG) or server-side with `MetadataExtractor` for robustness across HEIC (iOS) and JPEG (Android). POC will test both paths and pick one.
- **Networking:** `fetch` or `axios` for multipart POST; `@tanstack/react-query` optional — not required for POC.
- **Push:** `expo-notifications` with APNs (iOS) and FCM (Android) credentials configured via EAS.
- **Permissions:** Runtime permission flows for camera, location (fine), photo library (for EXIF test fixtures), and notifications.

### 4.2 Backend (.NET 10)
- **Framework:** .NET 10 minimal API (matches architecture commitment).
- **Endpoints for POC:**
  - `POST /api/poc/scan` — accepts `multipart/form-data` containing `photo` (file), `qrPayload` (string), `gps` (JSON), `exif` (JSON). Returns `{ scanId, receivedAt }`.
  - `POST /api/poc/push/register` — body `{ userId, expoPushToken, platform }`. Stores token in memory.
  - `POST /api/poc/push/test` — body `{ userId, title, body }`. Sends Expo push notification to the registered token.
- **Storage (POC only):** In-memory dictionary or local SQLite for scan records and push tokens. No PostgreSQL for the POC itself.
- **Image storage (POC only):** Local disk or a single Azure Blob container with public read disabled. Full scan-image architecture defers to Epic 7.

### 4.3 Developer Accounts & Credentials Required
- Apple Developer Program enrollment (required for physical iOS device testing and push) — ~$99/year.
- Google Play Console account (required for signed Android artifacts and FCM) — $25 one-time.
- Firebase project (for FCM server key) — free.
- Expo EAS account — free tier is sufficient for POC build volume.

## 5. POC Milestones

Six milestones, sequenced so failure at any gate halts the POC before further investment.

### Milestone 1 — Build Pipeline Validated
**Goal:** Prove we can build and deploy a minimal Expo app to iOS and Android physical devices.
**Activities:** Initialize Expo project; configure EAS Build profiles; generate iOS dev credentials and APNs key; generate Android keystore and FCM server key; produce one successful development build per platform; install on a test device for each OS.
**Acceptance:** Blank "Hello, TaagBack POC" screen runs on a physical iPhone and a physical Android device from an EAS-built artifact.
**Est. effort:** 2–3 days.

### Milestone 2 — Device Capability Spike
**Goal:** Prove each hardware capability the product depends on.
**Activities:** Implement runtime permission flows; display live GPS coordinates with accuracy; show camera preview full-screen; render a "network OK" indicator from a trivial backend health check.
**Acceptance:** A single POC screen shows live-updating GPS coordinates, an active camera preview, and a green network status pulled from `GET /api/poc/health`.
**Est. effort:** 2 days.

### Milestone 3 — QR Interception + Photo + EXIF
**Goal:** Prove the core product-critical capability: intercept a QR code's raw encoded content before URL resolution, capture a photo, and extract EXIF.
**Activities:** Run the expo-camera vs. vision-camera spike per architecture doc; select the winner; implement scan handler that returns raw decoded string; capture still photo on scan; extract EXIF (GPS, timestamp, orientation, device model); display captured data on-screen.
**Acceptance:** Scanning a test QR code displays the raw encoded string (no browser auto-launch), captures a photo, and shows extracted EXIF fields on screen on both iOS and Android.
**Est. effort:** 3–4 days.

### Milestone 4 — Backend Ingest
**Goal:** Prove end-to-end payload delivery from device to server.
**Activities:** Stand up .NET 10 minimal API with `/api/poc/scan` endpoint; accept multipart payload; persist metadata in memory and image to disk; return scan ID; wire the mobile app to POST after a successful scan.
**Acceptance:** A scan from the device results in a stored image, stored metadata (QR payload, GPS, EXIF), and a 200 response with a `scanId` round-tripped back into the app.
**Est. effort:** 2 days.

### Milestone 5 — Push Notifications
**Goal:** Prove server → device push delivery on both platforms.
**Activities:** Register Expo push token on app launch; POST to `/api/poc/push/register`; trigger `/api/poc/push/test` via curl/Postman; verify delivery to foreground, background, and terminated app states on iOS and Android.
**Acceptance:** A curl to `/api/poc/push/test` produces a visible push notification on both target devices within 5 seconds.
**Est. effort:** 2 days.

### Milestone 6 — End-to-End Demo
**Goal:** Sequence the prior five milestones into the signature flow the product will build on.
**Activities:** User opens app → grants permissions → scans a QR code → captures photo → POSTs image + EXIF + GPS + QR payload to server → server responds with scan ID → server fires a push notification ("Scan received: [Taag name stub]") back to the device.
**Acceptance:** Full flow runs on both iOS and Android in one demo session without restarting the app. Demo video recorded. Brief retrospective doc authored capturing library choices, defects, and recommendations for Epic 1.
**Est. effort:** 1–2 days.

## 6. Timeline

Solo-developer effort (Noah Porch / CTPO), targeting a ~2-week POC window:

| Week | Focus | Milestones |
|------|-------|------------|
| Week 1 | Build pipeline and device capabilities | M1, M2 |
| Week 2 | Scan pipeline, backend, push, demo | M3, M4, M5, M6 |

Total estimate: 10–12 working days including buffer. Any slip on M1 (build pipeline) or M3 (QR interception) triggers an immediate mid-POC checkpoint — these are the two "real risk" milestones.

## 7. Go / No-Go Criteria for Epic 1

The POC is a decision gate, not a deliverable. Exit criteria:

| Outcome | Meaning | Action |
|---------|---------|--------|
| All 6 milestones passed | Stack validated end-to-end on both platforms | **GO** — start Epic 1 Sprint 1 with the POC's library selections and EAS/credential setup carried forward. |
| M3 fails (neither expo-camera nor vision-camera returns raw QR data reliably) | Core product moat is at risk | **HOLD** — scope a contained native-module spike before Epic 1. |
| M5 fails (push delivery unreliable across states) | Territory Defense epic (Epic 3) at risk | **HOLD** — investigate provider or configuration fix before committing Epic 3 timeline. |
| Any other milestone fails | Library or credential issue | **REPLAN** — resolve before Sprint 1 kickoff; do not start Epic 1 on a broken foundation. |

## 8. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Apple Developer enrollment lag (days) blocks iOS builds | Medium | Blocks M1 on iOS | Start enrollment Day 1 in parallel with Android work. |
| `expo-camera` does not return raw QR data on some Android OEMs | Medium | Forces fallback to `react-native-vision-camera` | Spike on multiple Android devices (architecture doc §Spike Task); `ScannerService` abstraction keeps the switch cheap. |
| EXIF extraction differs between iOS HEIC and Android JPEG | Medium | Data gaps in the strategic data asset | Test both client-side and server-side extraction; prefer the server path for consistency. |
| APNs/FCM credential setup blockers | Medium | Blocks M5 | Allocate half-day for credential setup before coding push. |
| Single-maintainer risk on `react-native-vision-camera` | Low (during POC) | High (for MVP) | Architecture-level mitigation already in place: `ScannerService` abstraction + pinned version. POC simply flags this in the retrospective. |
| Scope creep into MVP features during POC | Medium | Timeline slip | Enforce out-of-scope list in §3 at each milestone review. |

## 9. Deliverables

At POC close the following are handed off to the Epic 1 Sprint 1 plan:

1. **POC mobile repository** — buildable Expo project with dev-build profiles, library choices baked in, and permission flows wired. Labeled as throwaway code; reference only.
2. **POC backend repository** — .NET 10 minimal API with the three POC endpoints. Also reference only.
3. **Credentials and accounts** — Apple Developer account, Google Play Console, Firebase project, EAS project, APNs key, FCM server key — all live and transferable into the Epic 1 project.
4. **Library selection memo** — documented choice between `expo-camera` and `react-native-vision-camera` with evidence from the spike.
5. **EXIF extraction path memo** — client-side vs. server-side decision with rationale.
6. **Demo recording** — 2–3 minute screen-capture of the end-to-end flow on both platforms.
7. **Retrospective doc** — defects encountered, open issues, and explicit recommendations to be applied in Epic 1 Sprint 1.

## 10. Out of Scope (Explicit)

The POC is deliberately narrow. The following are NOT part of this plan and must not leak in:

- Full authentication, account creation ceremony, or any COPPA/VPC flows
- Taag data model, pioneer/controller attribution, claim expiration
- Hunt builder, hunt play, blackout crescendo, or any celebration animation work
- Leaderboards, watchlists, player profiles
- Content moderation (automated or admin queue)
- Content safety reminders or TOU gate
- Any Phase 2 feature (Clone Taag system, AI naming, enrichment, vision analysis)
- Production-grade observability, CI test suites, or infra hardening

## 11. Budget

Within the Phase 1 operating budget approved at the April 24, 2026 Special Meeting of Members:

| Item | Cost | Notes |
|------|------|-------|
| Apple Developer Program | $99/year | Required for iOS device testing and TestFlight. |
| Google Play Console | $25 one-time | Required for signed Android builds. |
| EAS Build (free tier) | $0 | Sufficient for POC build volume. |
| Azure Blob / Firebase (free tiers) | $0 | POC scale is negligible. |
| Developer time (Noah Porch) | Founder time | No cash compensation in Phase 1. |

Total incremental cash outlay for POC: **~$124 one-time + $99/year**, well inside the $100/month operating budget and the $500 single-expense threshold approved at the meeting.

## 12. Next Steps

1. CTPO to confirm POC start date and 2-week window.
2. Begin Apple Developer and Google Play Console enrollments same-day.
3. CEO to approve the POC plan (a simple email acknowledgment is sufficient — this fits under existing Phase 1 authority).
4. On POC close, surface the go/no-go result and retrospective in the next members check-in, and fold approved decisions into the Epic 1 Sprint 1 plan.
