---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
inputDocuments:
  - '_bmad-output/planning-artifacts/product-brief-TaagBack-2026-03-10.md'
  - '_bmad-output/planning-artifacts/research/market-taagback-qr-platform-research-2026-03-09.md'
  - '_bmad-output/planning-artifacts/research/domain-taagback-qr-overlay-platform-research-2026-03-09.md'
  - '_bmad-output/planning-artifacts/research/technical-taagback-mvp-architecture-research-2026-03-09.md'
  - '_bmad-output/brainstorming/brainstorming-session-2026-03-09-001.md'
documentCounts:
  briefs: 1
  research: 3
  brainstorming: 1
  projectDocs: 0
classification:
  projectType: 'Mobile App (+ API Backend)'
  domain: 'Location-Based Entertainment / Gamification'
  complexity: 'medium'
  projectContext: 'greenfield'
workflowType: 'prd'
workflow_completed: true
---

# Product Requirements Document - TaagBack

**Author:** Noah.Porch
**Date:** 2026-03-10

## Executive Summary

TaagBack is a mobile-first platform that overlays a hidden game layer onto the world's existing QR code infrastructure. Using the TaagBack native app as a "magic lens," users scan any real-world QR code to discover, claim, name, and collect digital markers called "Taags" — competing on leaderboards, maintaining territory through monthly re-scans, and progressing through creator-built scavenger hunts. The platform targets three primary user archetypes: Adventurers (competitive seekers who climb leaderboards and defend territory), Wanderers (casual discoverers who encounter TaagBack through serendipitous QR scans), and Creators (players who graduate into building scavenger hunt experiences for others).

TaagBack addresses a gap at the intersection of location-based entertainment and existing physical infrastructure. Billions of QR codes are deployed globally — on storefronts, transit stops, event booths, product packaging — yet every one is a static, one-dimensional link. Meanwhile, real-world interactive experiences (geocaching, location-based games) require deploying custom infrastructure at significant cost. No platform treats the world's existing QR codes as a ready-made interactive canvas. TaagBack enters a validated white space in the $6.18B location-based entertainment market with zero direct competitors offering QR-code-overlay scavenger hunts with a creator economy model.

The MVP rests on three self-reinforcing pillars: a **Hunt Builder** for sequencing real-world QR codes into clue-driven scavenger hunts, a **Taag Leaderboard & Databank** for competitive sourcing and claiming, and a **Re-scan Retention Mechanic** that drives recurring physical-world engagement. These three pillars form a flywheel — discovery feeds creation, creation feeds play, play feeds discovery — and every interaction quietly builds TaagBack's most valuable strategic asset: a crowdsourced global QR code registry.

### What Makes This Special

**The QR Overlay Model.** TaagBack is the only platform that repurposes existing real-world QR codes rather than generating new ones. Every competitor — QR code platforms (QR Tiger, Uniqode), scavenger hunt apps (GooseChase, Scavify), and location-based games (Niantic/Scopely) — either generates new codes, deploys custom infrastructure, or requires dedicated physical placement. TaagBack treats the billions of already-deployed codes as a pre-built game board with zero infrastructure cost.

**The Native App as Competitive Moat.** TaagBack intercepts QR codes at the decoder level, reading raw encoded data before URL resolution. This technical requirement is the moat — competitors cannot replicate the overlay without controlling the scan. The same physical code reveals two different realities depending on whether you scan with a standard camera or with TaagBack.

**The Hidden Data Asset.** Users play a game; TaagBack builds the world's most comprehensive registry of physical QR code deployments. Every scan contributes location, URL metadata, business type, and scan patterns to a crowdsourced database with commercial intelligence value for retail analytics, city planners, and marketing agencies.

**Self-Healing Database.** The monthly re-scan maintenance mechanic simultaneously drives retention and data quality. Unclaimed Taags expire naturally, pruning dead entries without manual intervention — a structural advantage over platforms like Niantic's Wayfarer where nomination review backlogs are a documented community problem.

## Project Classification

