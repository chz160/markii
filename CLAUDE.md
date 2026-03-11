# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TaagBack is a QR-code-powered scavenger hunt platform. Hunt creators build experiences with clue stops behind printable QR codes; players scan them with the mobile app to progress through hunts.

## Build & Run Commands

### Backend (.NET 10 API)

```bash
# Run the API server
dotnet run --project server/TaagBack.Api
# → http://localhost:5000
# → OpenAPI spec: http://localhost:5000/openapi/v1.json (dev only)

# Run all tests
dotnet test server/TaagBack.slnx

# Run a single test by name
dotnet test server/TaagBack.Tests --filter "FullyQualifiedName~HuntServiceTests.Create_ShouldAddHuntAndReturnIt"

# Build without running
dotnet build server/TaagBack.slnx
```

### Frontend (React Native / Expo)

```bash
# Install dependencies (from ui/TaagBack/)
cd ui/TaagBack && npm install

# Start dev server
npm start --prefix ui/TaagBack

# Platform-specific
npm run web --prefix ui/TaagBack
npm run android --prefix ui/TaagBack
npm run ios --prefix ui/TaagBack
```

## Architecture

**Client/server architecture**: React Native (Expo) mobile app communicates over HTTP with a .NET 10 ASP.NET Core Web API.

### Backend (`server/`)

Three-layer architecture with dependency injection:

- **Controllers** (`Controllers/`) — HTTP request/response mapping. Three controllers: `HuntsController` (`/api/hunts`), `HuntStopsController` (`/api/hunts/{huntId}/stops`), `ScanController` (`/api/scan/{token}`)
- **Services** (`Services/`) — Business logic behind interfaces (`IHuntService`/`HuntService`, `IHuntStopService`/`HuntStopService`). Registered as singletons in `Program.cs`. Currently use in-memory `List<T>` storage, designed to be swapped for DB-backed implementations.
- **Models** (`Models/`) — Domain entities: `Hunt` and `HuntStop`

Testing uses **NUnit 4** in `TaagBack.Tests/`.

### Frontend (`ui/TaagBack/`)

- **Expo SDK 55**, React Native 0.83, TypeScript (strict mode)
- Screen components in `src/screens/` — `HuntListScreen`, `HuntDetailScreen`, `QrScanScreen`
- Typed API client in `src/services/api.ts` — base URL from `EXPO_PUBLIC_API_URL` env var (defaults to `http://localhost:5000`)
- Navigation is currently manual state management in `App.tsx` (React Navigation planned)
- No global state management yet (local component state only)

## BMAD Method Integration

This project uses the BMAD framework (v6.0.4) for structured development workflows. BMAD agents, workflows, and configuration live in `_bmad/`. Output artifacts go to `_bmad-output/`. Available as slash commands (type `/bmad-` to see options).

Key BMAD paths:
- Agent definitions: `_bmad/bmm/agents/`
- Workflows: `_bmad/bmm/workflows/` (organized by phase)
- Module config: `_bmad/bmm/config.yaml` (load before any agent activation)
- Planning artifacts: `_bmad-output/planning-artifacts/`
- Implementation artifacts: `_bmad-output/implementation-artifacts/`

## Key Conventions

- Services are registered as **singletons** via DI in `Program.cs` — use interface-based abstractions
- CORS is currently open (any origin/header/method) for development
- The solution file is `server/TaagBack.slnx` (XML-based solution format)
- API documentation lives in `docs/api.md`; architecture decisions in `docs/architecture.md`
