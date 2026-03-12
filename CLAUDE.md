# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TaagBack is a mobile scavenger hunt platform powered by QR codes. Hunt creators build experiences with clues hidden behind printable QR codes; players scan them to progress through the hunt.

## Architecture

- **TaagBack.Api/** — ASP.NET Core 10 Web API (C# 13, nullable enabled)
- **TaagBack.Tests/** — NUnit 4 unit tests for the API
- **TaagBack/** — React Native (Expo SDK 55) mobile app in TypeScript
- **TaagBack.slnx** — .NET solution file at repo root

Backend uses controller → service → in-memory store pattern. Services are registered via DI in `Program.cs`. Data is currently stored in `List<T>` (no database yet). CORS allows all origins.

Frontend uses screen-based navigation managed via state in `App.tsx`, with a typed fetch API client in `src/services/api.ts`.

## Commands

### Backend

```bash
# Run API server (http://localhost:5218, https://localhost:7014)
dotnet run --project TaagBack.Api

# Run all tests
dotnet test TaagBack.Tests

# Run a single test by name
dotnet test TaagBack.Tests --filter "FullyQualifiedName~TestMethodName"
```

### Frontend

```bash
cd TaagBack
npm install
npm start        # Expo dev server
npm run web      # Browser preview
npm run android  # Android emulator/device
npm run ios      # iOS simulator (macOS)
```

## API Endpoints

- `GET/POST /api/hunts`, `GET/PUT/DELETE /api/hunts/{id}`
- `GET/POST /api/hunts/{huntId}/stops`, `GET/PUT/DELETE /api/hunts/{huntId}/stops/{id}`
- `GET /api/scan/{token}` — resolve QR code token to hunt stop

## BMAD Method

This project uses the BMAD method for AI-assisted development. Agent definitions and workflows live under `_bmad/`. Configuration is in `.github/copilot-instructions.md`. Use `/bmad-` prefixed slash commands to access BMAD workflows.