| Dimension | Value |
|-----------|-------|
| **Project Type** | Mobile App (React Native / Expo) + API Backend (.NET 10) |
| **Domain** | Location-Based Entertainment / Gamification |
| **Complexity** | Medium — COPPA compliance (April 2026 deadline), 20-state location data privacy landscape, content moderation for UGC, location-based liability (Niantic legal precedent). Proven technology stack, well-documented regulatory paths. |
| **Project Context** | Greenfield — building on existing boilerplate scaffolding (.NET 10 API + React Native Expo) |

## Success Criteria

### User Success

**The Core Loop Works (Pillar Validation):**
- Users scan, claim, name, and return to re-scan without external prompting. The endowment effect ("this is MY Taag") and loss aversion (monthly maintenance) drive organic return behavior.
- Players who complete their first scan return for a second session — zero single-session churn is the minimum bar.
- Hunt completion rate >50% — indicates hunts are engaging, well-paced, and clues are solvable.

**The Flywheel Spins:**
- Player-to-Creator conversion >1% within 60 days of first hunt completion. At 1%, 1,000 active players produce 10+ hunts. Below 1% means creation tools have too much friction or the inspiration moment is not landing.
- Hunts get created AND completed — both sides of the creator/player equation function without platform intervention.

**Emotional Success Moments (Protect the Magic):**
- First scan triggers pioneer celebration — user feels ownership and delight, not onboarding friction.
- "Darn" moment for already-claimed Taags softened by collection addition — loss is theatrical, not punishing.
- Blackout crescendo on hunt completion delivers the signature "movie moment."
- No progress counter during active hunts — uncertainty IS the excitement.

### Business Success

| Timeframe | Success Criteria |
|-----------|-----------------|
| **Month 1-3** | Core loop proven: users scan, claim, return to re-scan. Hunts created and completed. No revenue focus. Databank growing week over week. |
| **Month 4-6** | Flywheel validated: new Taags feed hunt creation, hunts attract new players, players source more Taags. Organic growth without paid acquisition. |
| **Month 7-12** | Sustained engagement: returning users outnumber churned users each month. Creator community emerges organically. Databank grows consistently. Begin evaluating monetization readiness. |

**Go/No-Go Gate:** Positive month-over-month growth in MAU and Taags sourced for 3 consecutive months.

**North Star Metric:** Steady MoM growth in Monthly Active Scanners (users who scan at least 1 QR code per month).

### Technical Success

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Scan endpoint response** | <500ms p95 | Core interaction — scan must feel instant. |
| **QR decode to result** | <2s end-to-end | Camera frame through API response to UI update. |
| **API availability** | 99.5% uptime | Outdoor activity depends on connectivity. |
| **GPS geofence accuracy** | 50m default radius | Balances anti-spoofing with real-world GPS drift. Configurable per stop. |
| **Duplicate detection** | >95% catch rate | Mass-produced codes must be identified before polluting the databank. |
| **MVP infrastructure cost** | <$80/month | Validated $13-80/month. $0 with Microsoft for Startups credits. |

### Measurable Outcomes

| Metric | Target | Signal |
|--------|--------|--------|
| Monthly Active Scanners | Steady MoM increase | Platform health |
| Taags Sourced (cumulative) | Growing week over week | Databank value accruing |
| Re-scan Retention Rate | >40% | Retention mechanic works |
| Hunt Completion Rate | >50% | Hunt quality and pacing |
| Player-to-Creator Conversion | >1% within 60 days | Flywheel self-sustaining |
| Month-1 Retention | Positive trend | Users return without prompting |
| Taag Contestation Rate | >0% (healthy churn) | The game is alive |
| Geographic Spread | Growing distinct neighborhoods/cities | Not concentrated in one area |

## User Journeys

### Journey 1: The Wanderer's First Discovery (Primary User - Success Path)

**Mia, 14, High Schooler** — Walking past a coffee shop after school, she notices a QR code on the window. She's already installed TaagBack after a friend shared a hunt completion screenshot on Instagram.

**Opening Scene:** Mia opens TaagBack for the first time. A quick, playful registration flow greets her — this is the app's first signature UX moment. She creates her account in seconds, picking a display name and confirming her age. The app celebrates her arrival before she's even scanned anything. Now she points her camera at the coffee shop QR code. She has no expectations — just curiosity.

