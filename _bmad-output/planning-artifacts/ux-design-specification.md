---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
workflow_completed: true
inputDocuments:
  - '_bmad-output/planning-artifacts/product-brief-TaagBack-2026-03-10.md'
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/brainstorming/brainstorming-session-2026-03-09-001.md'
  - 'docs/api.md'
  - 'docs/architecture.md'
  - 'docs/README.md'
---

# UX Design Specification TaagBack

**Author:** Noah.Porch
**Date:** 2026-03-11

---

## Executive Summary

### Project Vision

TaagBack is a mobile-first platform that transforms the world's billions of existing QR codes into a hidden interactive game layer. Using the TaagBack native app as a "magic lens," users scan any real-world QR code to discover, claim, name, and collect digital markers called "Taags" — competing on leaderboards, defending territory through monthly re-scans, and progressing through creator-built scavenger hunts. The platform's core innovation is the QR overlay model: rather than generating new codes, TaagBack repurposes existing physical-world QR infrastructure as a pre-built game board — a premise with zero direct competitors.

The MVP rests on three self-reinforcing pillars that form a flywheel: **Hunt Builder** (sequencing real-world QR codes into clue-driven experiences), **Taag Leaderboard & Databank** (competitive sourcing, claiming, and collection), and **Re-scan Retention Mechanic** (monthly physical-world re-engagement to maintain claims). Discovery feeds creation, creation feeds play, play feeds discovery — and every interaction quietly builds TaagBack's most valuable strategic asset: a crowdsourced global QR code registry.

Two foundational design principles govern all UX decisions: **"Low Floor, High Ceiling"** (instant magic for newcomers, bottomless depth for power users — complexity revealed, never imposed) and **"Protect the Magic"** (when in doubt, show less; prioritize wonder and discovery over data and metrics).

### Target Users

**The Adventurer (Jake, 22, College Student)** — Active, intentional seeker who downloads TaagBack to compete. Sources Taags aggressively, climbs leaderboards, claims territory, defends it with monthly re-scans. The power user who builds the Taag databank through sheer volume. His loop: Discovery → Competition → Status. Tech-savvy, competitive, mobile-native.

**The Wanderer (Mia, 14, High Schooler)** — Serendipitous discoverer who encounters TaagBack through a random QR code scan or a friend's shared moment. Zero expectations, pure curiosity. The pioneer celebration hooks her instantly. Her loop: Serendipity → Delight → Collection. She's the viral growth engine — every shared screenshot pulls in more Wanderers. Moderate tech comfort, high social media fluency.

**The Creator (Sarah, 35, Teacher)** — Player who graduates into building experiences for others. After playing hunts and sourcing Taags, she uses both the field builder and map-based couch builder to create scavenger hunts for students, friends, and community. The crowdsourced Taag databank is her creative palette. Her loop: Play → Inspiration → Creation. Moderate tech comfort, values simplicity in tools.

**Context:** All three archetypes use mobile devices exclusively (iOS and Android). Usage happens in the real world — walking, exploring, commuting. Connectivity varies (indoor, outdoor, transit). The app must feel responsive and rewarding even in challenging network conditions. Age range spans 13+ (COPPA compliance required for under-13).

### Key Design Challenges

1. **The "Two Realities" Problem** — The same QR code behaves differently with TaagBack vs. a standard camera. Users must understand and remember to use TaagBack as their scanner. The app needs to feel like the natural, default way to interact with any QR code — not an extra step bolted on.

2. **Onboarding Without Friction** — The Wanderer arrives with zero context through serendipity. Account creation happens on first app launch but must be designed as a signature UX moment — a delightful "passport issuance" that sets the tone for the entire experience, not a barrier. The first scan must then deliver instant delight AND teach core mechanics (claiming, naming, re-scanning) without feeling like a tutorial. "Protect the Magic" means wonder first, education second.

3. **Dual-Mode Hunt Creation** — The Creator needs two creation modes (field and couch/map) that feel like one seamless experience. She might start a hunt while walking, then finish it from home. Draft state must persist invisibly and the transition between modes must be frictionless.

4. **Re-scan as Joy, Not Chore** — Monthly maintenance could feel like a tax. The UX must frame re-scanning as territory defense — a game within the game — not a nagging reminder. The retention hook is introduced at peak emotional investment (right after naming YOUR Taag), but maintaining that framing over months requires careful notification and celebration design.

5. **COPPA + Age Gate Choreography** — Under-13 users need Verifiable Parental Consent before GPS/account features. The age gate is integrated into the account creation flow on first launch — woven naturally into the "passport issuance" ceremony so it feels like part of the experience, not a compliance checkpoint. The choreography must maintain delight while meeting legal requirements.

6. **No Progress Counter as Tension Design** — The deliberate omission of hunt progress indicators is a bold, cinematic UX choice. Uncertainty IS the excitement. But this counter-intuitive pattern must be executed carefully so players feel suspense, not confusion or frustration.

### Design Opportunities

1. **The Pioneer Moment as Viral Hook** — The first-scan celebration (confetti, fanfare, naming ceremony) is TaagBack's signature UX moment. If executed with the right emotional design, it becomes inherently screenshot-worthy — every share is organic marketing. This moment needs to feel like a personal achievement, not a generic animation.

2. **Emotional Micro-Moments Throughout** — The "darn!" moment for already-claimed Taags, the watchlist "gotcha" when a claim expires, the blackout crescendo on hunt completion, the creator's personal message — TaagBack has more opportunities for emotionally designed micro-interactions than most apps. Each one is a retention hook disguised as delight.

3. **Feature Discovery Through Play** — Rather than a feature tour or settings menu, TaagBack reveals its depth through organic gameplay. Scan a Taag that's part of a hunt? You just discovered hunts. Scan an already-claimed Taag? You just discovered the watchlist. The "Low Floor, High Ceiling" principle means every scan is a potential gateway deeper into the ecosystem.

4. **The Physical-Digital Bridge** — TaagBack exists at the intersection of physical exploration and digital gameplay. The UX can lean into this duality — atmospheric clue presentation that builds suspense, location-aware contextual details, and the tactile satisfaction of the scan-think-walk-scan loop. The real world IS the game board, and the UX should make that feel magical.

## Core User Experience

### Defining Experience

The atomic unit of TaagBack is the **scan**. Every pillar of the flywheel — sourcing, claiming, hunt progression, re-scan maintenance, collection growth — begins with a single physical action: aim the camera at a QR code and tap.

The critical interaction to perfect is the **scan → result → emotional response** loop. The split second between "I just scanned something" and "here's what happened" is where TaagBack lives or dies. Whether it's a pioneer celebration, an already-claimed reveal, or a hunt clue — the transition from camera to result must feel instant, emotionally resonant, and self-explanatory. If pointing TaagBack at any QR code in the world consistently delivers a moment of surprise, ownership, or discovery, the rest of the product builds itself.

The app operates in **three distinct user modes**, each with different emotional and interaction needs:
- **Discovery Mode** (scanning new codes, playing hunts) — Emotion before information. Celebrations, reveals, and wonder lead. Data is available but never leads.
- **Maintenance Mode** (re-scanning claims, checking leaderboards, reviewing collection) — Efficiency before ceremony. Quick confirmations, clear status, minimal friction.
- **Creation Mode** (building hunts in field or from couch) — Efficiency first with creator-specific celebrations (publish moment, completion notifications). Player celebrations are suppressed during active draft scanning.

### Platform Strategy