**Rising Action:** The screen erupts. Confetti, fanfare, a celebratory animation. "You're the FIRST person to bring this Taag into TaagBack!" Mia just became a Pioneer. The app prompts her to name her Taag — AI suggests "Java Junction" based on GPS context. She picks it. The app explains: re-scan this code once a month to keep your name on it. She feels ownership — this is HER Taag now.

**Climax:** Walking home, she scans two more codes — a transit stop poster and a restaurant menu. One is unclaimed (another celebration!). One is already claimed by someone called "DowntownDave" — the screen shows a playful "darn!" animation, but still adds it to her collection. She watchlists it. She'll get it when Dave forgets to re-scan.

**Resolution:** Mia has 3 Taags in her collection, 2 she pioneered and named. She's #1 on her neighborhood leaderboard (nobody else is playing yet — she IS the leaderboard). She shares a screenshot. Three friends download the app that night.

**Capabilities Revealed:** Account registration as signature UX moment, QR scanning and interception, pioneer celebration, AI-assisted naming, content moderation, re-scan explanation, collection tracking, already-claimed experience, watchlist, leaderboards, social sharing moments.

### Journey 2: The Adventurer's Hunt Experience (Primary User - Full Loop)

**Jake, 22, College Student** — Discovers a hunt while scanning Taags on campus. He's been sourcing aggressively for two weeks and has 47 Taags.

**Opening Scene:** Jake scans a Taag near the library. The Taag card loads — but this time there's something extra: "This Taag is part of an active hunt: Campus Cryptic. Want to join?" He taps in.

**Rising Action:** A safety reminder appears — TaagBack's contextual TOU gate. He accepts. The first clue appears: "Where knowledge sleeps in rows but never rests." No progress counter — he doesn't know if this hunt has 3 stops or 30. He solves the clue (the library stacks), finds the next QR code on a study carrel, scans it. Reward animation. Next clue. He's hooked — clue, think, walk, scan, reward, next.

**Climax:** After the 7th scan, the screen goes black. A pause. Then a celebratory fanfare fades in and CRESCENDOS with confetti, music, fireworks. The blackout crescendo — TaagBack's signature moment. Then the creator's personal message: "Congrats! You just completed my favorite route through campus. - Sarah_Creates"

**Resolution:** Jake sees his completion stats and the hunt leaderboard — he's 3rd fastest. He starts planning his own hunt using Taags he's already sourced. Player becomes Creator.

**Capabilities Revealed:** Hunt discovery through Taag scans, safety/TOU gate, clue sequencing, no-progress-counter design, hunt completion celebration, creator completion message, hunt leaderboards, player-to-creator pipeline.

### Journey 3: The Creator Builds a Hunt (Primary User - Creation Path)

**Sarah, 35, Teacher** — Completed 4 hunts as a player. Wants to build a downtown walking tour for her students using QR codes she's already sourced.

**Opening Scene:** Sarah taps "Create Hunt" in the app. She enters "Downtown History Walk" as the title and a brief description. The hunt enters draft state.

**Rising Action — Field Mode:** Walking downtown, Sarah opens her draft. She scans a Taag on the old post office — adds it as Stop 1, writes a clue: "Where stamps traveled before email existed." She walks to the next location, scans, adds Stop 2 with another clue. She builds the hunt in-field, experiencing the player's future journey as she creates it.

**Rising Action — Couch Mode:** That evening, Sarah opens the map-based builder. She sees all sourced Taags in the area displayed on a map. She adds two more stops she missed earlier by tapping Taags on the map and writing clues from home. She reorders the sequence for better flow.

**Climax:** Sarah writes her completion message: "You just walked through 200 years of our town's history. Show me your completion screen for extra credit! - Ms. Sarah." She publishes the hunt. TaagBack generates a deep link she texts to her class group chat.

**Resolution:** 18 students complete the hunt over the weekend. Sarah checks creator stats — 82% completion rate, average time 45 minutes. Two students are now building their own hunts.

**Capabilities Revealed:** Hunt creation (draft-as-you-go), hunt creation (map-based builder), clue writing, stop sequencing and reordering, creator completion message, deep link sharing, creator stats and analytics.

### Journey 4: The Contested Taag (Edge Case - Retention Mechanic)