- **Mobile-only for MVP** — iOS 16+ and Android 8.0+ via React Native (Expo SDK 55). No web support; PWA planned post-MVP as a lower-friction discovery funnel.
- **Camera-first with bottom navigation** — The scanner is the default landing and visually prominent tab. Four tabs map to four core user intents: **Scan** (discover and source), **Collection** (review what's mine), **Leaderboard** (compete and compare), **Profile** (stats, settings, hunt management). Bottom nav gives returning users with non-scanning intent immediate access without smart-landing complexity.
- **Touch-first, one-handed operation** — Users are walking, scanning in varied lighting and weather. The UI requires high contrast, large touch targets, and graceful degradation for outdoor use.
- **Offline-capable** — Hunt data cached locally on open. Scan claims queued offline with idempotency tokens and synced on reconnect. Leaderboards and collection data use stale-while-revalidate (5-minute acceptable staleness).
- **Device capabilities leveraged** — Camera (QR scanning via VisionKit/MLKit, raw data interception before URL resolution), GPS (Taag placement + geofence verification at 50m default radius), Push notifications (watchlist alerts, claim expiry, hunt invitations), Secure storage (auth tokens in iOS Keychain / Android Keystore).
- **Physical-world context** — The primary usage environment is outdoors and in motion. Direct sunlight readability, variable connectivity, and quick-glance information hierarchy are non-negotiable constraints.

### Effortless Interactions

- **App open to scan-ready** — Cold start to camera-ready in <4 seconds. The scanner tab is the default home. No navigation required to start scanning.
- **Scan result comprehension** — Every result screen should be emotionally self-explanatory. The user should understand what happened through the celebration/animation before reading any text.
- **Adding a hunt stop in the field** — One tap from a Taag card to add it to an active draft. Clue writing happens in-context at the location. Scanning in active draft mode triggers an efficiency flow: quick "Added as Stop N" confirmation with inline clue writing. Player celebrations are suppressed in creation context.
- **Re-scanning a claimed Taag** — Simple "Claim renewed!" confirmation. Quick, satisfying, territorial. (Fast Follow: add watchlist pressure — "3 people watching this Taag" — to reinforce territorial engagement.)
- **Re-scanning an already-owned, already-collected Taag** — Refreshes claim timer and acknowledges the visit. Not a redundant celebration, but a brief territorial nod.
- **Hunt clue progression** — Clue → think → walk → scan → reward → next clue. The loop should feel tactile and rhythmic, like turning pages in a mystery novel.
- **Maintenance batching (Post-MVP)** — Weekly Territory Report aggregates all Taag statuses into one notification. "Maintenance Run" mode suggests efficient re-scan routes. Turns monthly maintenance from per-Taag chore into a mini-game.

### Critical Success Moments

1. **The Passport Issuance (Day 1)** — Account creation on first app launch. This is TaagBack's first impression and must feel like joining a secret society or getting your passport stamped for a hidden world — not filling out a sign-up form. The "passport" metaphor from the product brief lives here: your account IS your passport to the invisible layer. Age gate is woven naturally into the ceremony. Design should carry the same emotional investment as the pioneer celebration — this is where TaagBack's personality and design language make their debut. If registration feels like a chore, the Wanderer never reaches the first scan. If it feels like an initiation, every scan that follows has emotional context.

2. **The Pioneer Celebration (Day 1)** — First unclaimed Taag scan. Confetti, fanfare, naming ceremony. If this doesn't make the user feel like they just discovered treasure, the Wanderer is lost forever. Designed to be screenshot-worthy — every share is organic marketing.

2. **The "Darn!" → Watchlist Flow (Day 1)** — Scanning a claimed Taag, feeling the theatrical loss, then being offered the watchlist. Converts disappointment into anticipation. The "darn!" moment must play well as a social/spectator moment — designed for the audience of peers watching over the scanner's shoulder.

4. **The Hunt Invitation Discovery (Day 1)** — Scanning a Taag and seeing "This is part of an active hunt — want to join?" The moment hunts find players organically through the real world. If this transition feels natural and exciting, the flywheel spins.

5. **The Blackout Crescendo (Day 1)** — Hunt completion. Screen goes black. Dramatic pause. Celebratory fanfare fades in and CRESCENDOS with confetti, music, fireworks. Then the creator's personal completion message. TaagBack's "movie moment." If it lands, players become creators.

6. **First Hunt Publish (Day 1)** — Creator hits "Publish" and receives a shareable deep link. If creation feels empowering and simple, players graduate into creators and the flywheel accelerates.

7. **The Hidden Layer Reveal (Fast Follow)** — After the first pioneer celebration, a brief atmospheric glimpse of the local ecosystem (nearby Taags, active hunts, player activity) that transforms "I scanned a code" into "I just entered a hidden world." Bridges the gap between individual scan and platform awareness.

8. **The Creator On-Ramp (Post-MVP)** — Post-hunt-completion prompt: "That was [Creator]'s story. Want to tell yours?" Pre-populated route suggestions from the player's own sourced Taags lower the barrier from blank page to "customize this starter." Trigger: hunt completion emotional peak. Purpose: player-to-creator conversion.

9. **The Creator Payoff Notification (Fast Follow)** — When a player completes your hunt, the creator receives an emotionally designed notification — not just a stat increment. "3 people completed Downtown History Walk today." Trigger: ongoing engagement. Purpose: fuel the creation flywheel by making creators FEEL their impact.

### Experience Principles

1. **The Reveal Is Sacred** — The moment between scan and result is the product. Every millisecond of latency and every pixel of the result screen matters. The principle is about what we SHOW after the scan, not the scan mechanics themselves.

2. **Context-Aware Emotional Design** — Discovery moments get emotion before information (pioneer celebration, hunt discovery, blackout crescendo). Maintenance moments get efficiency before ceremony (re-scan confirmation, draft editing, collection browsing). Creation moments get efficiency first with creator-specific celebrations (publish, completion notifications). The app reads the user's mode and responds appropriately.

3. **The World Is the Game Board** — For players, the physical world is the primary interface — minimize screen time, maximize looking-up time. For creators, the app provides two lenses into that same game board: the field view (world as interface) and the map view (app as interface). Both are valid modes of engagement.

4. **Every Outcome Is an Invitation** — No scan should feel wasted. Unclaimed Taag? Pioneer celebration. Already claimed? Watchlist invitation. Part of a hunt? Hunt discovery. Already owned? Claim refresh with territorial context. Flagged duplicate? Graceful "nice try, detective" explanation. Validation failure? Friendly recovery. Every outcome opens a new engagement path.

5. **Reveal, Don't Explain** — Features are discovered through play, not tutorials. When something new happens (a hunt invitation, a claim expiry, a leaderboard shift), the UX makes the concept self-evident through the experience itself. Complexity is revealed, never imposed.

6. **Adaptive Progress Signals (Fast Follow)** — Instead of a binary "no progress counter," use ambient atmospheric signals that preserve mystery while preventing frustration. Concrete example: as a player progresses through a hunt, the background color temperature of the clue screen warms gradually — cool blues at the start, warm ambers near the end. The player never sees a number but unconsciously senses momentum. Creators can mark "milestone" stops with mini-celebrations as a pacing tool.

7. **Design for All Densities** — The experience must feel compelling in cold-start areas AND saturated areas. MVP implementation: the pioneer celebration naturally serves cold-start areas by making every scan feel like discovery. Post-MVP: Pioneer Phase UX shifts emotional framing to explorer-builder ("you're building this zone") when local density is below threshold; Territory Mode shifts to defend/compete/create when local sourcing plateaus.

8. **Failures Are Friendly** — System errors (network timeout, GPS unavailable, camera permission denied) should feel temporary and recoverable, never punitive. Tone: "Hmm, we lost signal. Your progress is saved — try again when you're back online." Not: "Error 503." Failures are presented as pauses in the adventure, not broken experiences.

### Implementation Priority

**Day 1 (Must Ship for MVP):**

| Item | Effort |
|------|--------|
| Camera-first scanner as default tab with bottom nav | Low |
| Pioneer celebration (first unclaimed scan) | Low |
| "Darn!" moment with watchlist invitation (already-claimed scan) | Low |
| Blackout crescendo (hunt completion) + creator message | Low-Med |
| Hunt invitation on Taag scan | Med |
| Creation-mode efficiency scan (suppressed celebrations in draft) | Low |
| Basic re-scan confirmation ("Claim renewed!") | Low |
| Four scan outcomes — all positive (unclaimed, claimed, hunt-linked, collection-add) | Low |
| First Hunt Publish with deep link | Med |

**Fast Follow (Weeks 2-6):**

| Item | Effort |
|------|--------|
| Hidden Layer Reveal (post-first-scan ecosystem glimpse) | Med |
| Watchlist pressure on re-scan ("3 people watching") | Med |
| Creator Payoff Notification (emotionally designed) | Med |
| Adaptive progress signals (color temperature shift) | Med-High |

**Post-MVP (v1.1+):**

| Item | Effort |
|------|--------|
| Context-aware app landing (intent detection) | High |
| Pioneer Phase UX (cold-start builder framing) | High |
| Territory Mode (post-discovery engagement shift) | High |
| Maintenance batching + Territory Reports + route suggestions | High |
| Creator On-Ramp with pre-populated routes | High |

### Known Risks (from Pre-mortem)

| Risk | Mitigation | When to Build |
|------|-----------|---------------|
| **Magic Wall** — Overlay value unclear on first scans | Hidden Layer Reveal post-first-scan | Fast Follow |
| **Cold Start Desert** — Empty ecosystem feels lifeless | Pioneer Phase UX with explorer-builder framing | Post-MVP |
| **Scan Fatigue** — Local codes exhausted after weeks | Territory Mode shifts to defend/compete/create | Post-MVP |
| **Creator Cliff** — Inspiration doesn't convert to creation | Creator On-Ramp with pre-populated routes | Post-MVP |
| **Notification Numbness** — Maintenance scales linearly, attention doesn't | Territory Reports + Maintenance Run batching | Post-MVP |

## Desired Emotional Response

### Primary Emotional Goals

**Core Emotional Signature: "Ownership of the Invisible"**

TaagBack's primary emotional promise is: "There's a hidden world layered on top of reality, and pieces of it belong to YOU." This is a potent cocktail of discovery + possession + secret knowledge that no competitor delivers. Geocaching gives discovery. Pokemon GO gives collection. TaagBack gives territorial ownership of something nobody else can see without the app.

The emotional tone is closer to a **magic trick** than a game. The feeling that differentiates TaagBack: ***secrets revealed*** — you point your phone at something mundane and discover it has a hidden identity.

**Sharing triggers by persona:**
- **Mia shares because of spectacle** — "LOOK what just happened on my screen!" Visual drama drives screenshots.
- **Jake shares because of status** — "I own 47 Taags in this neighborhood." Territorial bragging rights.
- **Sarah shares because of creation** — "I made 22 teenagers walk 3 miles and they THANKED me." Creator pride.

### Emotional Journey Mapping

**Mia's Journey (Wanderer):**

| Stage | Emotion | Design Driver |
|-------|---------|---------------|
| App opens, passport issuance | Initiation — "I'm joining something secret" | Registration as ceremony, age gate woven in, passport metaphor |
| Camera ready | Curiosity — "What will I find?" | Clean scanner, no clutter, sense of possibility |
| First scan — pioneer! | Euphoria — "I FOUND something!" | Confetti, fanfare, naming ceremony. Peak dopamine. |
| Names her first Taag | Pride + Ownership — "This is MINE" | Personal naming moment, permanent discoverer credit |
| Re-scan explained | Protective instinct — "I need to come back" | Introduced at peak investment, framed as territory defense |
| Scans already-claimed Taag | Theatrical disappointment → Anticipation — "I'll get it" | "Darn!" moment + watchlist invitation |
| Discovers a hunt through scan | Surprise → Intrigue — "What is this?" | Unexpected invitation, no pressure, pure curiosity |
| Mid-hunt, following clues | Suspense + Momentum — "What's next?" | No progress counter, atmospheric shifts, rhythmic loop |
| Hunt completion | Triumph → Warmth — "That was amazing" | Blackout crescendo, then creator's personal message |
| Shares screenshot | Social currency — "Look at me" | Visually rich, context-free (makes sense to non-users) |

**Jake's Journey (Adventurer):**

| Stage | Emotion | Design Driver |
|-------|---------|---------------|
| Opens app, checks territory | Vigilance — "Is everything still mine?" | Quick status via Collection tab, efficient maintenance |
| Systematic sourcing walk | Determination + Rhythm — "Building my empire" | Scan-claim-name loop feels productive and addictive |
| Climbs leaderboard | Competitive satisfaction — "I'm winning" | Leaderboard position changes feel earned |
| Re-scans to maintain claims | Territorial confidence — "Still mine" | Quick confirmation, no unnecessary theater |
| Loses a Taag to expiry | Sharp loss → Resolve — "Never again" | Loss notification is real but not devastating |
| Completes a difficult hunt | Earned triumph — "I figured it out" | Blackout crescendo + speed ranking |

**Sarah's Journey (Creator):**

| Stage | Emotion | Design Driver |
|-------|---------|---------------|
| Finishes a great hunt as player | Inspiration — "I could build something like this" | Creator on-ramp at emotional peak |
| Opens hunt builder | Creative possibility — "Where do I start?" | Clean interface, draft-as-you-go simplicity |
| Building in the field | Flow state — "I'm experiencing what players will feel" | Efficiency mode, minimal interruption, in-context clue writing |
| Refining on couch (map view) | Craftsmanship — "Making this perfect" | Map builder shows the journey visually, reordering is tactile |
| Hits Publish | Proud vulnerability — "I made something. Will they like it?" | Celebration + deep link. Feels like releasing art. |
| Gets completion notification | Emotional payoff — "People loved it!" | Creator notification designed to warm, not just inform |

### Micro-Emotions

| Spectrum | TaagBack Target | Design Implication |
|----------|----------------|-------------------|
| Confidence vs. Confusion | **Confidence** — "I always know what just happened" | Emotion-first result screens are self-explanatory. No ambiguous states. |
| Trust vs. Skepticism | **Trust** — "My data is safe, my claims are real" | Permanent discoverer credit builds trust. Transparent claim rules. No hidden mechanics. |
| Excitement vs. Anxiety | **Excitement with safe boundaries** — "Thrilling but never scary" | Safety reminders before hunts. No time pressure on clue solving. Dark/dangerous locations flaggable. |
| Accomplishment vs. Frustration | **Accomplishment always** — "Every scan gives me something" | "Every Outcome Is an Invitation" principle. No wasted scans. |
| Delight vs. Mere Satisfaction | **Delight on discovery, satisfaction on maintenance** — mode-appropriate | Pioneer celebrations = delight. Re-scan confirmations = satisfying efficiency. Right emotion, right moment. |
| Belonging vs. Isolation | **Belonging without exposure** — "I'm part of something bigger but on my terms" | Leaderboards show you exist in a community. No forced social features. The hidden layer IS the community. |

### Emotions to Actively Avoid

| Emotion | Risk Trigger | Prevention |
|---------|-------------|------------|
| **Punished** | Losing a Taag claim feels like punishment | Frame as "the game continues" not "you failed." Three-tier attribution preserves discoverer credit forever. |
| **Spammed** | Too many notifications at scale | Maintenance batching (Post-MVP). Conservative notification defaults. Every type independently opt-outable. |
| **Lost/Confused** | Hunt clue is unsolvable, or app state is unclear | Hints available per stop if provided by the creator (shown after 3 unsuccessful scan attempts). "Failures Are Friendly" principle. No ambiguous UI states. |
| **Surveilled** | Location tracking feels creepy | Explicit opt-in. Minimum precision GPS. Never show exact user locations to other users. |
| **Bored** | Scan fatigue after local codes exhausted | Territory Mode (Post-MVP). Leaderboard competition and hunt play carry engagement when discovery plateaus. |
| **Exploited** | Monetization feels extractive | "Protect the Magic" test on all monetization. Core loops never paywalled. Cosmetic-only marketplace. |

### Emotional Design Principles

1. **The Secret World Feeling** — Every interaction should reinforce that the user has access to something hidden. The app is a portal, not a tool. Design language should evoke discovery, not productivity.

2. **Theatrical Loss, Never Real Loss** — When something negative happens (claimed Taag, expired claim, unsolvable clue), the emotional design makes it dramatic and playful, never punitive. The "darn!" moment is theater. Losing a Taag is a plot twist, not a failure.

3. **Consequences Are Content** — Real stakes create real stories. The re-scan maintenance mechanic is deliberately unforgiving because the loss/reclaim cycle IS the game. A vacation loss becomes a comeback arc. The mechanic assumes player agency — the youngest users (13+) experience loss framed as "the adventure continues," never "you failed." Parental FAQ prepared for claim-loss concerns.

4. **Earned Intimacy** — The deeper a user goes, the more personal the experience becomes. First scan = public celebration. Hundredth scan = quiet territorial nod. The app learns your mode and matches your emotional register. Veterans don't get the same fanfare as newcomers.

5. **Social Currency Without Social Pressure** — Every peak moment is designed to be shareable, but sharing is never prompted or required. Share functionality is always visible (icon on peak moment screens) but never modal. One tap to native share sheet. Share artifacts (completion cards, pioneer badges) are designed to provoke curiosity in non-users — visually comprehensible to someone who has never used TaagBack. The content does the marketing, not the app.

6. **Creative Pride Over Creative Anxiety** — For creators, the emotional arc is inspiration → confidence → pride. Never: intimidation → self-doubt → abandonment. Creation tools feel like finishing a sentence, not writing an essay. Hunt creation benchmark: under 1 hour for a 5-7 stop hunt.

### Design Implications

**Emotional Patterns from Theme Park Design:**

- **The Transition Zone (Day 1)** — 3-second atmospheric build when entering a hunt (screen dims, ambient mood shifts, hunt title + tagline appear, then first clue materializes). Not a loading screen — an emotional airlock. Signals "you're entering a different experience now." Requires audio component alongside visual.

- **The Gift Shop Exit (Day 1)** — Hunt completion generates a shareable completion card (hunt name, player time, rank, date, unique visual). Extends the dopamine window beyond the crescendo. Gives the share moment a specific artifact, not just a screenshot of confetti.

- **The Wayfinder (Fast Follow)** — Creator-controlled per-hunt option (off by default). Atmospheric directional hint on hunt clue screens — subtle compass or warm/cool color shift as player approaches the next stop. Not GPS navigation — a feeling. Creators toggle "Enable Wayfinder for this hunt" based on whether ambiguity is part of the challenge or a barrier. Internal design pattern name: "The Weenie." User-facing label: "Wayfinder."

**Emotional Patterns from Roguelike Game Psychology:**

- **Meta-Progression Visuals (Day 1)** — Taag profile cards visually separate permanent attribution (Original Discoverer — etched, immovable) from temporary attribution (Current Controller, Custom Name — displayed on a dynamic banner). The visual language teaches the permanent-vs-temporary distinction without explanation.

- **The Death Screen as Story (Day 1)** — Claim-loss notifications are emotionally designed narratives, not informational alerts. "'Mia's Morning Spot' has fallen. Dave claimed it 2 hours ago and renamed it 'Dave's Java.' Your Pioneer legacy endures — you'll always be the one who found it first. [Add to Watchlist] [View Taag]." Loss becomes a plot twist with a clear next action.

- **"One More Run" Hooks (Day 1)** — Every screen's closing beat points toward the next action. Finished a scan walk? "3 unclaimed Taags within 200m." Completed a hunt? "2 more hunts nearby." Lost a claim? "Add to watchlist." Checked leaderboard? "You're 4 Taags behind #2." The app never ends a session on a closed note.

**Sound Design (Day 1):**

Sound is required, not optional. Minimum 4 audio signatures: pioneer fanfare, "darn!" sound, hunt entry atmospheric shift, and crescendo build. Sound follows device mode — silent/vibrate mode replaces audio with haptic celebration patterns. The blackout crescendo specifically requires audio; a silent crescendo is a contradiction.

- **Blackout pause timing:** 2-3 seconds of pure black screen. Shorter = glitch. Longer = magic. The uncertainty ("did it crash?") before the payoff is the emotional design.

**Creator Completion Message UI:**

The creator's completion message is presented as a personal letter — handwritten-style visual treatment with the creator's name signed at the bottom. Not a plain text string below confetti. The presentation format transforms metadata into parasocial connection.

**Deferred Deep Linking:**

Hunt deep links should survive the app install process where feasible. Ideally, if a user taps a shared hunt link, installs TaagBack, and opens the app for the first time, the hunt invitation is waiting. Deferred deep linking is desirable but not guaranteed across all platforms and install paths — best-effort implementation. Technical requirement: expo-linking with deferred deep link support.

**Hunt Recovery UX (Day 1):**

- **Broken stop detection:** If a scan at a hunt stop fails 3 times, offer: "Having trouble? [Report this stop] [Try the hint]." Hints are only shown if the hunt creator provided one for that stop.
- **Progress preservation:** Hunt progress auto-saves. Quitting and returning resumes from the last completed stop, not stop 1. Real-world time investment MUST be respected.
- **Partial completion credit:** Abandoned hunts show in history: "Campus Cryptic — 5 stops completed (incomplete)." Not a celebration, but an acknowledgment.
- **Dual geofencing:** Relaxed geofence for hunt stop verification (QR token match is primary proof of presence). Strict geofence for competitive claiming and Taag sourcing.

**Basic Creator Stats (Day 1):**

Hunt detail screen shows: "X players started | Y completed | Created [date]." Three numbers. Minimum viable creator feedback loop. Prevents the creator silence vacuum between publish and first emotionally designed notification (Fast Follow).

**Creator In-Progress Signals:**

- **Day 1 minimum:** "X players have started your hunt" count on the hunt detail screen.
- **Fast Follow:** Live progress drip notifications — "Someone just started Downtown History Walk!" and "A player reached stop 4."

### Celebration Design

**Celebration Progression (Variety Injection) — Phase 2:**

Replace celebration dimming with variety to prevent scan fatigue spiral. Not included in MVP — added in Phase 2 after core celebration mechanics are established:

- **Scans 1-5:** Full pioneer fanfare — dramatic, signature, screenshot-worthy
- **Scans 6-20:** Varied micro-celebrations — rotating different animations and sounds, each with personality. A rotation, not a dimming.
- **Scans 21-50:** Efficient but each scan adds a visible element to the Collection view — territory visually GROWS
- **Scan milestones (10, 25, 50, 100):** Full unique celebration per milestone. "50 Taags! You're a Local Legend." Rarer than the first celebration, making them more special, not less.

The emotional arc shifts from "every scan is a party" to "every scan BUILDS something visible, and milestones are events."

**Reclaim Celebration (Fast Follow):**

Reclaiming a previously lost Taag triggers a distinct celebration — "The Pioneer Returns!" — more dramatic than a standard claim. Loss → recovery is a designed story arc.

### Resting State Design

**"The Resting State Has Personality"** — Screens between peak moments carry the emotional tone of the TaagBack world through ambient visual design, micro-copy with voice, and purposeful loading states.

- **Scan-to-result transition:** Purpose-built "decoding" animation rather than a generic spinner. The scanned QR code visually transforms into the Taag card — the loading state IS part of "The Reveal Is Sacred."
- **Collection screen:** Designed as an emotional gravity well — territory map / trophy wall, not a flat list. This is the most emotionally loaded screen in the app; it's where accumulated investment lives. Users return here for validation between adventures.
- **Leaderboard screen:** Not a plain table — visual hierarchy with personality. Your position feels contextual, not abstract.
- **Between-session emotions:** Watchlist slow-burn anticipation (days/weeks), creator waiting-for-completions, leaderboard position anxiety — these sustained emotional states need design attention beyond in-app moments.

**Watchlist Notification Copy:**

Watchlist notifications get premium emotional copywriting referencing specific Taag names and user history. "Remember 'Lucky's Corner'? It's uncontested. This is your moment." Not: "A Taag on your watchlist is available."

### Accessibility

Accessibility is Day 1 ethics, not post-MVP polish — especially for an app targeting 13+:

- **Sound follows device mode** — silent/vibrate uses haptic celebration patterns instead of audio
- **Reduced motion** — respect system reduced-motion settings; replace animations with static reveals
- **Screen reader** — emotional state descriptions for all celebrations and transitions
- **High contrast** — outdoor use in direct sunlight is a primary use case; contrast requirements are functional, not just accessible
- **No color-only communication** — emotional states communicated through multiple channels (animation + sound/haptic + text)

### First-Encounter Teaching Validation

Each "first encounter" with a mechanic is a **teaching moment wearing an emotional costume.** The emotional design must carry enough information for the user to understand the mechanic without explicit explanation.

First-encounter moments to validate:
- First claimed Taag → teaches claims + watchlist system
- First hunt invitation → teaches hunts exist
- First re-scan prompt → teaches maintenance mechanic
- First claim loss → teaches consequences are real
- First leaderboard view → teaches competition exists

**Validation test:** Show only the animation/screen to someone with zero context. If they can't understand what happened, the emotional design needs to carry more informational weight.

### Hunt Pacing Design

**Creator-Designated Highlight Stops (Phase 2):**

Creators can mark 1-2 stops per hunt as "highlight stops" with enhanced celebrations. Default stops get a quick reward animation; highlight stops get a bigger moment. This gives creators pacing control to prevent the sagging middle of longer hunts. Highlight stops function as dramatic beats — the creator is a film director deciding where the tension peaks. Not included in MVP — added in Phase 2 after core hunt mechanics are validated.

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**Pokemon GO** — Physical-world collection standard. Pokedex completionist drive, AR camera bridging digital and physical, GPS-tied discovery. Anti-patterns: bloated tutorial onboarding, cluttered map UI, painfully slow Wayfarer POI nomination (TaagBack's instant-on sourcing is a direct counter).

**Duolingo** — Gamification king. Streak mechanics create daily habit, micro-sessions respect time, the app has CHARACTER and VOICE (Duo is a personality, not a UI). Pavlovian micro-sounds ("ding") create conditioned satisfaction. Anti-pattern: notification harassment — the cautionary tale for notification numbness.

**TikTok** — Attention economy master and highest-scoring inspiration source overall. Zero-friction content consumption (open → content), full-screen immersion (no chrome during content), camera-first entry, and creator tools shockingly accessible to 13-year-olds. Anti-pattern: infinite scroll (TaagBack's physical world is a natural limiter).

**BeReal** — Anti-polish movement. Notification-as-event ("Time to BeReal" IS the product), authenticity as design principle (constraints ARE the brand), time pressure creates urgency. Proved Gen-Z gravitates toward "real" over "polished." Anti-pattern: single daily interaction is limiting, novelty wore off without depth.

**Strava** — Activity social layer. Segments create micro-competition on real geography, KOM crown system is persistent territory ownership (directly analogous to Taag claiming), activity feed makes solitary activity social. Anti-pattern: premium paywall on core features creates resentment.

**Uber** — Invisible UX standard. Map IS the interface (direct representation of reality), progressive disclosure perfected (see what you need at each step, nothing more), real-time feedback loop. Anti-pattern: surge pricing erodes trust through unpredictability.

**Airbnb** — Emotional commerce platform. Full-bleed photography sells the experience (you FEEL before you read), emotionally paced journeys (browse → select → confirm → anticipate → experience), narrative reviews build trust through stories. Anti-pattern: hidden fees erode trust.

**Cash App** — Gen-Z financial brand. Bold, unapologetic visual identity (black, green, stark — COOL, not friendly), the $cashtag as social identity, Boost discovery feels like collecting power-ups. Anti-pattern: feature bloat beyond core simplicity.

### Transferable UX Patterns

**Priority-Ranked Pattern Transfers:**

| Priority | Dimension | Primary Source | TaagBack Application |
|----------|-----------|---------------|---------------------|
| 1 | Emotional Peak Design | TikTok + Duolingo | Full-screen immersion + sound design for all peaks. Pavlovian micro-sounds for routine interactions. |
| 2 | Gen-Z Visual Identity | Cash App + BeReal + TikTok | Underground + authentic + accessible. Gen-Z vintage constraint system. |
| 3 | Physical-World UX | Pokemon GO + Strava + Uber | Discovery (Pokemon GO) + territory ownership (Strava) + "you are HERE" grounding (Uber). |
| 4 | Collection / Progression | Pokemon GO + Strava | Category silhouettes, completion drive, diary-of-places-been. Collection as emotional gravity well. |
| 5 | Creator Tool UX | TikTok | Template-first, in-context editing, progressive complexity. Never a blank page. |
| 6 | Delightful Onboarding | TikTok + Uber | Open → passport issuance → camera → scan → result. Registration as ceremony, then zero friction. |
| 7 | Map / Spatial | Strava + Uber + Airbnb | Collection map (biography) + builder map (direct manipulation) + info-dense pins. |
| 8 | Notification Design | BeReal + Uber | Notifications as story openers, not reminders. Perfect timing, emotional copy. |
| 9 | Anti-Polish Aesthetic | BeReal + Cash App | Constraint system: textured, handmade, lo-fi palette, monospace type. |

**The "TaagBack Cocktail":**

Pokemon GO's physical-world collection drive + Strava's territorial ownership + TikTok's full-screen emotional peaks and creator accessibility + BeReal's notification-as-event and anti-polish authenticity + Cash App's underground visual coolness + Uber's map-as-interface and progressive disclosure + Airbnb's emotionally paced journeys + Duolingo's micro-sound Pavlovian design — all wearing a Minecraft-era vintage costume that says "this belongs to an underground community, not a design studio."

### Anti-Patterns to Avoid

| Anti-Pattern | Source | Why It Fails for TaagBack |
|---|---|---|
| Tutorial onboarding | Pokemon GO | Kills the magic. "Reveal, Don't Explain" means NO tutorial. The passport issuance sets the tone, then first scan IS the onboarding. |
| Infinite scroll | TikTok | TaagBack is physical-world, not infinite-content. No screen should encourage endless passive scrolling. |
| Aggressive notifications | Duolingo | Notification numbness is a documented risk. Conservative defaults, independent opt-outs. |
| Premium paywall on core loops | Strava | "Protect the Magic" means core game is always free. Monetization is cosmetic/creator-tools/B2B. |
| Hidden costs/surprise mechanics | Uber surge, Airbnb fees | Claim rules, maintenance periods, and geofence requirements must be transparent. No surprises. |
| Over-polished corporate aesthetic | Generic SaaS | Gen-Z reads polish as corporate and inauthentic. The vintage/handmade aesthetic signals authenticity. |
| Feature bloat | Cash App evolution | Three pillars. Three. Everything else is future. The MVP must resist feature creep. |
| Leaderboard intimidation | Strava | New users must feel they can compete. Neighborhood-level leaderboards, not platform-wide. |

### Design Inspiration Strategy

**What to Adopt Directly:**
- Camera/content-first landing (TikTok) → Scanner as default tab
- Full-screen immersion for peaks (TikTok, Airbnb) → Celebrations and crescendo take over entire screen
- Map-as-interface (Uber) → Couch builder uses direct map manipulation
- Progressive disclosure (Uber) → Hunt clues reveal one at a time
- App personality through voice (Duolingo) → Consistent micro-copy voice — playful, mysterious, never corporate
- Collection-as-completionist-drive (Pokemon GO) → Taag collection, category tracking, milestones
- Territory/segment ownership (Strava) → Taag claiming mirrors KOM crown
- Notification-as-event (BeReal) → Watchlist alerts as adventure calls

**What to Adapt:**
- Streak mechanics (Duolingo) → Monthly re-scan + "defended for X months" streak. Less aggressive — no guilt, just pride.
- Kudos/lightweight social (Strava) → One-tap acknowledgment. Not comments — just "I see you." Post-MVP.
- Boost discovery as game (Cash App) → Taag category discovery feels like finding power-ups
- Treasure map aesthetic (Airbnb photography) → Collection and map screens have illustrated, hand-drawn quality

**What to Avoid:**
- Tutorial onboarding — Never. Passport issuance sets the tone, then first scan IS the tutorial.
- Notification harassment — Conservative defaults. "Fewer is better."
- Core feature paywall — Core loops always free.
- Corporate polish — Gen-Z vintage aesthetic: handmade, lo-fi, underground.
- Infinite passive consumption — Physical world is the limiter. App encourages looking UP.

### Gen-Z Vintage Aesthetic Direction

**Aesthetic Foundation:**

The name "TaagBack" is itself rooted in 80s/90s playground culture ("no tag backs!"). The entire product — from its core mechanic (claim, lose, reclaim) to its visual identity (passport stamps, field journals, hidden worlds) to its emotional design (theatrical loss, comeback arcs, territorial pride) — draws from the same cultural well. The Gen-Z vintage aesthetic isn't applied ON TOP of TaagBack. It's what TaagBack already IS.

This aesthetic resonates across generations: Gen-Z sees it as "vintage cool" and the builder (rooted in 80s/90s childhood) sees authentic cultural DNA — Geocities DIY energy, Trapper Keeper collection culture, Mighty Max hidden-world metaphor. Not trend-chasing — a genuine aesthetic convergence.

**What Gen-Z "vintage" means:**
- Minecraft aesthetic — pixel-ish, blocky, imperfect. Modern capabilities wearing a lo-fi costume.
- CRT/VHS filters — scan lines, color bleeding, datestamp overlays. Nostalgia for formats they never used.
- Y2K revival — chrome, bubble fonts, neon on black, early-internet energy.
- Film camera aesthetic — grain, light leaks, muted color palettes.
- Handmade/DIY feel — stickers, doodles, tape, torn edges. Anti-corporate. Feels like a zine, not a product.

**Core Principle:** The aesthetic gap between your normal phone and TaagBack's visual world IS the portal. The wider the visual distance, the stronger the "hidden layer" concept becomes. Opening TaagBack should FEEL like stepping into another reality.

### The TaagBack Visual System

**Color Palette:**
- **Primary:** Near-black background (#0D0D0D to #1A1A1A range) — the "hidden world" darkness
- **Accent 1:** High-saturation primary color (electric amber or neon teal — warm, distinct, "secret world" energy)
- **Accent 2:** Secondary color for contrast and hierarchy
- **Alert/Action:** Bright, attention-grabbing for CTAs and notifications
- **Muted variants** for secondary information
- **No pure white text** — slightly warm off-white for readability and vintage warmth

**Typography:**
- **Primary:** Monospace or typewriter-influenced font — high legibility, distinctive character, signals "decoded transmission from another world"
- **Accent:** Hand-drawn or stamp-style font — for Taag names, hunt titles, celebrations, milestone text. Personality moments.
- **System font fallback** for smallest UI text (tab labels, timestamps) where legibility at tiny sizes matters

**Visual Texture System (Volume Knob):**

| Level | Context | Texture Intensity | Example |
|-------|---------|-------------------|---------|
| 0 — Clean | Settings, forms, text input | No vintage effects. Dark theme, custom fonts, but clean | Hunt clue text input while creating |
| 1 — Ambient | Navigation, lists, standard screens | Subtle paper texture background, slight grain | Collection list, leaderboard |
| 2 — Styled | Cards, content display, map overlay | Stamp borders, torn edges, illustrated elements | Taag profile cards, hunt detail |
| 3 — Immersive | Peak moments, celebrations, transitions | Full vintage treatment — CRT, pixel effects, analog artifacts | Pioneer celebration, crescendo, dimensional shift |

**Taag Card Species (Visual Categories):**

| Category | Card Aesthetic | Color Temperature |
|----------|--------------|-------------------|
| Restaurant/Food | Diner menu typography, warm cream card stock | Warm amber |
| Ghost (defunct) | Faded, partially transparent, ethereal | Cool gray-blue, desaturated |
| Transit | Ticket stub, perforated edges | Industrial yellow |
| Retail | Price tag aesthetic, bold block text | Bright, commercial |
| Art/Culture | Gallery placard, elegant but textured | Muted earth tones |
| Municipal | Official stamp, bureaucratic | Muted green/blue |
| Unknown/Other | Generic field journal entry, handwritten | Neutral kraft paper |

**Key Visual Motifs:**
- Stamps and stickers for badges and achievements (laptop-sticker aesthetic)
- Polaroid frames for completion cards and shareable moments
- Index cards for hunt clues (handwritten feel)
- Arcade screens for leaderboards (dark + bright monospace)
- Field journal / passport as the overarching metaphor

### The Passport Metaphor

The collection concept evolved into a unifying visual system: **TaagBack is your passport to the hidden world.**

| Element | Passport Equivalent | Emotional Function |
|---------|-------------------|-------------------|
| Collection | Pages of stamps | Physical-feeling record of your journey |
| Pioneered Taags | Bold entry stamps ("FIRST DISCOVERY") | Visual proof of pioneer status |
| Claimed Taags | Name written in ink | Ownership has visual weight |
| Scanned-but-not-owned Taags | Pencil sketches | In your journal but lighter — aspiration target |
| Hunt completions | Full-page visa stamps | Unique collectible from each experience |
| Player profile | Passport cover | Evolving, non-purchasable status symbol |
| Milestones | Cover embossing/texture changes | Earned visual progression |
| App wear over time | Scuffed corners, worn edges | Veteran's app LOOKS different from newcomer's |

**Passport Design Principles:**

1. **Visual status without numbers.** A veteran's app looks fundamentally different from a newcomer's through EARNED visual state — passport cover, page density, wear. The most authentic status system because it can't be faked.

2. **Two collection drives, one metaphor.** Stamp collectors (Taag pages) and visa collectors (hunt completions) are different play styles served by the same visual system.

3. **Creator-designed visa stamps.** Hunt creators design the reward artifact players receive — choose shape, color, add hunt name. 30 seconds of low-pressure creative expression that becomes permanent in every completing player's passport. Deepens parasocial connection (the creator MADE this for you).

4. **The cover as anti-cosmetic.** In a future cosmetic marketplace, the passport cover is the ONE thing that can't be purchased — only earned through milestones. Bought cosmetics decorate the interior. The cover is proof of journey.

5. **Earned visual state replaces celebration dimming.** Early scans get loud celebrations on empty pages. Later scans land on PACKED pages — the surrounding stamps ARE the celebration. Context replaces confetti.

6. **The stamping micro-interaction.** Visa stamp "pressed" into the passport with a satisfying THUNK sound + ink-spread animation. One signature interaction for both Taag claims and hunt completions. Consistent, memorable, Pavlovian — TaagBack's equivalent of Duolingo's "ding."

**Passport Implementation Priority:**

| Element | Tier | Notes |
|---------|------|-------|
| Collection as swipeable pages with card components | Day 1 | Horizontal scroll view — standard React Native |
| Visual weight by Taag relationship (stamp vs. pencil) | Day 1 | Different card component variants |
| Hunt completion visa stamp (basic templates) | Day 1 | Pre-designed stamp templates applied per hunt |
| Stamping animation + THUNK sound | Day 1 | Lottie animation + audio asset |
| Passport cover evolution (milestone-based) | Fast Follow | Milestone tracking + cover asset variants |
| Creator-designed visa stamps (template picker) | Fast Follow | Shape + color + text picker in hunt builder |
| App wear progression (visual aging) | Post-MVP | Visual state tracking tied to account age/activity |
| Cosmetic interior vs. earned cover distinction | Post-MVP | Requires cosmetic marketplace infrastructure |

### Map Design

**Dual-layer map approach:**

Real map base (OpenStreetMap/Mapbox tiles) for geographic accuracy + illustrated TaagBack overlay for game layer. This is literally the "two realities" concept rendered as cartography.

- **Collection map (Strava model):** Shows where you've been, what you own, your territory. A visual biography of your TaagBack life.
- **Hunt builder map (Uber model):** Direct manipulation — tap Taags, drag to reorder, see the route form in real-time.
- **Taag pins:** Info-dense with status indicators (yours/claimed/unclaimed) using the visual system's stamp/sticker aesthetic — not generic map markers.
- **Hunt routes:** Illustrated route lines, not standard polylines. Hand-drawn quality on the game layer.

---

## 6. Design System Foundation

### Design System Choice: NativeWind + Custom Signature Components

**The hybrid approach:** NativeWind (Tailwind CSS for React Native) as the zero-opinion styling foundation, with a library of custom TaagBack signature components built on top for the moments that define the brand.

### Rationale

1. **Total Visual Control** — NativeWind provides utility-first styling with zero design opinions. No fighting against Material Design's elevation system or Cupertino's translucency defaults. The Gen-Z vintage aesthetic, the passport metaphor, the arcade leaderboards — none of these fit inside an established design system's vocabulary. NativeWind gives us a blank canvas with professional-grade tooling.

2. **Solo Dev Velocity** — Tailwind's utility classes eliminate the context-switching between style files and component files. One file, one component, all styles inline. For a solo developer, this is the difference between shipping and stalling. No theming configuration, no style override archaeology.

3. **Volume Knob Mapping** — The four texture levels (Clean, Ambient, Styled, Immersive) map naturally to Tailwind's variant system. Clean screens use minimal utility classes. Immersive moments layer on custom components with Reanimated + Lottie. The gradient from utility-styled to fully custom mirrors the emotional intensity gradient.

4. **Expo Compatibility** — NativeWind is built for React Native and works cleanly with Expo SDK 55. No ejection required, no native module conflicts. The custom components layer on top using standard React Native primitives + Reanimated 3 + Lottie + Expo AV.

5. **Custom Components Only Where They Matter** — Instead of customizing an entire design system, we build bespoke components only for TaagBack's signature moments. Six custom components (see below) handle 90% of the brand-defining interactions. Everything else uses NativeWind utilities. Maximum brand impact, minimum maintenance surface.

### Implementation Approach

**Layer 1: NativeWind Styling Foundation**
- All layout, spacing, typography, and color through Tailwind utility classes
- Design tokens defined in `tailwind.config.js` (colors, fonts, spacing scale)
- Dark-first palette as default theme
- Responsive breakpoints for tablet consideration (Post-MVP)

**Layer 2: Custom TaagBack Components**
Six signature components that define the brand experience:

| Component | Purpose | Tech Stack |
|-----------|---------|------------|
| **TaagCard** | Passport-style stamp/sticker card for collection items | NativeWind + custom SVG borders |
| **PassportPage** | Swipeable collection page with stamp grid layout | NativeWind + React Native Gesture Handler |
| **CelebrationOverlay** | Full-screen celebration moments (pioneer, hunt complete) | Reanimated 3 + Lottie + Expo AV + Expo Haptics |
| **ScanTransition** | Camera-to-result transition animation | Reanimated 3 + shared element transitions |
| **ClueCard** | Hunt clue presentation with reveal mechanics | NativeWind + Reanimated 3 |
| **VisaStamp** | Hunt completion stamp with template variations | SVG + Lottie stamp animation |

**Layer 3: Animation & Sound System**
- Reanimated 3 for gesture-driven animations (page flips, card interactions)
- Lottie for pre-built celebration sequences (confetti, stamps, fanfare)
- Expo AV for sound signatures (THUNK, scan chirp, completion fanfare)
- Expo Haptics for vibration patterns (silent mode fallback)
- Volume Knob system controls which layers are active per screen/moment

**Layer 4: Map Integration**
- Mapbox or react-native-maps as base layer
- Custom TaagBack overlay tiles for game layer visualization
- Custom pin components using TaagCard aesthetic
- Illustrated route rendering for hunt paths

### Customization Strategy

**Design Tokens (`tailwind.config.js`):**
- Color palette: Dark-first with neon accents, CRT glow variants
- Typography: Monospace primary (headers, stats, labels), clean sans-serif secondary (body text, clues)
- Spacing scale: 4px base unit, consistent with stamp/sticker grid alignment
- Border radius: Mix of sharp (arcade/terminal aesthetic) and rounded (sticker/badge shapes)
- Shadow system: Minimal — glow effects over drop shadows, matching CRT/neon aesthetic

**Component Variants:**
- TaagCard variants: Owned (full stamp), Visited (pencil sketch), Claimed-by-other (faded), Ghost (glitch effect)
- CelebrationOverlay variants: Pioneer (confetti + fanfare), Re-scan (subtle pulse), Hunt Complete (blackout crescendo), Milestone (passport cover evolution)
- ClueCard variants: Locked (mysterious), Active (readable), Solved (stamped)

**Scaling Strategy:**
- Day 1: NativeWind utilities + 6 custom components + basic animation
- Fast Follow: Component variant expansion, sound library growth, celebration variety injection
- Post-MVP: Cosmetic customization layer, creator-designed stamp templates, visual aging system

---

## 7. Defining Core Experience

### 7.1 The Defining Experience: "Scan. Discover. Claim."

TaagBack's defining experience is a three-beat sequence: (1) Scan any real-world QR code, (2) discover its hidden identity in TaagBack's game layer, (3) claim ownership and leave your mark. The first time a user completes all three beats — scan, pioneer celebration, naming — they understand what TaagBack IS. Everything else (collection, hunts, leaderboards, competition) flows from this three-beat foundation.

**How users describe it:** *"You scan QR codes and if nobody's found it before, you get to name it and it's yours."*

**The defining experience has two phases:**
- **Phase 1 — Acquisition (Acts 1-2):** "Scan any QR code and discover its hidden identity" — the Wanderer hook, the onboarding moment, the magic lens
- **Phase 2 — Retention (Act 3's ongoing loop):** "Claim your territory in the real world" — the Adventurer hook, the competitive engine, the reason to come back

**The defining experience evolves with the user:**

| User Stage | Dominant Beat | Engine | Hook |
|------------|--------------|--------|------|
| New user (scans 1-3) | Beat 1: Scan | Surprise engine | "Whoa, what IS this?" |
| Casual user (scans 4-10) | Beat 2: Discover | Collection engine | "I want more of these" |
| Regular user (scans 10+) | Beat 3: Claim | Competition engine | "I want to beat that person" |
| Power user | Beyond Beat 3 | Creation engine | "I want to build something with these" |

### 7.2 User Mental Model

**What users bring:** Everyone understands QR codes — point camera, get link. TaagBack hijacks that learned behavior and adds an expectation violation: the code isn't just a link, it's a *place* in a game world. The physical gesture (raise phone, point at square) is identical to what users already do. The divergence happens AFTER the scan, not during.

**Persona-specific mental models:**

| Persona | Mental Model | What They're Playing |
|---------|-------------|---------------------|
| **Mia (Wanderer)** | Mystery box — "what's behind this one?" | A discovery game |
| **Jake (Adventurer)** | Territory map — "who owns this block?" | A conquest game |
| **Sarah (Creator)** | Creative palette — "what can I build with these?" | A world-building tool |

**Where confusion could happen:**
- "Wait, does this change what the QR code does?" — No, the original URL still works. TaagBack reads the code's data and layers its own meaning on top.
- "Do I need to be online?" — Yes, to register the scan. But the scan itself is instant.
- "What if someone else already scanned it?" — You still add it to your collection. You just don't get Pioneer credit or naming rights. But you DO get a charged reveal of who owns it and what they named it.

**What makes existing solutions feel terrible:** Geocaching requires intent and planning. QR code apps are purely transactional. There's no serendipity in either. TaagBack's magic is that the game finds *you* — every QR code you encounter in daily life is a potential discovery.

### 7.3 Success Criteria

**The core interaction succeeds when:**

| Criteria | Indicator |
|----------|-----------|
| **Instant gratification** | From scan to result in < 2 seconds. No loading screens breaking the spell. |
| **Every scan is meaningful** | Whether Pioneer, re-scan, or already-claimed — every scan produces a meaningful response. Meaningful includes rivalry, information, and collection progress, not just celebration. No dead-end scans. |
| **"One more" compulsion** | After their first scan, users physically look around for another QR code to scan. The environment becomes a game board. |
| **Story generation** | Users have something worth telling someone about. "I found one nobody had ever scanned!" or "Someone named the Starbucks code 'Bean Machine' lol" |
| **Identity investment** | Within 3 scans, users feel ownership. Their collection means something. Their names are out there in the world. |
| **Physical effort respected** | The further someone traveled or the harder the code was to reach, the more the app acknowledges it. Distance-from-home recognition, exploration variety tracking, explorer streaks. |
| **No dead-end scans (P0)** | The already-claimed-not-in-a-hunt outcome is the most common at scale and must carry equivalent emotional weight to rarer outcomes. |

### 7.4 Novel vs. Established Patterns

**The Hybrid:** TaagBack combines familiar patterns in a novel configuration.

**Established patterns we adopt:**
- Camera-as-scanner (everyone knows how to scan QR codes — hijack, don't retrain)
- Collection/inventory (Pokemon, trading cards, stamp collecting)
- Leaderboards (any competitive app)
- Map-based discovery (Uber, Google Maps, Pokemon GO)

**Novel patterns we introduce:**
- **Overlay reality** — The concept that a mundane object (QR code) has a hidden game identity. This is new and needs the "magic lens" metaphor to land.
- **Claim-and-defend** — Monthly re-scan to maintain ownership. Borrowed from territory games but applied to QR codes. Needs clear onboarding.
- **Passive hunt discovery** — Scanning a random QR code might pull you into a hunt you didn't know existed. This "the game finds you" mechanic has no direct precedent.

**Teaching strategy:** The passport issuance ceremony teaches: you've entered a hidden world. The first scan IS the tutorial. Pioneer celebration teaches: codes have hidden identities. The naming ceremony teaches: you own this now. The re-scan reminder teaches: come back to keep it. No separate onboarding flow — the passport issuance and core interaction *are* the onboarding.

### 7.5 Experience Mechanics

**1. Initiation:**
- User opens TaagBack app — camera is immediately active (scan-first design)
- Alternatively: encounters a shared hunt link — installs app — camera activates with hunt context
- The trigger is the physical world — seeing a QR code and wondering "what's behind this one?"
- The scan gesture is IDENTICAL to normal QR scanning. Same speed, same framing, same feedback cues. Divergence happens after.

**2. Interaction:**
- Point camera at QR code — app reads raw encoded data (before URL resolution)
- Immediate visual feedback when code is DETECTED (frame highlight, haptic pulse) — before server response
- Transition animation: camera feed morphs into TaagBack's game layer (the "lens reveal")
- System checks: Is this code in the databank? Who owns it? Is it part of a hunt?
- Backend enrichment is **asynchronous and progressive** — reverse geocoding, Google Places, Street View, and vision analysis run in a background pipeline after the scan completes. On a pioneer's first scan, the client requests location context via a dedicated endpoint (`GET /api/v1/taags/{taagId}/location-context`) when the naming ceremony mounts. If enrichment data arrives during the celebration window (~2-3 seconds), the naming ceremony enhances with neighborhood context and AI name suggestions. If not, the ceremony proceeds without — location enrichment is a progressive enhancement, never a blocker. Subsequent scans of the same Taag benefit from cached enrichment data.

**3. Feedback (branching by outcome):**

| Outcome | Emotional Beat | Feedback |
|---------|---------------|----------|
| **Pioneer** (first ever scan) | Peak excitement → naming ceremony | Full celebration: confetti, fanfare, THUNK stamp. Then the naming ceremony — deliberate pacing, "this Taag is waiting for its name," name appears engraved/stamped on the Taag card. The naming IS the emotional apex, not the confetti. |
| **Already claimed** (not in a hunt) | Charged rivalry reveal | Dramatic name reveal with flair — not a label, a REVEAL. Show claimer's stats/streak for aspiration or rivalry. "You're the 47th person to find this Taag." Watchlist prompt framed as power move: "Want to know when this one's up for grabs?" |
| **Re-scan** (your claimed Taag) | Satisfaction + maintenance | Warm recognition: "Welcome back to [name]! Claim maintained." Subtle pulse confirmation. Streak counter. If someone else scanned since your last visit, mention it — "3 others visited while you were away." |
| **Repeat scan** (not yours, seen before) | Updated intelligence | Fresh context: "[Owner] hasn't been here in 3 weeks..." or "Still holding strong — [owner] visited yesterday." Drip-feed competitive intelligence. Never dismiss as "already scanned." |
| **Hunt stop** (part of active hunt) | Adventure + progression | Clue reveal animation. Progress bar advancement. "2 of 5 stops found!" |
| **Hunt stop + Pioneer** | Double payoff | Pioneer celebration + naming ceremony FIRST, then hunt progression. Two rewards stacked. |

**4. Completion:**
- Every scan ends with the Taag visible in collection (passport page updates)
- Clear "what's next" signal: nearby unclaimed codes on map, active hunt invitation, leaderboard position change
- Ambient acknowledgment of physical effort: "You've visited 3 new locations today"
- The scan is never truly "done" — it feeds into the larger loops of collection, competition, and creation

### 7.6 Scan Resilience & Edge Cases

**Camera Permission Flow:**
- Pre-permission screen framed as "activate your magic lens" — not "we want your camera"
- If denied: graceful fallback with clear path to re-enable. Never show an empty dead-end state.

**Scan Feedback System:**
- Immediate visual detection feedback before server response (frame highlight, haptic pulse, "Reading..." animation)
- Progressive failure messaging: "Hold steady..." → "Try moving closer..." → "This code might be damaged"
- Non-QR code detection: "That's a barcode — TaagBack works with QR codes. They're the square ones!"
- Never leave the user in silent failure

**Optimistic UI / Offline Resilience:**
- If API call fails: cache scan locally, queue for retry. "We're having trouble connecting — your scan is saved and we'll reveal this Taag when you're back online."
- NEVER lose a scan. A user who physically traveled to a code and scanned it must always have something to show for it.

**Server Error During Reveal:**
- The worst possible moment for a technical failure. Optimistic UI ensures the user sees scanning animation and gets a queued result rather than an error screen at peak emotional investment.

**Near-Simultaneous Pioneer Scans (Photo Finish — Phase 2):**
- Server-side: first request to complete processing wins. Race condition handled by the API.
- Winner: full pioneer celebration
- Runner-up (within ~30 seconds): "Photo Finish" special moment — "You JUST missed being the pioneer — [winner] beat you by seconds!" A story, not a loss. The Photo Finish UX treatment is Phase 2 — MVP handles the race condition server-side but runner-up sees a standard already-claimed result.

**Travel-Aware Claiming (Phase 3):**
- If location suggests user is far from their usual area, surface a gentle note at claim time: "Claiming this Taag means coming back monthly to keep it. Want to add it to your collection without claiming?"
- Collection != Claim. Informed choice preserves "consequences are content."
- Not included in MVP — added in Phase 3 after sufficient location data patterns are established.

### 7.7 Taag Lifecycle & Special States

**Active Taag** — Physical code exists, URL works, everything is live. Standard gameplay.

**Ghost Taag** — Physical code exists, but points to something dead/defunct (closed business, dead website, expired campaign). Special spooky visual treatment. Collector category — "Digital Archaeologist" badge path.

**Relic Taag** — Physical code no longer exists in the real world. Preserved only in TaagBack's databank. The last person to scan it before it disappeared receives "Last Guardian" status with a frozen permanent claim. Collecting Relics is a bragging right — proof you were out there scanning before things disappeared. The rarer they become, the more valuable your collection. "Urban Archaeologist" and "Relic Hunter" badge paths.

**Detection methods:**
- Ghost: Backend URL crawling detects dead links/closed businesses. Google Places API confirms permanently closed status.
- Relic: Passive detection after N months with zero scans from anyone + community reporting ("This code doesn't exist anymore").

### 7.8 Context-Aware Scan Responses

The scan experience subtly adapts based on where the user is, powered by async location enrichment data (Google Places, Street View, reverse geocoding) that accumulates progressively as Taags are scanned. Context-aware responses improve over time as enrichment data populates — first scans of new Taags may not have full context, but subsequent visits benefit from cached enrichment:

| Context | Emotional Tone | Emphasis |
|---------|---------------|----------|
| Dense commercial area | Competition | "47 Taags within walking distance — how many can you claim?" |
| Tourist district | Collection + hunts | "3 active hunts near you" |
| Quiet residential/rural | Pioneer discovery | "You're exploring uncharted territory" |
| Campus/school | Social + hunts | "Your classmates are playing" |

**Frontier vs. Metro Mode:**
- **Frontier** (low local Taag density): Emphasize discovery, pioneering, building. Explorer energy. "You're mapping new territory."
- **Metro** (high local Taag density): Emphasize rivalry, strategy, competition. Territory energy. "This block is contested."

The app detects local density and adjusts nudges, messaging, and feature emphasis accordingly. Solo pioneer in a quiet area feels like an explorer, not a lonely player.

**Location enrichment feeds (progressive — data accumulates asynchronously after scans):**
- AI name suggestions ("You're at Blue Bottle Coffee on 4th Ave" → suggests "Fourth Wave") — available during naming ceremony if enrichment completes in time, otherwise naming proceeds without
- Taag profile cards (auto-populated storefront photo, business category, neighborhood name) — populated as enrichment data arrives
- Auto-categorization (URL analysis + location context = high confidence)
- Hunt builder palette (creators see rich context around each Taag)
- Ghost Taag detection (Google Places confirms permanently closed)

### 7.9 Claim Maintenance & Grace

**Re-scan Framing:**
- Introduced at peak emotional investment (right after naming ceremony) as a POWER, not a chore: "Claim this Taag to put your name on it. Come back monthly and it stays yours."
- Ownership as reward, maintenance as privilege — never obligation.
- Notification framing: "Your Taag is waiting for you" — not "Your claim expires in 3 days."

**Hard 30-Day Cutoff:**
- Claims expire after exactly 30 days with no grace period. Pre-expiration warning fires at ~29 days (1 day before deadline), giving the holder one last chance to re-scan.
- If the holder doesn't re-scan before the 30-day mark, the Taag immediately becomes contestable and open to all.
- Preserves "consequences are content" — the stakes are real, and that's what makes the mechanic meaningful.

**Account-First Core Experience:**
- Account creation happens on first app launch as a signature UX moment — a delightful "passport issuance" ceremony, not a form.
- Age gate is naturally integrated into the account creation flow on first launch.
- With an account already created, the full three-beat scan experience (Scan → Discover → Claim/Name) flows uninterrupted from the very first scan.

---

## 8. Visual Design Foundation

### 8.1 Color System

**Philosophy:** Dark-first, neon-accented, CRT-glow inspired. The palette feels like a 90s arcade cabinet that got a modern firmware update — moody backgrounds with punchy, electric color moments. Not dark mode as an afterthought — dark as the DEFAULT canvas, because the game layer glows brighter against darkness.

**Core Palette:**

| Role | Token | Value | Description |
|------|-------|-------|-------------|
| Background Primary | `bg-primary` | ~#0A0A0F | Near-black with warm undertone. Worn CRT screen, not clinical. |
| Background Secondary | `bg-secondary` | ~#161622 | Slightly lifted dark for cards, panels. Depth without breaking canvas. |
| Background Tertiary | `bg-tertiary` | ~#1E1E2E | Subtle surface elevation for nested elements, inputs, wells. |
| Background Warm (Collection) | `bg-warm` | ~#1A1820 | Warmer undertone for passport/collection screens. The analog world. |
| Map Neutral | `bg-map` | ~#12121C | True neutral dark for map canvas. Neither Game nor Collection world. |
| Text Primary | `text-primary` | ~#F0EDE8 | Off-white with warmth. Aged paper white, not clinical. |
| Text Secondary | `text-secondary` | ~#9893A3 | Muted but readable. Metadata, timestamps, secondary labels. |
| Text Disabled | `text-disabled` | ~#4A4458 | Low contrast for inactive states. |

**Accent Palette — The Neon Rack:**

| Role | Token | Value | Emotion | Behavior Driver |
|------|-------|-------|---------|----------------|
| Pioneer Gold | `accent-pioneer` | ~#FFD166 | Excitement, discovery | Scan more, explore |
| Claim Cyan | `accent-claim` | ~#72F2EB | Ownership, pride | Defend territory, maintain claims |
| Rival Magenta | `accent-rival` | ~#FF6B9D | Competition, rivalry | Watchlist, snipe, compete |
| Hunt Green | `accent-hunt` | ~#4ADE80 | Adventure, curiosity | Follow clues, complete hunts |
| Alert Amber | `accent-alert` | ~#FB923C | Urgency, time pressure | Re-scan, maintain, return |
| Ghost Purple | `accent-ghost` | ~#A78BFA | Mystery, intrigue, rarity | Collect rarities, explore history |

**Color Lifecycle Progression:**
The dominant accent color a user sees naturally shifts as they mature — an emergent property of the game mechanics:
- **New user:** Pioneer Gold dominates (everything's undiscovered)
- **Growing user:** Rival Magenta increases (more stuff is claimed by others)
- **Regular user:** Claim Cyan dominates their collection (ownership, pride)
- **Power user:** Alert Amber appears (claims to maintain) + Hunt Green (hunts to build/play)
- **Veteran:** Ghost Purple and Relic states emerge (the collector's endgame)

If a user opens the app and their screen is dominated by Ghost Purple, they've been playing for a LONG time. The color tells their story.

**Semantic Colors:**

| Semantic | Maps To | Context |
|----------|---------|---------|
| Success | Hunt Green | Completed actions, successful scans, claim maintained |
| Warning | Alert Amber | Expiring claims, pre-expiration warnings, soft alerts |
| Error | Rival Magenta (desaturated) | Failed scans, connection errors, content moderation |
| Info | Claim Cyan (dimmed) | Informational tooltips, onboarding hints |

**CRT Glow System (Progressive Enhancement):**
Neon accents GLOW at peak emotional moments (Volume Knob level 2-3). Colored shadows with 30-50% opacity, 8-16px blur radius. CRT phosphor bloom effect.

| Device Tier | Glow Treatment |
|-------------|---------------|
| High-end (GPU capable) | Full CRT glow — colored shadows, blur, bloom on celebrations |
| Mid-range | Simplified glow — single-layer colored shadow, reduced blur radius, no bloom |
| Low-end | No glow — accent colors used as solid borders or backgrounds instead |

Glow is earned atmosphere, not default. Color conveys meaning at every tier — glow is enhancement only.

**Sunlight Adaptation Strategy:**
Dark UIs wash out in direct sunlight. TaagBack is an outdoor app.
- **Day 1:** Ensure all text contrast is sufficient at maximum screen brightness. Neon accents on dark bg naturally help.
- **Fast Follow:** Ambient light sensor adaptation — in bright outdoor conditions, raise background luminance slightly (#0A0A0F → #1A1A28), increase text contrast, reduce glow effects. Not a "light mode" — a sunlight adaptation that preserves the dark-first identity.

**Contrast & Accessibility:**
- All text-on-background combinations meet WCAG AA minimum (4.5:1 body, 3:1 large text)
- Neon accents on dark backgrounds naturally produce high contrast
- Cyan/magenta/gold accent trio avoids common color vision deficiency conflicts
- No information conveyed by color alone — icons, labels, or patterns always accompany color states
- Glow effects are decorative; `prefers-reduced-motion` kills all pulsing (static glow preserved)
- **Flash budget:** No more than 2 brightness transitions per second in any glow effect. Lottie animations audited against this threshold.

**Two Accent Maximum Rule:**
Any single screen uses at most two dominant accent colors. Others appear only as small badges/indicators.

| Screen | Primary Accent | Secondary Accent | Others (subdued) |
|--------|---------------|-----------------|-----------------|
| Scan result (Pioneer) | Pioneer Gold | — | — |
| Scan result (Claimed) | Rival Magenta | Claim Cyan (if in collection) | — |
| Collection/Passport | Claim Cyan (owned) | Ghost Purple (ghosts/relics) | Others as small dots |
| Leaderboard | Claim Cyan (you) | Rival Magenta (others) | Pioneer Gold for #1 only |
| Hunt progress | Hunt Green | Pioneer Gold (if pioneer a stop) | — |
| Maintenance/alerts | Alert Amber | Claim Cyan (your Taags) | — |

### 8.2 Typography System

**Philosophy:** Monospace as identity, sans-serif as workhorse. Space Mono is TaagBack's VOICE — it says terminal, arcade, hacker, explorer's field notes. Inter is the invisible enabler that makes everything readable.

**Font Pairing:**

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| Display / Headers | Space Mono | `'Courier New', monospace` | App title, screen headers, stats, counters, player handles |
| Body / Content | Inter | `system-ui, sans-serif` | Clue text, hunt descriptions, onboarding copy, long-form content |
| Accent / Special | Space Mono (italic/bold) | — | Taag names on detail views, celebration text |

**Monospace Budget (~30%):** Space Mono should appear on no more than ~30% of any screen's text content by area. It's the accent voice, not the workhorse. Headers, stats, and handles in monospace. Everything else in Inter. If more than a third of a screen is monospace, rebalance.

**Context Rule:** Use Inter for Taag names in list/compact views where character width matters. Reserve Space Mono for Taag names in detail views and headers where width isn't constrained.

**Type Scale (4px base unit, ~1.25 modular scale):**

| Token | Size | Weight | Line Height | Font | Use |
|-------|------|--------|-------------|------|-----|
| `text-display` | 32px | Bold | 1.1 | Space Mono | Celebration headlines, peak moments |
| `text-h1` | 24px | Bold | 1.2 | Space Mono | Screen titles |
| `text-h2` | 20px | Semibold | 1.25 | Space Mono | Section headers, Taag names (detail) |
| `text-h3` | 16px | Semibold | 1.3 | Inter | Card titles, list headers |
| `text-body` | 16px | Regular | 1.5 | Inter | Clue text, descriptions, narratives |
| `text-caption` | 13px | Regular | 1.4 | Inter | Metadata, timestamps, secondary info |
| `text-micro` | 12px | Medium | 1.3 | Inter | Badges, tags, stat labels |
| `text-stat` | 20px | Bold | 1.1 | Space Mono | Numbers, counters, leaderboard scores |

Note: `text-body` bumped to 16px (from 15px) for readability during distracted/outdoor reading. `text-micro` floored at 12px (from 11px) for 35+ readability. All label components tested at 1.5x system font scale.

**TaagBack Display Treatment:**
At `text-display` size (32px+) during celebrations and branding, Space Mono gets the full treatment:
- Expanded letter-spacing (tracking)
- CRT glow effect behind each character (at Volume Knob 2+)
- ALL-CAPS
- Subtle distress texture overlay (at Volume Knob 3)

This creates a magazine masthead / deck-art logo feel. The Thrasher rule: display treatment ONLY at display scale, ONLY at peak moments.

### 8.3 Iconography

**System:** Phosphor Icons (open source, six weights from thin to duotone).

| Context | Weight | Rationale |
|---------|--------|-----------|
| Default UI | Bold | Chunky, almost retro-game feel. The TaagBack voice in icon form. |
| Interactive/selected states | Duotone | Two-tone treatment maps to accent color system. Selected items glow with color. |
| Disabled/inactive | Light | Clearly diminished, maintains recognizability |

Phosphor's bold weight has the visual density that matches TaagBack's stamp/sticker aesthetic. The duotone variant enables accent-color-on-neutral-fill combinations that reinforce the neon-on-dark visual language.

### 8.4 Corner Radius Strategy — Two Families

**Terminal Corners (0-4px radius):**
For game-system elements — leaderboards, stat readouts, scan results, data displays, system notifications. The "computer" world. Sharp, precise, digital.

**Sticker Corners (12-16px radius or full-round):**
For collectible/personal elements — TaagCards, badges, passport stamps, profile avatars, collection items. The "physical artifact" world. Rounded, tactile, warm.

**The rule:** Whose data is it? System/competitive data = Terminal. Personal/owned data = Sticker. Mixed screens: container uses Terminal, embedded personal items use Sticker. The two-worlds concept expressed through geometry alone.

**Load-bearing signal:** Corner radius + background tone carry the two-worlds distinction at EVERY device tier. These never degrade. Glow is enhancement only.

### 8.5 Spacing & Layout Foundation

**Base Unit:** 4px — aligns with stamp/sticker grid, fine-grained control.

**Spacing Scale:**

| Token | Value | Use |
|-------|-------|-----|
| `space-xs` | 4px | Tight gaps — icon-to-label, inline elements |
| `space-sm` | 8px | Inner padding — compact cards, badge interiors |
| `space-md` | 12px | Standard padding — card content, list item padding |
| `space-lg` | 16px | Section gaps — between cards, component margins. ClueCard minimum inner padding. |
| `space-xl` | 24px | Major sections — screen section dividers |
| `space-2xl` | 32px | Screen-level padding — top/bottom breathing room |
| `space-3xl` | 48px | Hero spacing — celebration moments, ceremony pacing |

**Layout Principles:**

1. **Dense but not cramped.** Screens feel like a rich game board, not a sparse settings page. But touch targets never compromised (minimum 44x44px, primary actions 56-64px).
2. **Passport grid alignment.** Collection views establish a consistent stamp grid that echoes across screens. The spatial signature of TaagBack.
3. **Breathing room at emotional peaks.** Volume Knob high = spacing EXPANDS. Celebrations get `space-3xl`. Efficiency screens stay compact.
4. **Edge-to-edge for immersion, padded for content.** Camera/scan screens go full bleed. Content screens use `space-lg` to `space-xl` side margins.
5. **Thumb-zone awareness.** Primary actions in bottom third. Navigation and context at top. Content in the middle. Critical for one-handed use while walking.

**Component Spacing Relationships:**

| Context | Inner Padding | Gap Between | Outer Margin |
|---------|--------------|-------------|--------------|
| TaagCard | `space-md` | `space-sm` | — |
| PassportPage grid | `space-sm` | `space-sm` | `space-lg` |
| List items | `space-md` | `space-xs` divider | `space-lg` |
| ClueCard | `space-lg` | `space-lg` | `space-xl` |
| Modal/overlay | `space-xl` | `space-lg` | `space-2xl` |
| Celebration screen | `space-3xl` | `space-xl` | `space-2xl` |

### 8.6 Visual Texture System (Volume Knob Manifest)

One knob controls all intensity-linked visual systems in lockstep:

| Volume | Grain | Glow | Celebration Art | Display Type | Sound | Haptics |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **0 — Clean** | None | None | Simple icon + text | Space Mono plain | None | None |
| **1 — Ambient** | Subliminal noise | Faint color shadow | Static graphic | + tracking | Soft chirp | Light tap |
| **2 — Styled** | Visible grain | Full colored shadow + blur | Animated graphic | + tracking + glow | Full sound | Medium pulse |
| **3 — Immersive** | VHS grain + scan lines + tracking glitch | Full bloom + pulse | Deck-art reveal sequence | + tracking + glow + distress | Layered sound + fanfare | Heavy rumble |

VHS texture mapping:
- **Clean** = HD digital (modern skate video) — pure utility, maximum clarity
- **Ambient** = MiniDV (late 90s) — subliminal noise grain, almost unnoticeable
- **Styled** = VHS (early 90s) — visible grain, color shift on transitions, scan-line hints
- **Immersive** = Tracking-error VHS (beat-up tape) — full grain, CRT scan lines, tracking-glitch transitions, date-stamp metadata overlays

All texture effects are progressive enhancement. Low-end devices skip them. The app works perfectly at Volume 0.

### 8.7 Multi-Sensory Accent Palette

Each accent color has a complete sensory binding — color + sound + haptic = unified moment:

| Accent | Sound Signature | Haptic Pattern | Visual Animation |
|--------|----------------|---------------|-----------------|
| Pioneer Gold | THUNK stamp impact | Heavy single pulse | Confetti + stamp engrave |
| Claim Cyan | Confirmation chirp | Light crisp tap | Subtle cyan pulse/glow |
| Rival Magenta | Tension note (minor key) | Quick double-tap | Dramatic name reveal |
| Hunt Green | Adventure fanfare | Rising crescendo pulses | Clue unfold / progress fill |
| Alert Amber | Warm clock chime | Two slow pulses (tick... tick...) | Subtle breathing animation (slow brightness pulse) |
| Ghost Purple | Eerie whisper tone | Soft lingering vibration | Glitch shimmer / static crackle |

### 8.8 Collection Display Modes

**Gallery Mode (default):** The sticker bomb. Accumulation-as-beauty.
- 1-5 Taags per page: clean grid, breathing room. The new collector.
- 6-12 Taags: stamps overlap slightly at edges, page feels FULL. Growing explorer.
- 13+: sticker bomb density. Stamps layered, slightly rotated, edges peeking out. The well-traveled passport / skater's laptop lid.
- Visual richness IS the status. New accounts are clean. Veterans are COVERED.
- Glance Test does NOT apply — this is an emotional view for browsing, admiring, showing off.
- Implementation: NativeWind rotation utilities, slight position offsets, z-index layering.

**Index Mode (toggle):** The clean database.
- Clean grid, no overlap, no rotation, sorted/filterable. Search bar at top.
- Terminal corner treatment (it's a data view).
- Glance Test APPLIES — pure utility for finding specific Taags.
- Essential at scale (500+ Taags).
- One tap to toggle between modes via icon in corner.

### 8.9 Badge Visual Language

Badges look like **die-cut stickers**, not app icons:
- Irregular shapes (not uniform circles or squares)
- Bold 2px outline in relevant accent color
- Interior filled with simplified deck-art-style graphic
- Slight drop shadow suggesting physical thickness (sticker ON a surface)
- On profiles: arranged with slight rotation variance — like stickers on a laptop lid
- **Earn animation:** "Peel and stick" — badge peels off the celebration screen and sticks onto your profile

### 8.10 Map Pin State Matrix

Map pins use three visual dimensions to handle 6-7 Taag states without color overload:

| State | Color | Shape | Opacity/Style |
|-------|-------|-------|--------------|
| Your claimed Taag | Claim Cyan | Rounded (Sticker) | 100%, warm glow |
| Others' claimed Taag | Rival Magenta | Diamond (Terminal) | 100%, no glow |
| Unclaimed Taag | Ghost Purple | Circle outline | 60%, no fill — the invitation |
| Ghost Taag | Ghost Purple | Diamond + glitch texture | 80%, static shimmer |
| Relic Taag | Ghost Purple | Cracked/broken shape | 40%, faded |
| Active hunt stop | Hunt Green | Pulsing circle | 100%, pulsing animation |
| Completed hunt stop | Hunt Green | Checkmark overlay | 70%, settled |

Map canvas is neutral dark (#12121C) — the meeting ground where both visual worlds coexist.

### 8.11 Visual Consistency

**TaagBack Visual Litmus Test:**
> *"Does this element feel like it belongs in a 90s explorer's toolkit that got a screen upgrade?"*

If it could exist in a geocaching device designed in 1997 but manufactured today — it belongs. If it feels like iOS Settings or Material Design — it doesn't. If it feels like a movie prop from Hackers — too far.

**Glance Test:**
All non-celebration screens must deliver key information in under 2 seconds while walking. If the aesthetic is winning over the function, simplify. Celebration screens are exempt — those ARE the atmosphere.

### 8.12 Accessibility Summary

- WCAG AA contrast on all text (4.5:1 body, 3:1 large)
- No information by color alone — always paired with shape, icon, or label
- Flash budget: max 2 brightness transitions/sec on all glow and animation
- `prefers-reduced-motion`: kills pulsing, tracking glitches, VHS effects. Static glow and basic transitions preserved.
- `text-micro` floored at 12px, all labels tested at 1.5x system font scale
- ClueCard elevated readability: `bg-tertiary` minimum, 16px text, `space-lg` padding, generous line height
- Touch targets: 44x44px minimum, 56-64px for primary actions
- Progressive enhancement: full visual system works without glow, grain, or animation on low-end devices
- Corner radius + background tone are load-bearing two-worlds signals — never degrade across device tiers

---

## 9. Design Direction Decision

### 9.1 Design Directions Explored

Six directions were generated as an interactive HTML showcase (`ux-design-directions.html`), each applying TaagBack's visual foundation to a different screen context and Volume Knob level. Rather than competing alternatives, these represent the same visual system expressing itself across different emotional contexts.

| Direction | Screen Context | Volume Level | Role in the App |
|-----------|---------------|:---:|---|
| Full Arcade | Pioneer celebration / naming ceremony | Max | Peak moments — celebrations, milestones, hunt completion |
| Clean Explorer | Scan result (already claimed) | Off | Utility baseline — daily use screens, Glance Test compliant |
| Passport Forward | Collection / stamp grid | On | Personal world — browsing your collection, Gallery Mode |
| Terminal Hacker | Leaderboard / stats | Off-On | Competition world — rankings, data views, player comparison |
| Balanced Blend | Hunt discovery / navigation | On | Daily hub — both worlds harmonized |
| Skate Zine | Profile / badges | On | Identity expression — stickers, stats, personality |

### 9.2 Chosen Direction: Contextual System

All six directions are ONE design system expressed at different intensities and in different screen contexts. The visual system adapts based on three factors:

1. **Visual Mode** — which of three modes the screen operates in
2. **Volume Knob level** — the intensity of visual effects within the mode's allowed range
3. **World assignment** — whether the content is Game (competitive/system) or Collection (personal)

### 9.3 Three Visual Modes

Every screen declares one of three modes. Components read mode from React context and render variants accordingly.

**Utility Mode** — For screens where information > atmosphere.
- Terminal corners everywhere (regardless of world-assignment)
- No glow, no grain, no texture
- Minimal animation (state transitions only)
- Inter-dominant typography, Space Mono for stats only
- Compact spacing (`space-sm` to `space-md`)
- Volume Knob locked to: Off

**Experience Mode** — The default for most screens. The daily-use layer.
- Mixed corners (world-assignment applies: personal = Sticker, system/rival = Terminal)
- Background tone is world-dependent (bg-warm for Collection, bg-primary for Game)
- Subtle glow allowed, moderate grain
- Mixed typography per monospace budget
- Standard spacing (`space-md` to `space-lg`)
- Volume Knob locked to: On

**Celebration Mode** — Peak emotional moments only.
- World-assignment applies for corners
- Dark bg-primary canvas (maximum contrast for effects)
- Full glow bloom, VHS grain and scan lines at Max
- Space Mono gets Display treatment (tracking + glow + ALL-CAPS + distress at Max)
- Generous spacing (`space-xl` to `space-3xl`)
- Volume Knob range: On or Max

**Two mode-independent components:** CelebrationOverlay and ScanTransition always bring their own Celebration mode as full-screen takeovers, regardless of the screen's declared mode.

### 9.4 Volume Knob Manifest (3 Levels)

One knob controls all intensity-linked systems in lockstep:

| Volume | Grain | Glow | Celebration Art | Display Type | Sound | Haptics |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Off** | None | None | Simple icon + text | Space Mono plain | None | None |
| **On** | Subtle visible grain | Colored shadow + blur | Animated graphic | + tracking + glow | Full interaction sounds | Medium pulse |
| **Max** | VHS grain + scan lines + tracking glitch | Full bloom + pulse | Deck-art reveal sequence | + tracking + glow + distress | Layered sound + fanfare | Heavy rumble |

**Effects toggle:** ON or OFF. Based on `prefers-reduced-motion` system setting or manual "Reduce Effects" toggle in Settings. No runtime device detection. Effects OFF = Volume locked to Off regardless of mode.

### 9.5 Mode-Ceiling and World-Assignment Rules

**Corner rule (one sentence):** Utility screens = Terminal corners everywhere. Experience/Celebration screens = world-assignment applies (your data = Sticker, rival/system data = Terminal).

**Accent colors are ALWAYS world-assigned** regardless of mode. Your data = Claim Cyan, rival data = Rival Magenta, unclaimed = Ghost Purple, hunt = Hunt Green, etc.

**Two accent maximum per screen.** Full palette used across the app, but any single view uses at most two dominant accent colors. Others appear only as small indicators.

### 9.6 Emotional Airlock Rule

**Never transition directly from Celebration mode to Utility mode.** Always pass through Experience mode as a cool-down beat.

Flow: Celebration (peak) → Experience summary card (3-5 seconds, pride/settling) → tap to continue → Utility or Experience destination.

Example: Pioneer naming ceremony (Celebration, Max) → "Your Taag is born" summary showing Taag in Sticker form (Experience, On) → Collection or scan details.

### 9.7 Key Reveals on Utility Screens

Utility screens use standard entrance animations with accent-colored emphasis for emotionally significant reveals (rivalry name reveal, scan count, watchlist confirmation). Brief glow that fades to resting state. No formal micro-moment system — just good animation practice using Reanimated.

### 9.8 Screen-to-Mode Mapping

| Screen | Mode | Volume Default |
|--------|------|:-:|
| Camera / Scan | Experience | On |
| Pioneer Celebration | **Celebration** | Max |
| Scan Result (any) | Utility | Off |
| Collection (Gallery) | Experience | On |
| Hunt List / Discovery | Experience | On |
| Hunt Active (clue) | Experience | On |
| Hunt Completion | **Celebration** | Max |
| Leaderboard | Utility | Off |
| Profile / Badges | Experience | On |
| Map | Experience | On |
| Settings / Account | Utility | Off |
| Milestone Achievement | **Celebration** | On-Max |
| Camera Permission | Experience | On |
| Camera Denied | Utility | Off |

### 9.9 Collection Display

**Gallery Mode only on Day 1.** The emotional passport view. Index Mode (search/filter/sort grid) added in Phase 4 or auto-surfaces when user crosses 50+ Taags.

**Two density tiers:**
- **Clean grid (1-8 Taags):** Organized stamps with breathing room. Empty slots show ghost-impression "?" watermarks with faint QR code pattern — invitation, not void.
- **Sticker bomb (9+ Taags):** Stamps layered, slightly rotated, edges overlapping. The jump from clean to sticker bomb IS a moment. Beautiful chaos = status.

**"Fresh ink" glow:** Newly added TaagCards get a brief Pioneer Gold shadow that fades over ~5 seconds. Only triggers when arriving from the emotional airlock summary.

### 9.10 Sound Binding Rollout

| Phase | Accent | Sound |
|-------|--------|-------|
| Day 1 | Pioneer Gold | THUNK stamp impact |
| Day 1 | Claim Cyan | Confirmation chirp |
| Day 1 | Hunt Green | Adventure fanfare / completion crescendo |
| Fast Follow | Alert Amber | Warm clock chime |
| Fast Follow | Ghost Purple | Eerie whisper tone |
| Fast Follow | Rival Magenta | Tension note (minor key) |

### 9.11 Implementation Phases

**Phase 0 — Foundation (~1 day)**
`tailwind.config.js` with all design tokens, font loading (Space Mono + Inter via Expo Google Fonts), Phosphor Icons setup (bold default, duotone for interactive), Mode context provider, base component variants.

**Phase 1 — Utility Mode (~1-2 weeks)**
Scan Result, Collection (Gallery with clean grid only), Leaderboard, Settings. TaagCard utility variant, ClueCard basic. Functional app with consistent dark canvas + neon accents.

**Phase 2 — Experience Mode (~2-3 weeks)**
Camera/Scan, Gallery Mode with sticker bomb density, Hunt List, Hunt Active, Map, Profile/Badges. PassportPage, TaagCard experience variant, ClueCard full, world-assignment rendering, subtle glow, Gallery density tiers, empty slot ghost-impressions. **App is shippable after this phase.**

**Phase 3 — Celebration Mode (~1-2 weeks)**
CelebrationOverlay (Pioneer, Hunt Complete, Milestone variants), ScanTransition, VisaStamp, Display typography treatment, deck-art celebration graphics (10-15 assets), sound library (3 Day 1 sounds), emotional airlock summary card, fresh ink glow. **Minimum 3 confetti variations + 2-3 deck-art graphics for variety injection.**

**Phase 4 — Polish (ongoing)**
Sunlight adaptation, remaining 3 sound bindings, VHS texture overlays, badge peel-and-stick animation, Index Mode collection (triggered at 50+ Taags), celebration variety expansion, dynamic type scaling testing, "Reduce Effects" settings toggle.

### 9.12 First-Time User Visual Journey (Validated)

| Moment | Mode | Volume | Emotional Arc | Transition |
|--------|------|:---:|---|---|
| Open app | Experience | On | Anticipation | — |
| Passport Issuance (registration) | Celebration | On-Max | Initiation, belonging — "I'm joining something" | Smooth, deliberate |
| Camera permission | Experience | On | Brief friction | Smooth |
| Camera active | Experience | On | Calm, ready | Smooth |
| Code detected | Experience | On | Excitement building | Frame highlight + haptic |
| ScanTransition | Celebration | On→Max | Excitement peaks | Intentional jump |
| Pioneer celebration | Celebration | Max | MAXIMUM JOY | Sustained peak |
| Naming ceremony | Celebration | Max | Creative ownership | Sustained peak |
| Cool-down summary | Experience | On | Pride, settling | Airlock — smooth descent |
| Scan 2 (pioneer) | Celebration | Max | Joy + mastery (varied celebration) | Natural repeat |
| Scan 3 (claimed) | Utility + entrance anim | Off | Rivalry + curiosity | Appropriate contrast |
| Collection view | Experience | On | Pride + aspiration | Warm, inviting |

Visual journey validated end-to-end. All mode transitions are either smooth gradients or intentional dramatic jumps. No dead ends, no jarring unintended shifts.

---

## 10. User Journey Flows

### 10.1 The Wanderer's First Discovery (Mia)

**Entry:** Mia opens TaagBack for the first time after installing via a friend's shared screenshot.

```mermaid
flowchart TD
    A[App Launch] --> AA[Registration: Passport Issuance Ceremony<br/>Age gate integrated naturally<br/>Celebration mode - signature UX moment]
    AA --> B{Camera Permission?}
    B -->|Already Granted| D[Camera Active - Experience Mode]
    B -->|Not Yet Asked| C["Activate Your Magic Lens" screen]
    C --> B2{User Grants?}
    B2 -->|Yes| D
    B2 -->|No| E[Camera Denied - Utility Mode<br/>"TaagBack sees through your camera"<br/>Open Settings button]
    E --> B2

    D --> F{Location Permission?}
    F -->|Already Granted| H[Ready to Scan]
    F -->|Not Yet Asked| G[Location prompt<br/>just-in-time on first scan]
    G --> F2{User Grants?}
    F2 -->|Yes| H
    F2 -->|No| H2[Can scan but no placement<br/>Degraded experience]

    H --> I[Mia points at QR code]
    I --> J[Frame highlight + haptic pulse<br/>"Code detected"]
    J --> K[ScanTransition fires<br/>Celebration mode takeover]

    K --> L{Code in databank?}
    L -->|No - PIONEER| M[Full Pioneer Celebration<br/>Confetti + THUNK + fanfare<br/>Display type: "YOU'RE THE FIRST!"]
    L -->|Yes - Claimed| N[Rivalry Reveal<br/>Entrance animation on name<br/>Rival Magenta accent]
    L -->|Yes - Unclaimed| O[Discovery Celebration<br/>Less intense than Pioneer<br/>but still a win]

    M --> P[Naming Ceremony<br/>Deliberate pacing<br/>"This Taag is waiting for its name"]
    P --> R[Name input + AI suggestions<br/>Tap to select or custom]
    R --> T[Name engraved on TaagCard<br/>THUNK stamp animation<br/>Emotional apex]
    T --> U[Re-scan explanation<br/>"Come back monthly to keep it"<br/>Introduced as POWER not chore]
    U --> V[Emotional Airlock<br/>"Your Taag is born" summary<br/>Experience mode, Volume On]
    V --> W[Collection or "Scan Another?" prompt]

    N --> X[Show Taag details<br/>Name + claimer + stats<br/>"You're the 12th to find this"]
    X --> Y[Watchlist prompt as power move<br/>"Want to know when it's up for grabs?"]
    Y --> Z[Added to collection<br/>Utility mode]
    Z --> W

    O --> O2[Claim prompt<br/>"Nobody owns this yet - want it?"]
    O2 -->|Claim| P
    O2 -->|Just Collect| Z

    W --> AA{Scan more?}
    AA -->|Yes| I
    AA -->|Browse Collection| AB[Gallery Mode - Experience<br/>Stamps visible, empty slots beckon]
    AA -->|Check Leaderboard| AC[Leaderboard - Utility<br/>"#1 in your neighborhood!"]
```

**Key flow decisions:**
- Account creation happens immediately on first launch as a signature "passport issuance" ceremony — age gate integrated naturally
- Camera + location permissions are sequential, just-in-time, not stacked at launch
- With account already created, the full scan-to-claim flow is uninterrupted from the first scan
- Pioneer and Already-Claimed are equally designed paths, not main vs. fallback
- Naming ceremony has its own distinct pacing separate from the celebration
- Emotional airlock always follows celebration before returning to utility screens
- "Scan Another?" prompt keeps the loop spinning

### 10.2 The Adventurer's Hunt Experience (Jake)

**Entry:** Jake scans a Taag that happens to be part of an active hunt.

```mermaid
flowchart TD
    A[Jake scans a Taag] --> B[Normal Taag processing<br/>Pioneer/Claimed/etc.]
    B --> C{Taag is part of active hunt?}
    C -->|No| D[Standard scan result]
    C -->|Yes| E[Hunt invitation appears<br/>"This Taag is part of: Campus Cryptic<br/>Want to join?"]

    E --> F{Accept hunt?}
    F -->|Not now| D
    F -->|Join| G[Safety/TOU Gate<br/>First-time: must accept<br/>Subsequent: reminder only]
    G --> H[Hunt begins<br/>First clue appears on ClueCard<br/>Experience mode, Volume On]

    H --> I[Player reads clue<br/>Thinks, navigates real world]
    I --> J[Finds QR code, scans it]
    J --> K{Correct stop?}
    K -->|Wrong code| L["That's not part of this hunt"<br/>But still processes as normal Taag scan<br/>Nothing is wasted]
    L --> I
    K -->|Correct| M{Is this also a Pioneer?}
    M -->|Yes| N[Pioneer celebration FIRST<br/>Then hunt progression]
    M -->|No| O[Hunt stop celebration<br/>Progress indicator updates]

    N --> O
    O --> P{More stops remaining?}
    P -->|Yes| Q[Next clue reveals on ClueCard<br/>Locked to Active transition animation]
    Q --> I
    P -->|No - FINAL STOP| R[Screen goes BLACK<br/>Dramatic pause... 2-3 seconds]

    R --> S[Blackout Crescendo<br/>Fanfare CRESCENDOS<br/>Confetti + fireworks<br/>Celebration mode, Volume Max]
    S --> T[Creator's completion message<br/>"Congrats! - Sarah_Creates"]
    T --> U[Hunt completion stats<br/>Time, stops, your rank]
    U --> V[VisaStamp animation<br/>Hunt stamp added to passport]
    V --> W[Emotional Airlock<br/>Summary card - Experience mode]
    W --> X["Create your own hunt?" prompt<br/>Player-to-Creator pipeline nudge]

    X -->|Maybe later| Y[Return to normal scanning]
    X -->|Yes| Z[Hunt creation flow]
```

**Key flow decisions:**
- Hunt discovery is ORGANIC — through scanning a Taag that's in a hunt, not browsing a catalog
- Wrong-code scans still process as normal Taags — nothing is wasted
- Pioneer + hunt stop can stack (double reward)
- No progress counter during active hunt (preserve the mystery) — but ClueCard locked/active/solved states give subtle progress
- Blackout crescendo has a REAL pause — 2-3 seconds of black screen builds tension
- Player-to-creator nudge at maximum engagement (just completed a hunt)

### 10.3 The Creator Builds a Hunt (Sarah)

**Entry:** Sarah taps "Create Hunt" or is prompted after completing a hunt.

```mermaid
flowchart TD
    A["Create Hunt" tapped] --> B[Hunt metadata<br/>Title + description<br/>Experience mode]
    B --> C[Hunt enters DRAFT state]
    C --> D{Building mode?}

    D -->|Field Mode| E[Camera activates with draft context<br/>"Scan Taags to add stops"]
    E --> F[Sarah walks to location, scans Taag]
    F --> G{Taag already in system?}
    G -->|Yes| H[Taag card shows + "Add as stop?"]
    G -->|No - Pioneer!| I[Pioneer flow first<br/>Then "Add as stop?"]
    H --> J[Add stop to sequence]
    I --> J
    J --> K[Write clue for this stop<br/>ClueCard editor<br/>AI suggestions available post-MVP]
    K --> L{Add more stops?}
    L -->|Yes| E
    L -->|Done / Switch mode| M[Review sequence]

    D -->|Couch Mode| N[Map view opens<br/>Shows all sourced Taags in area<br/>Neutral canvas + pin matrix]
    N --> O[Sarah taps a Taag pin on map]
    O --> P[Taag details popup<br/>"Add as stop?"]
    P --> J2[Add stop to sequence]
    J2 --> K2[Write clue for this stop]
    K2 --> L2{Add more stops?}
    L2 -->|Yes - tap another pin| O
    L2 -->|Done / Switch mode| M

    D -->|Hybrid| E
    E -.->|Switch to couch| N
    N -.->|Switch to field| E

    M --> Q[Reorder stops<br/>Drag to rearrange sequence<br/>See route form on map]
    Q --> R[Write completion message<br/>"What do players see when they finish?"]
    R --> S[Preview hunt<br/>Walk through clues as player would see them]
    S --> T{Publish?}
    T -->|Edit more| M
    T -->|Publish| U[Hunt goes LIVE<br/>Deep link generated<br/>Celebration: "Your hunt is live!"]
    U --> V[Share options<br/>Copy link, text, social]
    V --> W[Creator dashboard<br/>Starts showing stats as players engage]
```

**Key flow decisions:**
- Field and couch modes are switchable mid-creation — hybrid is the natural workflow
- Pioneering a Taag during hunt creation gives the creator the full celebration (they're a player too)
- Clue writing happens per-stop, in context (not a bulk editing screen)
- Sequence is reorderable via drag with live route preview on map
- Preview mode lets creators experience their own hunt before publishing
- Deep link generation is automatic at publish — no separate step
- Creator dashboard surfaces immediately after publish (even with 0 completions, show "waiting for players")

### 10.4 The Contested Taag (Dave to Mia)

**Entry:** Dave's monthly re-scan window expires.

```mermaid
flowchart TD
    A[System: Dave's claim approaching expiry<br/>~29 days since last re-scan] --> B[Pre-expiration warning fires<br/>1 day before deadline]

    B --> C[Push notification to Dave<br/>"Your Taag 'Lucky's Corner' needs you!<br/>Re-scan before tomorrow to keep it"]

    C --> E{Dave re-scans before 30-day mark?}
    E -->|Yes| F[Claim maintained<br/>"Welcome back! Claim renewed"<br/>Re-scan chirp + light haptic]
    E -->|No - 30 days reached| G[Taag becomes CONTESTABLE<br/>Immediately open to all]

    G --> H[Push notification to watchlisters<br/>"A Taag on your watchlist is<br/>now up for grabs: Lucky's Corner"]
    G --> I[Push notification to Dave<br/>"Your Taag 'Lucky's Corner'<br/>has been released"]

    H --> J[Mia gets watchlist alert]
    J --> K[Mia goes to location, scans code]
    K --> L[Re-claim celebration<br/>Less intense than Pioneer<br/>but charged with rivalry energy]
    L --> M[Mia names it "Mia's Mocha Spot"<br/>Naming ceremony]
    M --> N[Three-tier attribution updates:<br/>Original Discoverer: Dave - permanent<br/>Current Controller: Mia<br/>Custom Name: Mia's Mocha Spot]

    I --> O[Dave sees claim transfer notification<br/>"Lucky's Corner is now 'Mia's Mocha Spot'<br/>controlled by @Mia"]
    O --> P{Dave's reaction}
    P -->|Watchlist it back| Q[Dave watchlists Mia's Mocha Spot<br/>The cycle continues]
    P -->|Move on| R[Dave focuses on other Taags]

    F --> S[Dave's streak counter updates<br/>Maintenance acknowledged]
```

**Key flow decisions:**
- Hard 30-day cutoff with no grace period — pre-expiration warning fires at ~29 days (1 day before deadline)
- Dave gets one clear warning before the hard deadline
- Watchlist notifications fire immediately when the Taag becomes contestable at the 30-day mark
- Re-claim by new player is a distinct celebration variant — rivalry energy, not pure pioneer joy
- Three-tier attribution ensures Dave's Pioneer credit is never lost
- The watchlist-back option creates an ongoing narrative loop between players

### 10.5 Monthly Re-Scan Maintenance

**Entry:** User has claimed Taags that need monthly re-scans.

```mermaid
flowchart TD
    A[User opens app] --> B{Any claims approaching expiry?}
    B -->|No| C[Normal app experience<br/>No maintenance interruption]
    B -->|Yes - within 7 days| D[Subtle Alert Amber indicator<br/>on claimed Taags in collection<br/>Breathing animation]

    D --> E{User taps indicator?}
    E -->|Yes| F[Taag detail shows<br/>"Re-scan within 7 days to keep"<br/>Map shows Taag location]
    E -->|Ignores| G[Continue using app normally<br/>Indicator persists]

    F --> H{User travels to location?}
    H -->|Yes| I[Scans the QR code]
    I --> J[Re-scan confirmation<br/>"Welcome back to name!<br/>Claim renewed"<br/>Claim Cyan chirp + light haptic]
    J --> K[Streak counter updates<br/>"5 months and counting"]
    K --> L{Other expiring claims nearby?}
    L -->|Yes| M["While you're out, name<br/>is 0.3 miles away"<br/>Opportunistic nudge]
    L -->|No| N[Return to normal flow]

    H -->|No - time passes| O{Day 29 reached?}
    O -->|Yes - pre-expiration warning| P[Push notification<br/>Alert Amber clock chime<br/>"Last chance for name — re-scan by tomorrow"]
    O -->|Day 30 - hard cutoff| Q[Claim lost<br/>Contestable flow begins<br/>See Journey 10.4]

    P --> R{User re-scans before Day 30?}
    R -->|Yes| J
    R -->|No| Q

    G --> O
    M --> I2[Scans nearby Taag<br/>Multi-maintenance trip]
    I2 --> J
```

**Key flow decisions:**
- Maintenance is NEVER interruptive — no modal popups, no forced flows
- Alert Amber indicators appear IN the collection view, within the existing experience
- 7-day advance warning gives users time to plan (not a last-minute panic)
- Re-scan confirmation is warm and efficient — not a celebration, a satisfied acknowledgment
- Opportunistic "while you're out" nudge for nearby expiring claims — turns maintenance into a mini-adventure
- Push notification fires at Day 29 (pre-expiration warning) — one clear chance before the hard 30-day cutoff

### 10.6 Journey Patterns

Across all five flows, these patterns repeat:

**Navigation Patterns:**
- **Camera as home base** — the app always returns to camera after completing a flow. Scan-first design.
- **Deliberate onboarding, just-in-time permissions** — account creation is a signature moment on first launch; camera and location permissions are requested just-in-time at the moment they're needed, at peak motivation.
- **Organic discovery over catalog browsing** — hunts are found through scans, not through a list. The list exists but isn't the primary discovery path.

**Decision Patterns:**
- **Binary choices at emotional peaks** — "Claim?" "Join hunt?" "Watch this Taag?" Simple yes/no at moments of high engagement.
- **Deferred complexity** — details are always available but never required. Taag stats, claimer history, hunt metadata are there if you want them, not blocking progress.
- **Escape without loss** — every flow can be exited without losing the scan. Declining a hunt still processes the Taag. Nothing is wasted.

**Feedback Patterns:**
- **Celebration → Airlock → Utility gradient** — peak moments always wind down gradually through the emotional airlock.
- **Every scan is acknowledged** — wrong hunt stop, already scanned, already claimed — every physical effort gets a response. Never silent failure.
- **Status through collection** — progress is shown through the growing passport, not through a dashboard or stats screen. The collection IS the feedback.

### 10.7 Flow Optimization Principles

1. **Steps to first value: 4** — Launch → Passport Issuance (account creation) → Camera → Scan → Pioneer. Four steps from install to dopamine, but the passport issuance IS a dopamine moment itself.
2. **Physical effort = proportional acknowledgment** — traveled somewhere? The app notices. Scanned the wrong code? Still a Taag. Came back to re-scan? Warm welcome.
3. **Creation flows should feel like play** — Sarah's hunt building flow mirrors the player experience. She walks the route, scans the codes, writes the clues in-field. Creation IS exploration.
4. **Maintenance should feel optional until it isn't** — no maintenance interruptions during active play. Amber indicators are ambient, not blocking. Push notification fires at Day 29 as pre-expiration warning.
5. **Every dead end has a redirect** — camera denied → Settings path. Wrong hunt stop → still a Taag scan. Claim expired → watchlist-back option. No flow terminates without a next step.

---

## 11. Component Strategy

### 11.1 Design System Coverage

**NativeWind provides:** Tailwind utility classes for layout, spacing, typography, color, flex, and grid. Zero pre-built components — it's pure styling infrastructure.

**The distinction:** Standard UI components (buttons, inputs, lists) built with NativeWind utilities vs. custom TaagBack signature components with specialized behavior, animation, and state management.

### 11.2 Foundation Components (NativeWind-Styled)

Standard UI components styled with TaagBack design tokens. No special behavioral logic — standard patterns with visual treatment applied.

| Component | Usage | Notes |
|-----------|-------|-------|
| **Button** | CTAs, confirmations, actions | Primary (accent-colored), Secondary (outline), Ghost (text-only). Terminal corners. |
| **TextInput** | Taag naming, clue writing, search | bg-tertiary, text-primary. Terminal corners for utility, Sticker for personal. |
| **ListItem** | Hunt list, leaderboard rows, Taag lists | Consistent inner padding, divider treatment, tap feedback. |
| **Badge/Chip** | Category tags, status indicators, stat labels | Die-cut sticker shapes per visual design foundation. |
| **Modal/BottomSheet** | Confirmations, watchlist prompt, quick actions | Slides from bottom, bg-secondary, contextual spacing. |
| **ProgressBar** | Hunt progression, profile level | Hunt Green fill, Terminal corners. |
| **TabBar / Navigation** | Bottom nav, section switching | Phosphor Bold icons, accent-color active state. |
| **Avatar** | Player profiles, leaderboard entries | Sticker corners (personal data), small circular. |
| **EmptyState** | No Taags yet, no hunts, no results | Ghost-impression watermarks with faint QR code pattern. |
| **NotificationBanner** | Alerts, claim expiration, system messages | Alert Amber accent, auto-dismiss. |

### 11.3 Custom Signature Components (5)

Brand-defining components with custom behavior, animation, and state management. Built using NativeWind + Reanimated 3 + Lottie + Expo AV + Expo Haptics as needed.

#### 11.3.1 TaagCard Family

**Architecture:** Compositional family, not a monolithic component. One visual atom (`TaagCardBase`) with context-specific wrappers.

**TaagCardBase** — The atomic visual unit. Every Taag in the system is represented as a TaagCardBase.

**Props:** Single `taag: TaagData` prop. All visual decisions (accent color, corner style, state treatment) derived internally via `useTheme()`. No prop explosion.

**States:**

| State | Visual Treatment | Corner Style | Phase |
|-------|-----------------|-------------|-------|
| Owned (claimed by you) | Full color, Claim Cyan border, warm bg | Sticker (12-16px) | 1 |
| Visited (in collection, not claimed) | Muted colors, dashed border | Sticker | 1 |
| Claimed-by-other | Rival Magenta accent, slightly faded + decay meter | Terminal (0-4px) | 1 |
| Fresh (just scanned) | Pioneer Gold "fresh ink" glow fading over ~5s | Sticker | 1 |
| Ghost | Glitch shimmer overlay, Ghost Purple glow | Terminal + glitch distortion | 2 |
| Relic | Cracked/aged texture, amber-tinted, sepia | Terminal + broken edge | 2 |
| Unclaimed | Ghost Purple outline, "?" watermark interior | Sticker (invitation) | 2 |
| Hunt-stamp | Hunt completion stamp with template graphic, completion date, creator attribution | Sticker | 2 |

**Decay Meter:** Thin bar/ring on claimed-by-other Taags. Fills with Claim Cyan on re-scan day, transitions toward Alert Amber over 30 days. Near expiration, pulses. Visual FEELING of freshness vs. staleness — not a countdown timer.

**Card Flip (Phase 2):** Detail variant has front (visual stamp — name, state, accent) and back (data card — encoded URL, scan count, first scanned date, location). 3D rotation via Reanimated. Front = Collection world (Sticker corners). Back = Game world (Terminal corners).

**Context Wrappers:**

| Wrapper | Context | Adds |
|---------|---------|------|
| `TaagCardGrid` | Collection views (PassportPage) | Tap handler, sticker-bomb rotation, fresh-ink glow |
| `TaagCardResult` | Scan result screens | Claim button, watchlist action, rivalry stats, decay meter emphasis |
| `TaagCardPopup` | Map popups | Distance, direction, condensed layout |
| `TaagCardListItem` | Leaderboard/watchlist rows | Minimal, compact, optimized for FlatList/FlashList rendering |

**Rendering Tiers:**
- Compact/Standard (in wrappers): Pure NativeWind, static state indicators, NO animation. Optimized for list/grid rendering of 50+ cards.
- Detail: Full animation, glow, shimmer, flip. Only renders one at a time.
- Static: Context-free rendering for notifications, share previews, future widgets. No hooks, no context, no animation. Phase 4.

**Accessibility:** Centralized label generation in Base. Accessible label adapts per context wrapper: Grid = "[name], [state], tap to view." Result = "[name], claimed by [player], [actions]." ListItem = "Rank [n], [name], [score]." Ghost/Relic/hunt-stamp status announced in label. Decay meter state as text: "Claim expires in [n] days."

#### 11.3.2 CelebrationOverlay

**Purpose:** Full-screen takeover for peak emotional moments. Renders inside `FullScreenTakeover` wrapper. Brings Celebration mode regardless of underlying screen's declared mode.

**Dismiss Behavior:** Explicit "Continue" button only — NO tap-anywhere dismiss. Button appears after initial animation burst settles (1-2 seconds). Prevents accidental dismissal during excited screen touching.

**Tiered Implementation:**
- **Phase 1 (Reanimated-only):** Scale bounce, accent color flash, text reveal. No Lottie dependency. Lightweight, instant.
- **Phase 3 (Lottie enhancement):** Confetti, deck-art reveal sequences lazy-loaded per variant. Same API, richer visuals.
- **Phase 4 (Full multi-sensory):** Lottie + sound + haptic + VHS grain. Celebration variety expansion.

**Variants:**

| Variant | Trigger | Intensity | Key Elements |
|---------|---------|-----------|-------------|
| Pioneer | First-ever scan of a code | Max | Confetti + THUNK + fanfare, "YOU'RE THE FIRST!" |
| Re-claim | Claiming a contestable Taag | On-Max | Rivalry energy, Rival Magenta to Claim Cyan shift |
| Hunt Complete | Final hunt stop scanned | Max | Blackout crescendo (2-3s dark with subtle center glow pulse + heartbeat haptic, then crescendo build, then full celebration) |
| Milestone | Badge earned, streak achieved | On | Peel-and-stick badge animation |
| Discovery | Unclaimed Taag found (not pioneer) | On | Lighter celebration, still a win |

**Dev Tooling:** `__DEV__` debug overlay showing current tier, volume level, assets loaded, reduced-motion state. Tap to inspect. Stripped from production.

**Accessibility:**
- `prefers-reduced-motion`: Static graphic + text, no confetti/animation
- Screen reader: Celebration text announced IMMEDIATELY (don't wait for animation). Continue button receives auto-focus after announcement.
- Optional auto-dismiss (8-10s) configurable in accessibility settings for screen reader users
- Haptics follow system settings. Sound follows device silent mode.

#### 11.3.3 ScanTransition

**Purpose:** The "magic lens" moment. Bridges camera view to scan result. Transforms mundane (camera feed) into extraordinary (game layer).

**Accent-Colored Flash:** Flash color foreshadows the result type — Pioneer Gold, Rival Magenta, Claim Cyan (re-scan), Hunt Green (hunt stop). Micro-reveal that builds anticipation. Zero additional performance cost.

**Phase-Gated Implementation:**
- **Phase 1: "Scan flash"** — instant cut with accent-colored flash + haptic pulse. Reliable, fast, intentional. Framed as design choice: "the lens activates."
- **Phase 3: Camera morph** — explore camera-to-result dissolve/morph if technically feasible. Flash remains as fallback.

**States:**

| State | Duration | Visual |
|-------|----------|--------|
| Code detected | Instant | Frame highlight around QR code, haptic pulse |
| Reading | 200-500ms | Frame contracts/focuses, "Reading..." micro-animation |
| Flash | ~200ms | Accent-colored flash based on incoming result type |
| Result ready | -- | Hands off to result screen or CelebrationOverlay |

**Variants:** Standard (camera to result), Hunt context (camera to ClueCard), Error (camera to retry with progressive messaging).

**Accessibility:** Reduced-motion = instant cut (no flash animation). Detection haptic always fires. "Reading" state has accessible announcement.

#### 11.3.4 ClueCard

**Purpose:** Hunt clue presentation. Must be readable outdoors while walking. Elevated readability requirements.

**Content Model Update:** Each clue has `title` (30 chars max, required) and `body` (280 chars max, required). Title shows in Peek mode. Body shows in Active mode.

**States:**

| State | Visual | Interaction |
|-------|--------|-------------|
| Locked | Placeholder text ("Clue locked") + decorative "?" characters. Real clue text NOT in DOM (prevents view-source cheating and screen reader spoiling). Ghost Purple tint. | Not tappable, teasing |
| Active | Full readable. bg-tertiary minimum, 16px text, space-lg padding, generous line height. | Readable, hint available if creator provided one (shown after 3 unsuccessful scan attempts) |
| Solved | Stamped/checked. Hunt Green overlay, slightly faded. | Reviewable, not primary |
| Peek | Minimized single-line bar at screen top showing clue title only. Camera active underneath. | Tap to expand to Active. Swipe down from Active to collapse. |

**Max Height:** ~60% of viewport in Active state. Longer clues get subtle scroll indicator. Short clues center vertically.

**Hint Mechanic:** Hints are only displayed if the hunt creator provided a hint for that stop. After 3 unsuccessful scan attempts at a stop, the hint button becomes available. If no hint was provided by the creator, no hint button is shown — the UI stays clean rather than showing a disabled or empty hint option.

**Accessibility:** Minimum 16px text, bg-tertiary contrast, 1.5 line height. Works at 1.5x system font scale. Active clue announced to screen reader on reveal. Peek state announces title text.

#### 11.3.5 FullScreenTakeover

**Purpose:** Shared wrapper for components that take over the entire screen (CelebrationOverlay, ScanTransition). Handles lifecycle and exit patterns so consumers don't duplicate takeover logic.

**Responsibilities:**
- Entering over current screen (overlay mount)
- Background dimming/blur
- Lifecycle management (appear / sustain / dismiss)
- Emotional airlock exit animation (Celebration to Experience cool-down)
- Preventing back-button/gesture dismissal during critical moments

**Consumers:** CelebrationOverlay mounts inside FullScreenTakeover. ScanTransition mounts inside FullScreenTakeover. Future full-screen moments use the same wrapper.

**Accessibility:** Traps focus within takeover while active. Announces content to screen reader. Provides dismiss mechanism per consumer's rules.

### 11.4 Shared Systems & Utilities

#### Shared Systems (React Context / Managers)

| System | Type | Purpose |
|--------|------|---------|
| **ModeContext** | React Context | Provides current visual mode (Utility/Experience/Celebration) to all components |
| **VolumeKnob** | React Context + State | Controls intensity-linked effects (grain, glow, sound, haptics). Three levels: Off/On/Max |
| **FeedbackManager** | Singleton Service | Merged Sound + Haptic manager. Single `triggerFeedback(accent)` API. Lazy-loads audio assets. Detects platform state (iOS silent mode, Android haptic capability, Bluetooth, DND). Fallback chain: sound to haptic to visual flash. |

**FeedbackManager Platform Detection:**
- iOS silent mode (ringer switch): skip audio, increase haptic intensity
- Android haptic support: detect capability at startup, degrade gracefully
- `prefers-reduced-motion`: kill pulsing haptics, keep single taps
- Expo AV audio session: `mixWithOthers` (don't interrupt user's music)
- Fallback chain: Sound to Haptic to Visual flash. NEVER silent failure.

**Day 1 Testing Checklist:** iOS silent mode, Android low-end, system haptics disabled, Bluetooth headphones, Do Not Disturb mode.

#### Utility Functions & Hooks

| Utility | Type | Purpose |
|---------|------|---------|
| **`useTheme()`** | Hook | Composes ModeContext + VolumeKnob + AccentResolver + CornerResolver into single API. Returns `{ mode, volume, accent, corners, canAnimate, canGlow, canAutoPlay }`. Defaults: ownership='system', world='game'. |
| **`useCollectionLayout()`** | Hook | Replaces PassportPage as a component. Returns layout config (grid columns, rotation map, density tier, featured position) based on Taag count. Accepts `highlightFilter` param for Gallery Mode visual filtering. |
| **AccentResolver** | Pure function | `getAccentColor(ownership, state)` in `theme/accents.ts` |
| **CornerResolver** | Pure function | `getCornerRadius(mode, world)` in `theme/corners.ts` |
| **RevealAnimation** | Utility | Shared "content appears with drama" animation (scale 0.95 to 1.0, opacity 0 to 1, accent color flash). Used by ClueCard reveal, TaagCardResult rival reveal, onboarding tooltips. |
| **PIN_CONFIG** | Lookup object | `Record<TaagPinState, PinVisuals>` mapping 7 pin states to color, shape, opacity, glow, and size. Size as 4th dimension: yours=1.2x, standard=1.0x, unclaimed=0.85x. |

**`useTheme()` Capability Booleans:**
- `canAnimate` — layout transitions, entrance animations. False if `prefers-reduced-motion`.
- `canGlow` — CRT glow, neon shadows. False if Volume Off or reduced-motion.
- `canAutoPlay` — Lottie sequences, confetti. False if reduced-motion OR screen reader active. User-triggered animations still respect `canAnimate`.

### 11.5 Screen Patterns (Not Components)

These are documented patterns built from foundation components, not custom library components:

| Pattern | Built From | Used In |
|---------|-----------|---------|
| **Watchlist Prompt** | BottomSheet + Button + TaagCardBase content | Scan result (claimed-by-other) |
| **Passport Issuance (Account Creation)** | Full-screen Experience + TextInput + Button + social login buttons | First app launch |
| **Clue Editor** | TextInput (title 30 char + body 280 char) + hint toggle + ClueCard preview | Hunt builder screen |
| **Maintenance Indicator** | Animated Badge (breathing Alert Amber) overlaid on TaagCardBase | Collection view, notifications |
| **Creator Dashboard Funnel** | ProgressBar segments + ListItems with per-stop attempt counts | Hunt management screen |
| **Map Accessible List** | Sorted ListItem overlay at bottom of MapView when screen reader active | Map screen |

### 11.6 Component Implementation Roadmap

**Phase 0 — Foundation (~1 day)**
- `tailwind.config.js` with all design tokens
- Font loading (Space Mono + Inter via Expo Google Fonts)
- Phosphor Icons setup (bold default, duotone for interactive)
- ModeContext provider + VolumeKnob state
- `useTheme()` hook with AccentResolver + CornerResolver
- Button, TextInput, ListItem foundation components

**Phase 1 — Core Components (~1-2 weeks)**
- TaagCardBase + TaagCardGrid + TaagCardResult + TaagCardListItem (4 states: Owned, Visited, Claimed-by-other, Fresh)
- ClueCard (Active + Solved states)
- ScanTransition (accent-colored scan flash)
- CelebrationOverlay Tier 1 (Reanimated-only: Pioneer + Discovery variants)
- FullScreenTakeover wrapper
- `useCollectionLayout()` hook (clean grid density tier only)
- FeedbackManager (haptic-only, audio lazy-load prep)
- Modal/BottomSheet, ProgressBar, Badge, EmptyState, TabBar
- **Gate: Loop-complete before proceeding.** User can scan, see result, view collection, scan again, see leaderboard, find a hunt, complete a hunt. All with Tier 1 celebrations.

**Phase 2 — Experience Components (~2-3 weeks)**
- TaagCardBase remaining states (Ghost, Relic, Unclaimed, Hunt-stamp)
- TaagCardPopup (for map)
- TaagCard Detail variant with flip interaction (front=stamp, back=data)
- Decay meter on TaagCardBase (claimed-by-other)
- `useCollectionLayout()` sticker bomb density tier + "Latest Taag" featured position
- Gallery Mode visual filter chips (highlight filter param)
- ClueCard Locked state + Peek state (minimized over camera)
- MapView wrapper + TaagPin sub-component (PIN_CONFIG with size dimension)
- Server-side clustering integration
- RevealAnimation utility
- Watchlist Prompt pattern, Passport Issuance pattern, Maintenance Indicator pattern
- FeedbackManager full (3 Day 1 sounds: THUNK, confirmation chirp, adventure fanfare)
- Avatar, NotificationBanner
- Conditional hint display (shown after 3 failed scan attempts, only if creator provided hint)
- **Hard gate: Phase 2 feature-complete and tested before ANY Phase 3 work.**

**Phase 3 — Celebration Components (~1-2 weeks)**
- CelebrationOverlay Tier 2 (Lottie confetti + deck-art, lazy-loaded per variant)
- Pioneer, Hunt Complete (blackout crescendo with glow pulse), Re-claim variants
- ScanTransition camera morph exploration (flash remains fallback)
- Display typography treatment (tracking + glow + ALL-CAPS + distress at Max)
- Emotional airlock summary card
- "Fresh ink" glow refinement
- Minimum 3 confetti variations + 2-3 deck-art graphics
- FeedbackManager sound library complete (3 Day 1 sounds integrated with celebrations)

**Phase 4 — Polish (ongoing)**
- CelebrationOverlay Tier 3 (full multi-sensory: VHS grain, layered sound)
- Milestone + remaining celebration variants
- TaagCardBase static render mode (notifications, share previews, widgets)
- Remaining 3 sound bindings (Alert Amber, Ghost Purple, Rival Magenta)
- Badge peel-and-stick animation
- `useCollectionLayout()` Index Mode toggle (at 50+ Taags)
- Sunlight adaptation on all components
- Hunt route rendering on MapView
- Map filter controls, couch-mode selection
- Per-stop creator dashboard funnel
- Celebration variety expansion
- Audio ring-out across screen transitions (exploratory)
- Dynamic type scaling testing at 1.5x

### 11.7 Architectural Decisions Record

| ADR | Decision | Rationale |
|-----|----------|-----------|
| ADR-01 | 5 custom components (from original 10) | AccountGate, MaintenanceIndicator, WatchlistPrompt, VisaStamp, ClueEditor demoted to patterns/screen UI/TaagCard types |
| ADR-02 | 3 shared systems + `useTheme()` hook + utilities | FeedbackManager merges Sound+Haptic. AccentResolver/CornerResolver are pure functions, not managers. `useTheme()` composes all systems into single API. |
| ADR-03 | TaagCard compositional family (Base + 4 wrappers) | Prevents god component. Each wrapper handles context-specific behavior. Base handles visual states. Single `taag: TaagData` prop. |
| ADR-04 | TaagCard tiered rendering (static lists, animated detail) | Performance-safe collection views at 50+ cards. No Reanimated/Lottie in list items. |
| ADR-05 | CelebrationOverlay tiered implementation (Reanimated to Lottie to Full) | Celebrations ship Phase 1 without Lottie. Same API, richness scales up. Lottie lazy-loaded. |
| ADR-06 | ScanTransition "scan flash" first, morph Phase 3 | De-risks technically dangerous camera-to-UI transition. Flash is framed as intentional design. |
| ADR-07 | MapView wrapper + TaagPin sub-component (not monolithic MapOverlay) | Clean separation. Server-side clustering mandatory. Native markers at zoom-out. 200MB memory budget. |
| ADR-08 | FullScreenTakeover shared wrapper | Prevents duplicate takeover/airlock logic between CelebrationOverlay and ScanTransition. |
| ADR-09 | Hard Phase 2 to 3 gate | Loop-complete before celebration polish. Prevents "Celebration Trap" of building exciting components before core loops work. |
| ADR-10 | PassportPage replaced by `useCollectionLayout()` hook | Layout strategy, not a component. Hook returns grid config, rotation map, density tier, featured position. |

### 11.8 Performance Budgets & Guardrails

| Concern | Budget | Enforcement |
|---------|--------|------------|
| PassportPage scroll | 60fps on mid-range Android (Pixel 6a equivalent) | Pre-computed sticker bomb layouts, FlashList, max 20-25 cards per page |
| TaagCardGrid GPU layers | Max 8-10 rotated cards visible | Limit rotation transforms to top visible cards in overlap zone |
| MapView memory | 200MB max | Server-side clustering, native markers at zoom-out (<30 visible for custom views) |
| CelebrationOverlay bundle | No Lottie in Phase 1-2 bundle | Lottie files lazy-loaded per variant, pre-cached after first use |
| Scan-to-result latency | <2 seconds total | Optimistic UI, local cache, scan flash covers network round-trip |
| ClueCard readability | 16px minimum, 1.5 line height, bg-tertiary contrast | Enforced in component, tested at 1.5x system font scale |

---

## 12. UX Consistency Patterns

### 12.1 Scan Feedback Patterns

**Prime Directive:** Every scan produces a meaningful response. No silent failures. No dead ends. Physical effort is ALWAYS acknowledged.

**Scan Result Decision Tree:**

| Outcome | Feedback Type | Mode | Primary Action | Secondary Action |
|---------|--------------|------|---------------|-----------------|
| Pioneer (first ever) | CelebrationOverlay (Pioneer) | Celebration | Name this Taag | -- |
| Unclaimed (exists, no owner) | CelebrationOverlay (Discovery) | Celebration | Claim it | Just collect |
| Claimed by other | TaagCardResult + RevealAnimation | Utility | Watch this Taag (secondary button) | View owner profile |
| Re-scan (your Taag) | Warm confirmation inline | Utility | View Taag | Scan another |
| Repeat scan (not yours, seen before) | Updated intelligence inline | Utility | Watchlist / View | Scan another |
| Hunt stop (correct) | ClueCard state transition | Experience | Continue hunt | -- |
| Hunt stop + Pioneer | Stacked: Pioneer FIRST, then hunt | Celebration→Experience | Name, then continue | -- |
| Wrong hunt stop (valid Taag) | Normal scan result + hunt reminder | Utility | -- | "Not part of [Hunt Name] — keep looking!" inline note |
| Non-QR code | Helpful inline message | Utility | -- | -- |
| Scan failed / damaged | Progressive retry messaging | Utility | Try again | Report issue |
| Offline | Queued scan notification | Utility | View queue | -- |

**Progressive Failure Messaging:**
1. (0-3 seconds) "Focusing..." with frame tightening animation
2. (3-6 seconds) "Try a bit closer..." with distance hint
3. (6-10 seconds) "This code might be hard to read" with report option
4. Never "Scan failed." Always a next step.

Note: Progressive messages describe app state, not user ability. No "hold steady" or similar ableist language.

**Optimistic UI Rule:** If API call is in-flight, show scanning animation and detection confirmation. If API fails, cache locally and queue. "Your scan is saved — we'll reveal this Taag when you're back online." NEVER lose a scan.

**Photo Finish (Accidental Near-Simultaneous Pioneer — Phase 2):** Winner gets full Pioneer celebration. Runner-up (within ~30 seconds): "Photo Finish" special UX is Phase 2. MVP: runner-up sees standard already-claimed result. Phase 2: "You JUST missed being the pioneer — [winner] beat you by seconds!" A story, not an error.

**"Claimed!" (Intentional Re-claim Race):** Different framing from Photo Finish — both users KNEW they were racing (watchlist alert). Winner: "You beat [n] others to claim this Taag!" Runner-up (within ~60 seconds): "Just missed it! [Winner] claimed it [n] seconds before you." Immediate watchlist prompt. Competitive framing, not accidental.

**Rapid Scan Detection:** If user scans within 10 seconds of dismissing a celebration, compress the next celebration: skip airlock, show condensed Tier 1 celebration (~3 seconds), streak counter: "3 Pioneers in a row!" First Pioneer of a session gets full ceremony. Subsequent rapid-fire Pioneers get "speed mode." Naming ceremony always gets full pacing (requires user input).

**Diminishing Repeat Scan Response (Same Code, Same Session):**
- Scan 1: Full result
- Scan 2-3 (within 30 minutes): Abbreviated result, brief toast: "Still yours!" or "Still [owner]'s"
- Scan 4+: Camera stays active, brief haptic pulse, micro-toast: "Already scanned." No screen transition.
- Different session (30+ minutes): Resets to full result.

**Scan Registration Rule:** The scan API call fires BEFORE the celebration begins (during ScanTransition). By the time CelebrationOverlay appears, the Taag is already registered server-side. If user force-closes mid-celebration:
- Before naming: Taag in collection as "unnamed" with Pioneer credit. Next app open: "You have an unnamed Taag!" resume naming prompt. No celebration replay.
- After naming: Everything saved. Nothing lost.
- During ScanTransition (before API completes): Optimistic UI queues scan. Processes on next open.

**The celebration is decorative. The data transaction is already complete.**

### 12.2 Celebration & Emotional Feedback Patterns

**Celebration Intensity Scale:**

| Level | When | Implementation | Duration |
|-------|------|---------------|----------|
| **Micro** | Re-scan confirmation, repeat scan, list actions | Inline accent flash + haptic tap. No overlay. | <1 second |
| **Standard** | Discovery, re-claim, hunt stop solved | CelebrationOverlay Tier 1-2 inside FullScreenTakeover. Explicit Continue button. | 3-5 seconds + dismiss |
| **Peak** | Pioneer, hunt complete, major milestone | CelebrationOverlay at Max volume. Full multi-sensory. Deliberate pacing. | 5-10 seconds + dismiss |

**Emotional Airlock Protocol:**
- NEVER transition Celebration → Utility directly.
- Always: Celebration (peak) → Experience summary card (3-5 seconds, TaagCard in Sticker form, pride/settling) → tap Continue → destination screen.
- Summary card shows: what you just did, what it means (collection count, leaderboard change, hunt progress), and what to do next.
- **Upward transitions permitted:** Experience → Celebration is allowed for stacked reward moments (e.g., Pioneer airlock → hunt completion blackout crescendo). The airlock governs downward transitions only.

**Variety Injection:**
- Celebrations must not feel identical. Minimum 3 confetti/animation variations for Pioneer. Minimum 2 for hunt complete. Pseudo-random selection per celebration.
- Sound design follows same principle: slight pitch/timing variation on THUNK, different confetti burst patterns.

**Rivalry Feedback (Already-Claimed Scans):**
- Most common scan outcome at scale. Designed as a charged moment, not a disappointment.
- Rival name appears via RevealAnimation — dramatic, not a label.
- Decay meter immediately visible — "is this one beatable?"
- "Watch this Taag" as Secondary button on result screen. Tapping triggers Watchlist BottomSheet for confirmation. NOT auto-popup — user-initiated preserves agency, prevents modal fatigue.
- "You're the 47th to find this Taag" — social proof validates the discovery.

### 12.3 Navigation Patterns

**Camera-First Home:**
- App opens to camera. Always. No splash screen, no home feed, no dashboard.
- **Exception:** Deep link entry opens to linked content (hunt invitation, Taag detail). After deep link flow completes, user lands in normal camera-first state.
- Bottom tab bar: Scan (camera), Collection, Hunts, Map, Profile.

**Tab Bar Behavior:**

| Context | Tab Bar State |
|---------|--------------|
| Normal browsing | Visible, translucent over content |
| Camera/scan active | Visible, translucent over camera feed |
| CelebrationOverlay | Hidden (FullScreenTakeover covers it) |
| Hunt active (ClueCard Peek) | Visible; "Scan" tab shows hunt icon |
| BottomSheet open | Behind sheet (not interactive) |

**Hunt-in-Progress Persistent UI:**
- Active hunt: ClueCard Peek bar at screen top, persistent across tab navigation.
- Navigating away doesn't abandon the hunt. "Active Hunt" badge on Scan tab.
- Explicit "Abandon Hunt" in hunt menu (confirmation required).

**Back Navigation / Gesture Handling:**
- Android back and iOS swipe-back follow platform conventions.
- Exception: FullScreenTakeover disables back gesture. Must use explicit Continue button.
- During active hunt: back navigates normally but doesn't abandon hunt.

**Permission State Handling:**
- Camera permission: "Activate Your Magic Lens" screen on first request. If previously granted then revoked: contextual re-enable screen ("Your magic lens is off — tap to re-enable") with "Open Settings" primary button.
- Collection, hunts, leaderboard, profile remain accessible without camera. Only Scan tab is affected.
- Permission checked on every app foreground event.

### 12.4 Action Hierarchy (Buttons & CTAs)

**Three-Tier Button System:**

| Tier | Style | Use | Touch Target |
|------|-------|-----|-------------|
| **Primary** | Filled, accent-colored, Terminal corners | One per screen max. The main action. | 56-64px height |
| **Secondary** | Outlined, accent-colored border, Terminal corners | Supporting actions. Watchlist, view profile. | 44-48px height |
| **Ghost** | Text-only, accent-colored text | Dismissive actions. "Not now," "Skip," "Maybe later." | 44px min height |

**Accent Color Assignment:**
- Claim/own: Claim Cyan
- Hunt: Hunt Green
- Competition/rivalry: Rival Magenta
- Destructive/warning: Alert Amber
- Discovery: Pioneer Gold

**Binary Choice Pattern (Emotional Peaks):**
Simple yes/no at high engagement moments. Never more than two options at an emotional peak.

| Moment | Option A (Primary) | Option B (Ghost) |
|--------|-------------------|-----------------|
| Pioneer naming | "Name this Taag" (Claim Cyan) | -- (no skip at peak) |
| Unclaimed discovery | "Claim it" (Claim Cyan) | "Just collect" |
| Hunt invitation | "Join hunt" (Hunt Green) | "Not now" |
| Watchlist prompt | "Watch this Taag" (Rival Magenta) | Dismiss (swipe down) |
| Claim maintenance | "I'll re-scan" (Claim Cyan) | "Let it go" (Ghost) |

**Deferred Complexity Rule:** Details always available but never required. Stats, history, metadata accessible via secondary actions or card flip — never blocking the primary flow.

### 12.5 Empty & Loading States

**Empty State Philosophy:** Empty states are INVITATIONS, not error messages.

| Context | Empty State | Visual | Action |
|---------|------------|--------|--------|
| Collection (0 Taags) | "Your passport is empty — scan your first QR code to begin" | Ghost-impression "?" watermarks, Experience mode | Pulsing scan icon CTA |
| Leaderboard (new area) | "No explorers here yet — be the first" | Grid lines, ghosted #1 avatar | "Start scanning" CTA |
| Hunt list (none nearby) | "No hunts in your area yet — create one?" | Illustrated empty trail map | "Create a Hunt" CTA |
| Watchlist (empty) | "Nothing on your radar yet" | Empty radar visual | "Scan to discover" |
| Notifications (empty) | "All quiet — go scan something" | Minimal, clean | -- |

**Loading State Patterns:**

| Context | Treatment | Duration |
|---------|----------|----------|
| Scan result | ScanTransition flash covers loading. Never a spinner. | <2 seconds |
| Collection | Skeleton cards matching `useCollectionLayout()` config | <1 second |
| Leaderboard | Skeleton rows with pulsing bars | <1 second |
| Map pins | Map loads first, pins populate nearest-first | 1-3 seconds |
| Hunt list | Skeleton cards | <1 second |

**Skeleton Style:** bg-tertiary pulsing shapes. No shimmer (conflicts with CRT aesthetic). Shapes match target layout exactly. Skeleton → content is a simple opacity fade. At Volume Max (Phase 4): CRT scan-line sweep replaces opacity pulse for brand consistency.

**Offline State:**
- Persistent banner at top: "You're offline — scans will be saved and synced" (Alert Amber).
- All cached data browsable (collection, completed hunts, claimed Taags).
- Scan still works: camera detects, queues scan, shows "Scan saved!"
- Queue badge on Scan tab showing queued count.
- **Hunts playable offline once joined.** Join requires internet (downloads hunt data with stop validation hashes). Gameplay after join validates client-side against downloaded hashes. Completions queued for server sync.

### 12.6 Modal & Overlay Patterns

**Three Overlay Types:**

| Type | Component | Use | Dismiss |
|------|-----------|-----|---------|
| **FullScreenTakeover** | Custom wrapper | Celebrations, scan transitions | Explicit Continue button only |
| **BottomSheet** | Foundation component | Watchlist prompt, hunt invitation, safety gate, quick actions | Swipe down or tap outside |
| **Full-Screen Modal** | Foundation component | Passport issuance on first launch, other content-heavy flows | Explicit close/skip buttons |
| **Toast/Banner** | Foundation component | Confirmations, status updates, offline indicator | Auto-dismiss or swipe |

**BottomSheet Rules:**
- Max height: 60% of screen.
- Visible drag handle at top. Content scrollable if exceeds height.
- Background dimmed to 40% opacity.
- Never stacks: one BottomSheet at a time. New one dismisses current first.
- Note: Toast/Banner can appear while BottomSheet is open (top vs. bottom, different types).

**Account Creation (Passport Issuance — First Launch):**
- Appears on first app launch as a signature UX moment — the "passport issuance" ceremony.
- Full-screen experience, not a modal overlay. Designed as an initiation into the hidden world, not a sign-up form.
- Age gate woven naturally into the flow.
- Social login + email options presented with TaagBack's personality and design language.
- After creation: seamless transition to camera permission and first scan.

**Safety/TOU Gate (BottomSheet):**
- Before first hunt participation. First time: checkbox + confirm. Subsequent: reminder only.
- Never blocks non-hunt scanning.

**Toast/Banner Rules:**
- Appears at top, below status bar. Accent-colored left border.
- Auto-dismiss: 3 seconds (confirmations), 5 seconds (informational), persistent (errors/offline).
- **Pause-on-focus:** Timer pauses while toast is being touched or has screen reader focus. Screen reader users: toast persists until dismissed or replaced.
- Max one toast visible. New toast replaces current.
- Tappable: tap to navigate to relevant screen.

### 12.7 Form Patterns

**Taag Naming (Peak Moment Form):**
- Single text input, centered, prominent. Space Mono font.
- AI-suggested names below (3 tappable options). Post-MVP, but UI space reserved.
- 30-character limit with visible counter. Content moderation on submit.
- **Confirmation beat:** After "Stamp it" tap, preview: "Your Taag will be named [name]" with "Stamp it!" (confirm) and "Edit" (back to input). Builds anticipation and prevents accidental submissions.
- **Screen reader flow:** Auto-focus on text input. Suggestions announced: "3 name suggestions available below." Each is a button: "Suggestion: [name]. Double-tap to select." Tab to "Stamp it." Confirmation preview announced. THUNK haptic on final stamp.

**Clue Writing (Creator Form):**
- Two fields: Title (30 chars, single line) and Body (280 chars, multi-line expanding textarea).
- Live character counters. Preview toggle (renders ClueCard Active state).
- Hint field (optional, collapsible).
- Auto-save: drafts persist if creator leaves mid-creation.

**Hunt Metadata (Creator Form):**
- Title (50 chars), description (200 chars), category (optional preset list).
- Title required, minimum 2 stops to publish.

**Form Validation Style:**
- Inline, real-time. No submit-then-show-errors.
- Error: Alert Amber border + message below in text-caption.
- Success: subtle Claim Cyan border flash (brief, not persistent).
- Character counters: text-secondary default, Alert Amber within 10% of limit.

**Keyboard Handling:**
- Inputs scroll into view above keyboard.
- "Done" dismisses keyboard. No "Next" chaining (forms are 1-3 fields max).
- Auto-focus first input on screen mount.

### 12.8 Search & Filtering Patterns

**Gallery Mode Visual Filters (Phase 2):**
- Filter chips above collection: Mine, Others', Ghost, Relic, Hunt Stops.
- Selecting a filter DIMS non-matching Taags — does NOT hide. Sticker bomb preserved.
- **Two-tier dimming:** Standard users: 30% opacity. Accessibility mode (large text or screen reader active): 60% opacity + desaturated border. Filtering communicated through emphasis on matches, not just suppression.
- Multiple filters selectable (additive). "Show All" chip always visible.
- Filter state persists within session, resets on restart.

**Index Mode Search (Phase 4):**
- Search bar at top. Clean grid, Terminal corners. Sort: newest, oldest, alphabetical, most scanned, nearest.
- Results update as-you-type with 300ms debounce.

**Hunt Discovery Filters:**
- Distance (nearby/city/any), length (quick 2-3/medium 4-6/epic 7+), status (unstarted/in-progress/completed).
- Filter BottomSheet with chip selection + Apply button.

**Leaderboard Filters:**
- Scope tabs: neighborhood/city/global.
- Category/time dropdowns: total scans, unique Taags, hunts completed, streak length × all-time, this month, this week.

### 12.9 List & Data Display Patterns

**Leaderboard Rows (Terminal World):**
- Terminal corners, bg-secondary, space-md padding.
- Your row: Claim Cyan left border + bg elevation.
- Rank in Space Mono text-stat. Name in Inter. Score in Space Mono.
- Top 3: #1 Pioneer Gold accent, #2-3 subtle elevation.
- Tap row → player profile.

**Hunt List Items (Experience World):**
- Sticker corners, bg-warm undertone.
- Title in Space Mono text-h3. Creator, stop count, distance in Inter text-caption.
- Status badge: "New" (Hunt Green), "In Progress" (Alert Amber), "Completed" (Hunt Green + checkmark).
- Estimated duration from stop count × average distance.

**Watchlist Items (Game World):**
- Terminal corners, bg-secondary. TaagCardListItem with prominent decay meter.
- Status: "Secure" (Claim Cyan, >14 days), "Weakening" (Alert Amber, 7-14 days), "Expiring" (Alert Amber pulse, <7 days), "Contestable!" (Rival Magenta).
- Tap → Taag detail. Long-press → remove from watchlist.

**Notification Feed (Utility Mode):**
- Terminal corners, minimal styling, grouped by day.
- Types: claim expiring, watchlist alert, hunt invitation, milestone, photo finish.
- Unread: accent-colored left border. Read: no border.
- Tap → relevant screen.

### 12.10 Hunt Health & Integrity Patterns

**Hunt Health Monitoring:**
- System tracks scan activity on hunt-stop Taags. If a stop receives zero scans for 30+ days while others remain active, flagged as "potentially missing."
- Creator notification: "[Hunt Name] health alert: Stop [n] hasn't been scanned in 30 days. Is it still there?"
- Creator actions: confirm fine, replace stop with another Taag, remove stop from hunt.
- If Taag transitions to Relic: automatic creator notification.
- Player-facing: "Heads up — one stop in this hunt may have moved. The creator has been notified."

### 12.11 Design System Integration

**NativeWind Token Mapping:**

All patterns use tokens from `tailwind.config.js`. No hardcoded values.

| Pattern Need | Token |
|-------------|-------|
| Primary button bg | `bg-accent-{color}` via AccentResolver |
| Secondary button border | `border-accent-{color}` |
| Error state | `border-accent-alert`, `text-accent-alert` |
| Modal overlay bg | `bg-primary/40` |
| Skeleton pulse | `bg-tertiary` with opacity animation |
| Toast accent border | `border-l-4 border-accent-{type}` |

**Pattern x Mode Matrix:**

| Pattern | Utility Mode | Experience Mode | Celebration Mode |
|---------|-------------|----------------|-----------------|
| Buttons | Standard, no glow | Subtle glow on press | Accent glow persistent |
| Loading | Skeleton only | Skeleton + subtle pulse | N/A |
| Toasts | Standard appearance | Standard + haptic | N/A |
| BottomSheet | Sharp entrance, no glow | Smooth entrance, subtle shadow | N/A (FullScreenTakeover) |
| Lists | Compact, dense | Standard spacing, accent highlights | N/A |

**Developer Consistency Checklist:**
1. Every interactive element uses `useTheme()` for accent/corner resolution
2. Every action uses FeedbackManager for multi-sensory response
3. Every screen declares a Mode (Utility/Experience/Celebration)
4. Every empty state has an invitation message + action CTA
5. Every form validates inline in real-time
6. Every loading state uses skeleton matching target layout
7. Every modal/overlay follows the type system (Takeover/BottomSheet/Full-Screen Modal/Toast)
8. Touch targets: 44px minimum, 56-64px for primary actions
9. Two accent maximum per screen
10. Monospace budget ~30% per screen

---

## 13. Responsive Design & Accessibility

### 13.1 Responsive Strategy

**Platform:** React Native mobile app (Expo SDK 55). No desktop. No web (PWA post-MVP). Tablet is a stretch goal, not MVP. The responsive conversation is about phone screen variance.

**Phone Screen Tiers:**

| Tier | Example Devices | Screen Width | % of Market | Design Priority |
|------|----------------|-------------|-------------|----------------|
| **Small** | iPhone SE (3rd gen), Galaxy A14 | 320-375pt | ~15% | Must work. Compact layouts. |
| **Standard** | iPhone 14/15, Pixel 7/8 | 376-414pt | ~60% | Primary design target. |
| **Large** | iPhone 15 Pro Max, Galaxy S24 Ultra | 415-430pt | ~20% | Capitalize on space. |
| **Foldable (inner)** | Galaxy Z Fold (opened) | 600+pt | ~5% | Don't break. |

**Adaptation Per Tier:**

**Small screens (320-375pt):**
- TaagCard Compact as default in lists (no Standard in tight spaces)
- Collection grid: 2 columns. Sticker bomb at 7 Taags instead of 9.
- ClueCard Peek: single-line title only
- Celebration text: text-h1 (24px) instead of text-display (32px)
- Tab bar labels hidden (icons only) if needed

**Standard screens (376-414pt):**
- The design target. All specs as documented.
- Collection grid: 3 columns. Sticker bomb at 9+.

**Large screens (415-430pt):**
- Collection grid: 3 columns with space-lg gaps
- TaagCard Detail: more generous spacing
- Map: larger pin touch targets
- ClueCard: wider padding

**Foldable (600+pt):**
- Content centers with max-width (430pt). No wide-mode layouts for MVP.
- Post-MVP: split-view potential (map + scan result side-by-side).

**No Hard Breakpoints:** Use NativeWind responsive utilities with flex-based layouts that adapt fluidly. Design tokens (spacing, typography) are fixed. Column count and component variant selection adapt based on available width.

### 13.2 Orientation Strategy

**Portrait-locked for MVP.** TaagBack is a one-handed, walking-while-scanning app. Landscape adds complexity with zero user benefit for core experience.

Post-MVP consideration: landscape for map view in couch-mode hunt building (Phase 4+).

### 13.3 Accessibility Strategy

**Target: WCAG 2.1 Level AA compliance.** Level AAA aspirational for specific components (ClueCard readability) but not a blanket target.

**TaagBack-Specific Accessibility Challenges:**

| Challenge | Why It's Hard | Our Approach |
|-----------|-------------|-------------|
| **Camera-dependent core** | Blind/low-vision users can't point at QR codes | Manual code entry option (type/paste URL) on Scan screen. NFC tap as alternative (post-MVP). |
| **Location-dependent gameplay** | Mobility-impaired users can't travel to re-scan | Couch-mode hunt builder. Collection/leaderboard don't require movement. Pre-expiration warning + "Let it go" option. |
| **Celebration-heavy feedback** | Seizure risk, motion sickness | `prefers-reduced-motion` kills animation, pulsing, VHS. Static content + haptic + sound remain. Flash budget: max 2 brightness transitions/sec. |
| **Outdoor sunlight usage** | Low contrast washes out | Neon-on-dark naturally helps. All text meets AA contrast at max brightness. Sunlight adaptation Phase 4. |
| **Time-pressure mechanics** | Claim expiry | All timers are days/hours, not seconds. No real-time pressure. Toast pause-on-focus. |
| **User-generated content** | Taag names, clues may be inaccessible | Content moderation. Clue readability enforced (16px min, contrast). No images-as-text. |

**Alternative Scan Input:**
- "Enter code manually" link below camera viewfinder
- Text input for QR encoded URL (paste from clipboard or type)
- Same processing pipeline — result appears identically
- Also serves as fallback for camera hardware failure

### 13.4 Accessibility Implementation Requirements

**Visual Accessibility:**

| Requirement | Standard | Implementation |
|-------------|----------|---------------|
| Text contrast | 4.5:1 body, 3:1 large (AA) | Neon-on-dark exceeds. Verified per accent. |
| Non-text contrast | 3:1 for UI components | Accent borders/icons meet 3:1 on bg-primary. |
| Color not sole indicator | No info by color alone | Shape + icon + label accompany color. Pin matrix: color x shape x opacity x size. Decay meter has text. |
| Text resize | Up to 200% without loss | All text in rem/sp units. Tested at 1.5x and 2x system font scale. |
| Focus indicators | Visible focus ring | 2px accent-colored outline, 2px offset from element edge. |
| Reduced motion | Respect system preference | `prefers-reduced-motion`: no animation, pulsing, VHS, confetti. Static glow preserved. Instant transitions. Single haptic taps preserved. |

**Motor Accessibility:**

| Requirement | Standard | Implementation |
|-------------|----------|---------------|
| Touch targets | 44x44px minimum | Enforced. Primary actions: 56-64px. |
| Gesture alternatives | Every gesture has button alt | Swipe-dismiss BottomSheet has X button. Card flip has "Details" button. Collection swipe has tappable page dots. |
| No complex gestures required | Multi-finger has alternatives | Long-press has context menu. Pinch-zoom map has zoom buttons. |
| Timeout adjustments | Adjustable or eliminable | No real-time timeouts. Toast pause-on-focus. |

**Screen Reader Accessibility:**

| Requirement | Implementation |
|-------------|---------------|
| Semantic structure | `accessibilityRole` on all interactive elements |
| Meaningful labels | Centralized generation in TaagCardBase. Context-aware per wrapper. |
| State announcements | "Taag claimed," "Hunt stop solved," celebration text announced immediately |
| Navigation order | Logical reading order = visual layout. Sticker bomb rotation doesn't affect DOM order. |
| Live regions | Scan results, toasts as `accessibilityLiveRegion="polite"`. Celebrations as `"assertive"`. |
| Map alternative | Sorted distance-based list overlay when screen reader active |
| Celebration dismiss | Auto-focus Continue button. Optional auto-dismiss (8-10s) in accessibility settings. |

**Cognitive Accessibility:**

| Requirement | Implementation |
|-------------|---------------|
| Consistent navigation | Same 5 tabs, same position, throughout app |
| Predictable behavior | Same gesture = same flow. No surprise modals. |
| Error prevention | Naming confirmation beat. "Abandon hunt?" confirmation. |
| Simple language | Conversational UI copy. "Scan saved!" not "Queued for synchronization." |
| Minimal cognitive load | Binary choices at peaks. One primary action per screen. Deferred complexity. |

### 13.5 Device-Specific Considerations

**iOS:**
- Dynamic Island / notch: safe area insets via NativeWind `safeAreaView` classes
- Haptic engine: Taptic Engine leveraged for richer patterns
- VoiceOver: primary screen reader, all flows tested end-to-end
- Silent mode: FeedbackManager detects ringer switch, compensates with stronger haptics

**Android:**
- Navigation bar (gesture/button): bottom tab bar avoids overlap
- Haptic variability: FeedbackManager detects capability, adapts gracefully
- TalkBack: all flows tested
- Fragmentation: test on 3 price tiers (budget, mid, flagship). Performance budgeted for Pixel 6a.
- Camera API: Expo Camera abstracts, but QR detection tested across 3+ devices

### 13.6 Testing Strategy

**Device Testing Matrix (MVP):**

| Device | OS | Tier | Purpose |
|--------|----|------|---------|
| iPhone SE (3rd gen) | iOS 16+ | Small | Minimum screen size |
| iPhone 14/15 | iOS 17+ | Standard | Primary target |
| iPhone 15 Pro Max | iOS 17+ | Large | Large screen, Dynamic Island |
| Pixel 6a | Android 8+ | Standard | Performance baseline (mid-range) |
| Samsung Galaxy A-series | Android 8+ | Standard | Budget Android, haptic variability |
| Samsung Galaxy S24 | Android 14+ | Large | Flagship Android |

**Accessibility Testing Protocol:**

| Test Type | Tool/Method | Frequency |
|-----------|------------|-----------|
| Automated a11y audit | `eslint-plugin-jsx-a11y` + custom rules | Every build (CI) |
| Screen reader walkthrough | VoiceOver (iOS) + TalkBack (Android) | Every user-facing feature |
| Reduced motion testing | System preference toggle | Every animation/celebration |
| Color contrast verification | Contrast checker vs. design tokens | Design token changes |
| Touch target verification | Layout inspector | Every interactive component |
| Keyboard/switch access | External keyboard + Switch Control | Quarterly full audit |
| Font scaling | 1.5x and 2x system font scale | Every text-containing component |

**Outdoor/Context Testing:**

| Scenario | What to Test |
|----------|-------------|
| Direct sunlight | Text readability, contrast, camera QR detection |
| Walking pace | Touch accuracy, ClueCard Peek readability, scan reliability |
| One-handed use | Thumb zone for primary actions, tab bar reach |
| Crowded/noisy | Haptic perceptibility, sound vs. silent mode |
| Low battery | Performance under CPU throttling, animation frame rates |

### 13.7 Implementation Guidelines

**For the Solo Developer:**

1. **Start accessible, don't retrofit.** Add `accessibilityRole`, `accessibilityLabel`, `accessibilityState` to every component from Day 1. Retrofitting is 3x the work.

2. **Test with VoiceOver weekly.** Turn it on, close your eyes, complete a scan. If you can't, fix it.

3. **NativeWind responsive utilities.** Use `w-full`, `flex-1`, `max-w-[430px]` for fluid layouts. Avoid fixed pixel widths except touch targets and icons.

4. **Safe area handling.** Root layout in `SafeAreaView`. NativeWind safe area classes for screen-edge content.

5. **`useTheme()` handles it.** The hook provides `canAnimate`, `canGlow`, `canAutoPlay`. Don't add separate reduced-motion checks.

6. **Test on the Pixel 6a.** If PassportPage scrolls smoothly there, it works everywhere.

7. **Font scaling test.** Set system font to 1.5x. Fix anything that clips, overflows, or becomes unreadable. Use `numberOfLines` + `ellipsizeMode` where text must be bounded.