**Dave, 28** — Claimed "Lucky's Corner" three months ago. He's been re-scanning monthly to maintain it. This month, he forgot.

**Opening Scene:** Dave gets a push notification: "Your Taag 'Lucky's Corner' claim has expired. Someone else can claim it now."

**Rising Action:** Meanwhile, Mia has had "Lucky's Corner" on her watchlist since Day 1. She gets a notification: "A Taag on your watchlist is now uncontested: Lucky's Corner." She rushes to the coffee shop after school.

**Climax:** Mia scans the code. New claim celebration! She renames it "Mia's Mocha Spot." Dave's Original Discoverer credit remains permanent — but the Current Controller and Custom Name are now Mia's.

**Resolution:** Dave sees the notification that his Taag changed hands. He resolves to never miss a re-scan again. The three-tier attribution (Original Discoverer: Dave, Current Controller: Mia, Custom Name: Mia's Mocha Spot) preserves both players' contributions.

**Capabilities Revealed:** Claim expiration, push notifications (expiry + watchlist), re-claim flow, three-tier attribution, watchlist alerts, retention mechanic enforcement.

### Journey 5: Platform Moderation (Admin/Operations)

**Platform Admin** — Receives a community report that a Taag has been given an offensive custom name.

**Opening Scene:** The community reporting system flags a Taag name. The automated content moderation filter (OpenAI Moderation API) missed it because the name used creative spelling to bypass the filter.

**Rising Action:** Admin reviews the report in the moderation queue. Sees the Taag name, the reporter's note, and the Taag's scan history. Admin determines the name violates community guidelines.

**Climax:** Admin resets the Taag's custom name to a system-generated default. The offending user receives a warning. Repeated violations escalate to account restrictions.

**Resolution:** The Taag is restored to a clean state. The reporter receives confirmation that action was taken. The bypass pattern is logged for filter improvement.

**Capabilities Revealed:** Community reporting system, moderation queue, admin review tools, content policy enforcement, user warnings and escalation, filter improvement feedback loop.

### Journey Requirements Summary

| Journey | Key Capabilities Revealed |
|---------|--------------------------|
| Wanderer's First Discovery | QR scanning, pioneer system, AI naming, content moderation, collection tracking, watchlist, leaderboards |
| Adventurer's Hunt | Hunt discovery via Taag scan, safety gate, clue progression, blackout crescendo, creator message, hunt leaderboards |
| Creator Builds a Hunt | Dual creation modes (field + couch), clue writing, stop sequencing, deep link sharing, creator stats |
| Contested Taag | Claim expiration, push notifications, re-claim flow, three-tier attribution, watchlist alerts |
| Platform Moderation | Community reporting, moderation queue, admin tools, content enforcement, user escalation |

## Domain-Specific Requirements

### Compliance & Regulatory

**COPPA (Children's Online Privacy Protection Act):**
- Age gate at account creation using self-reported date of birth. Under-13 users require Verifiable Parental Consent (VPC) before GPS collection, account creation, or Taag naming. Compliance deadline: April 22, 2026.
- Written information security program documenting data handling for minors.
- Separate, additional parental consent before disclosing child data to third parties (analytics, AI services).
- Google Play Age Signals API (beta) and Apple Declared Age Range API available for platform-level age verification.

**Location Data Privacy (20 US States + GDPR):**
- Explicit opt-in consent before GPS collection. Collect only precision necessary — city-block level for Taag placement, not apartment-level.
- Honor Global Privacy Control (GPC) signals — mandatory in 12+ states by 2026.
- Never sell or share raw location data with third parties. Implement data retention limits.
- Support consumer rights: access, delete, opt-out requests within 45 days.
- Oregon (2026): cease all sales of geolocation data. California: prohibit geofencing around healthcare facilities.
- GDPR (if serving EU users): explicit informed consent, purpose limitation, data minimization, right to erasure.

**Content Moderation:**
- Automated text moderation on all UGC (Taag names, clue text, hunt descriptions, completion messages) using an automated text moderation service.
- Community reporting system with flag/report on any Taag or hunt.
- Playful rejection of inappropriate content ("Nice try! How about something your grandma would approve of?").
- Content moderation review queue for escalated reports.
- Take It Down Act compliance: establish removal process for flagged content.

### Location-Based Liability (Niantic Precedent)

- Comprehensive TOS with liability waiver, assumption of risk, and arbitration clause.
- Property owner opt-out mechanism — ability to request Taag removal within defined radius (Niantic settled on 40m).
- Contextual safety reminders displayed before any activity involving physical travel to locations.
- Community reporting for problematic hunt routes or dangerous locations.
- Hunt creation safety guidelines and route review recommendations.

### Risk Mitigations

| Risk | Mitigation |
|------|-----------|
| COPPA violation | Age gate at account creation on first launch. VPC flow for under-13. |
| Location data breach | Encrypt at rest and in transit. Collect minimum precision. No raw location sharing. Retention limits. |
| Offensive UGC | Automated moderation + community reporting + admin escalation. Playful rejection tone. |
| Location liability | TOS + safety reminders + property owner opt-out + community reporting. Structural advantage: TaagBack doesn't place objects on private property. |
| GPS spoofing | QR scan requirement is natural anti-spoofing layer. Tier 1 detection: impossible travel, location drift, spoofing app detection. |

## Innovation & Novel Patterns

### Detected Innovation Areas

**QR Code Overlay / Repurposing Model (Primary Innovation):**
TaagBack's core premise — treating the world's existing QR codes as a pre-built game board — has zero direct competitors. Market research across QR platforms, scavenger hunt apps, location-based games, and crowdsourced data platforms confirmed no existing product combines QR-code overlay, scavenger hunts, and a creator economy model. This occupies the "Fourth Quadrant" at the intersection of Gamification + Existing Infrastructure.

**The Crowdsourced Data Flywheel:**
Users play a game; TaagBack builds a commercial intelligence asset. The three MVP pillars (Hunt Builder, Taag Databank, Re-scan Retention) create a self-reinforcing flywheel where each pillar feeds the others. The re-scan maintenance mechanic simultaneously drives user retention AND data quality — a dual-purpose game mechanic with no equivalent in competing platforms.

**Instant-On Crowdsourcing:**
Niantic's Wayfarer requires nomination, community review, and approval (days to weeks). TaagBack's model is instant — scan a QR code and it exists in the system immediately. Automated validation (duplicate detection, location drift, URL parsing) replaces human review. This eliminates the bottleneck that limits Wayfarer's growth.

### Validation Approach

- **Core loop validation (Month 1-3):** Do users scan, claim, name, and return to re-scan without prompting? This validates the overlay model works as a game.
- **Flywheel validation (Month 4-6):** Do new Taags feed hunt creation, and do hunts attract new players? This validates the three pillars reinforce each other.
- **Data asset validation (Month 7-12):** Is the Taag databank growing consistently with geographic spread? This validates the hidden commercial asset thesis.
- **Go/No-Go gate:** 3 consecutive months of positive MoM growth in MAU + Taags sourced.

### Risk Mitigation

| Innovation Risk | Fallback |
|----------------|----------|
| Users don't see value in scanning existing QR codes | Focus on hunt experience (proven scavenger hunt model). Overlay collection becomes secondary. |
| Insufficient QR code density in target launch area | Launch in QR-dense environments (university campuses, downtown commercial districts). |
| Re-scan mechanic feels like a chore, not a game | Adjust maintenance period (monthly may be too frequent). Add re-scan rewards and streaks. |
| Creator tools have insufficient adoption | Implement passive hunt creation from scan patterns. Lower the creation barrier to near-zero. |

## Mobile App Specific Requirements

### Platform Requirements

- **iOS:** iOS 16+ (required for VisionKit QR scanning capabilities). iPhone only for MVP.
- **Android:** Android 8.0+ (API level 26) with Google Play Services (required for MLKit QR scanning).
- **Cross-platform:** React Native 0.83 / Expo SDK 55. New Architecture mandatory (Fabric renderer, TurboModules, JSI).
- **No web support for MVP.** PWA planned as post-MVP entry point for lower-friction discovery.

### Device Permissions

| Permission | Purpose | When Requested |
|-----------|---------|---------------|
| **Camera** | QR code scanning via react-native-vision-camera | On first scan attempt (just-in-time) |
| **Location (When In Use)** | GPS for Taag placement and geofence verification | On first scan attempt (just-in-time) |
| **Push Notifications** | Watchlist alerts, claim expiry, hunt invitations | After first meaningful interaction (not on install) |

### Offline Mode

- Queue scan claims offline with timestamps. Sync when connectivity returns. Idempotency tokens prevent double-claims on retry. Queued scans drain at 1 per 2 seconds when connectivity resumes to stay within rate limits.
- Hunt clue data is pre-cached on-device when a player joins a hunt for fast display, but hunt progression requires connectivity (server-side validation). Queued offline scans that match hunt stops advance progression when they sync.
- Leaderboards and collection data use stale-while-revalidate pattern. Acceptable staleness: 5 minutes.

### App Store Compliance

- Apple App Store: Required privacy nutrition labels for camera, location, and push notification usage. Apple Sign-In mandatory if offering any social login.
- Google Play Store: Data safety section. Target API level compliance. Play Integrity API for device attestation.

### Push Notification Strategy

- **MVP:** Managed push notification service. Backend stores push tokens per user.
- **Triggers:** Watchlist Taag becomes uncontested, claimed Taag expired, hunt invitation via deep link, community report action taken.
- **Design principle:** Notifications must feel valuable, not spammy. Each notification type has independent opt-out. Default to conservative — fewer notifications is better.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP — the smallest feature set that delivers the signature TaagBack experience (scan, claim, name, hunt, compete). The goal is to prove the core loop works and the flywheel spins, not to ship a feature-complete platform.

**Resource Context:** Solo developer with .NET + React Native expertise. Existing boilerplate scaffolding. Microsoft for Startups credits available for infrastructure.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:** Wanderer's First Discovery, Adventurer's Hunt Experience, Creator Builds a Hunt, Contested Taag.

**Pillar 1 — Taag Sourcing & Collection:**
- QR code scanning via native app (raw encoded data interception)
- Taag sourcing — any real-world QR code becomes a Taag
- Pioneer system with permanent Original Discoverer credit
- Custom naming with content moderation
- Three-tier attribution (Original Discoverer, Current Controller, Custom Name)
- Collection tracking — every scan adds to personal collection
- Basic Taag profile cards

**Pillar 2 — Hunt Builder & Play:**
- Hunt creation: draft-as-you-go (in-field) AND map-based builder (from couch)
- Clue sequencing and progression
- Hunt completion with blackout crescendo celebration
- Creator's custom completion message
- Deep link sharing for hunts
- Hunt discovery through organic Taag scans

**Pillar 3 — Retention & Competition:**
- Monthly re-scan to maintain Taag claims
- Watchlist for contested Taags with notifications
- Leaderboards: sourcing, scanning, hunt completion
- Basic player profiles with stats

**Supporting:**
- Safety reminders and contextual TOU gate
- Community reporting system
- User authentication: account required on first launch
- Age gate at account creation (COPPA)

### Post-MVP Features (Phase 2)

- Taag profile enrichment from external sources — reverse geocoding, nearby points of interest (FR54)
- Vision analysis on scan images — business type extraction, name suggestions, Taag personality graphic (FR55, Phase 2/3)
- Gen AI Taag name suggestions and clue assistant
- Auto-categorization of Taag types from URL analysis
- Category-based badges and titles
- Ghost Taag special visual treatment
- Location drift detection and duplicate code detection hardening
- Taag expiration for unscanned codes
- Hunt reviews and ratings
- Local activity feed
- Social sharing at peak moments
- QR encoded URL background analytics
- PWA web entry point
- Photo Finish (completion photos/videos at hunt end)
- Highlight Stops (creator-designated special stops with enhanced celebrations)
- Celebration Progression (evolving celebration complexity based on user achievements)

### Vision Features (Phase 3)

- Auto-generated / AI-assembled experiences
- Challenge Gyms (PvP territory at designated locations)
- Capture the Flag mode
- Taag enrichment with photos/video at sourcing
- Passive hunt creation from scan pattern detection
- Cosmetic marketplace
- Sponsored Taags
- Business/Organization tier (B2B)
- Freemium creator tools (premium tier)
- Data insights monetization (anonymized, aggregated, with legal framework)
- Pioneer Events for geographic expansion
- Context-aware dynamic QR content
- Travel-Aware Claiming (adjusting claim mechanics based on geographic distance)

### Risk Mitigation Strategy

**Technical Risk:** The critical path is migrating from in-memory storage to a persistent database. All other features depend on persistent storage. Mitigate by prioritizing database migration in Sprint 1. Stack is validated — no novel technology risk.

**Market Risk:** Cold start problem — the platform needs Taags to have value, but needs players to create Taags. Mitigate with focused geographic launch (2-3 QR-dense areas: university campuses, downtown districts) and Pioneer Event gamification for early adopters.

**Resource Risk:** Solo developer. Mitigate by keeping MVP scope tight (three pillars only), leveraging managed services, and deferring Redis, AI features, and real-time until Phase 2.

## Functional Requirements

### QR Scanning & Taag Management

- FR1: Users can scan any real-world QR code using the in-app camera to source it as a Taag.
- FR2: The system can extract raw encoded data from a QR code before URL resolution.
- FR3: The system can create a unique Taag record from a QR code's encoded data and GPS coordinates.
- FR4: Users can view a Taag's profile card showing its name, Original Discoverer, Current Controller, and scan metadata.
- FR5: Users can claim an unclaimed Taag by being the first authenticated user to scan it.
- FR6: Users can assign a custom name to a Taag they control, subject to content moderation. Account required.
- FR7: The system can suggest contextual Taag names based on GPS location data (Phase 2 — Gen AI).
- FR8: The system can maintain three-tier attribution for each Taag: Original Discoverer (permanent), Current Controller (maintainable), Custom Name (set by controller).

### Collection & Discovery

- FR9: Users can view their personal Taag collection — every Taag they have ever scanned.
- FR10: Users can add any claimed Taag to a personal watchlist.
- FR11: Users can receive notifications when a watchlisted Taag becomes uncontested.
- FR12: Users can view leaderboards ranked by Taags sourced, total scans, and hunts completed.
- FR13: Users can view a basic player profile with their stats and collection summary.

### Claim Maintenance & Contestation

- FR14: The system can expire a Taag claim if the controller does not re-scan within the maintenance period (30 days).
- FR15: Users can re-scan a Taag they control to renew their claim for another maintenance period.
- FR16: Users can claim a previously claimed Taag after its prior claim has expired.
- FR17: The system can notify the previous controller when their claim expires.
- FR18: The system can notify watchlist subscribers when a Taag becomes uncontested.
- FR19: The system can send a pre-expiration warning notification when a user's Taag claim is within 1 day of the 30-day maintenance deadline.

### Hunt Creation & Management

- FR20: Users can create a new hunt with a title and description.
- FR21: Users can add Taags to a hunt as sequenced stops with clue text (draft-as-you-go mode).
- FR22: Users can add Taags to a hunt from a map view showing all sourced Taags in an area (map-based builder mode).
- FR23: Users can reorder stops within a hunt.
- FR24: Users can write a custom completion message displayed when a player finishes the hunt.
- FR25: Users can optionally add a hint to any hunt stop to assist players who are stuck.
- FR26: Users can publish a draft hunt to make it playable.
- FR27: The system can generate a shareable deep link for a published hunt. Where feasible, deep link context should survive app installation for users who don't yet have the app.

### Hunt Play & Progression

- FR28: Users can discover hunts by scanning a Taag that is part of an active hunt.
- FR29: Users can accept a hunt invitation and begin the clue sequence.
- FR30: The system can present clues sequentially — revealing the next clue only after the current stop is scanned.
- FR31: The system can offer a hint to players after 3 unsuccessful scan attempts at a stop, but only if the hunt creator provided a hint for that stop.
- FR32: The system can verify a scan against the expected stop using QR token matching and geofence verification.
- FR33: The system can display the blackout crescendo celebration upon hunt completion.
- FR34: The system can display the creator's custom completion message after the celebration.
- FR35: Users can view their hunt completion stats and rank on the hunt leaderboard.

### Safety, Moderation & Reporting

- FR36: The system can display a safety reminder and TOU acceptance gate before a user's first hunt.
- FR37: The system can filter user-submitted text (Taag names, clues, descriptions, completion messages) through automated content moderation.
- FR38: Users can report any Taag or hunt for community guideline violations.
- FR39: Admins can review reported content in a moderation queue.
- FR40: Admins can reset a Taag's custom name, issue user warnings, or restrict accounts.
- FR41: The system can reject inappropriate custom names with a playful, non-punitive message.

### Authentication & User Management

- FR42: Users can create an account on first app launch to access all platform features (scanning, claiming, naming, hunt creation, leaderboards).
- FR43: The system can require account creation on first app launch before allowing any platform interaction.
- FR44: The system can require age verification at account creation and enforce COPPA-compliant flows for users under 13.
- FR45: Users can authenticate via email/password or social login (Google Sign-In, Apple Sign-In).

### Data Integrity & Anti-Fraud

- FR46: The system can detect and invalidate duplicate/mass-produced QR codes scanned at significantly different GPS locations (snack wrapper problem).
- FR47: The system can flag impossible movement speeds between consecutive scans from the same user.
- FR48: The system can verify physical presence via geofence check (GPS coordinates within configurable radius of stop location) before accepting a scan.
- FR49: The system can enforce rate limiting on scan attempts per user.

### Location Intelligence

- FR50: Users can capture an image of the QR code's surroundings during the scan process.
- FR51: The system can upload scan images asynchronously without blocking the scan result flow.
- FR52: The system can extract EXIF metadata (GPS coordinates, compass bearing, estimated distance) from scan images to triangulate Taag location.
- FR53: The system can refine Taag location using triangulated data from multiple scan images over time.
- FR54: _(Phase 2)_ The system can enrich Taag profiles with contextual data from external sources (reverse geocoding, nearby points of interest).
- FR55: _(Phase 2/3)_ The system can process uploaded images through vision analysis to extract contextual data (business type, surroundings, name suggestions, Taag personality graphic), then delete source images after processing.

## Non-Functional Requirements

### Performance

- NFR1: Scan API endpoint responds in <500ms at p95 under normal load as measured by application monitoring.
- NFR2: End-to-end QR decode to UI result completes in <2 seconds on supported devices.
- NFR3: Hunt data (stops, clues) loads within 3 seconds on 4G connections.
- NFR4: Leaderboard data refreshes within 10 seconds of a qualifying scan event.
- NFR5: App cold start to camera-ready state completes in <4 seconds.

### Security

- NFR6: All API communication encrypted via TLS 1.2+.
- NFR7: Authentication tokens stored in platform-provided secure storage — never in client-side local storage.
- NFR8: All user-facing text inputs validated server-side against injection attacks using parameterized queries.
- NFR9: CORS restricted to known origins in production (not the current open-any-origin dev configuration).
- NFR10: JWT validated on every authenticated API request.
- NFR11: Platform attestation validated for scan claims to verify requests originate from the authentic app on a genuine device.

### Scalability

- NFR12: System supports up to 10,000 concurrent users on MVP infrastructure (<$80/month).
- NFR13: Taag database handles up to 500,000 unique Taags without performance degradation on a single database instance with geospatial capability.
- NFR14: Architecture supports horizontal scaling via read replication and caching layer addition without application rewrite.

### Privacy & Data Handling

- NFR15: GPS coordinates collected at minimum precision necessary for geofence verification (approximately city-block level).
- NFR16: Location data never sold or shared with third parties in raw form.
- NFR17: User data deletion requests fulfilled within 45 days per state privacy law requirements.
- NFR18: Global Privacy Control (GPC) signals honored for opt-out preferences.
- NFR19: Under-13 user data handled per COPPA requirements with Verifiable Parental Consent before collection.

### Reliability

- NFR20: API maintains 99.5% uptime measured monthly.
- NFR21: Offline-queued scan claims sync correctly when connectivity returns with zero data loss. Hunt progression requires connectivity; queued scans advance hunts upon sync.
- NFR22: Idempotency keys prevent duplicate scan records on network retry.

### Audio

- NFR23: Audio signatures for celebrations must be designed and integrated before public release. Celebrations must be visually complete without audio for initial development phases.
