# TaagBack – System Architecture

## Overview

TaagBack follows a standard client/server architecture:

```
┌────────────────────────┐         ┌────────────────────────────┐
│  React Native App      │  HTTP   │  .NET 10 Web API           │
│  (Expo, TypeScript)    │ ──────► │  (ASP.NET Core, C#)        │
│                        │         │                            │
│  HuntListScreen        │         │  /api/hunts                │
│  HuntDetailScreen      │         │  /api/hunts/{id}/stops     │
│  QrScanScreen          │         │  /api/scan/{token}         │
└────────────────────────┘         └────────────┬───────────────┘
                                                │
                                      (in-memory store today;
                                       swap for SQL / NoSQL DB)
```

---

## Backend (server/)

**Framework**: ASP.NET Core 10 Minimal API + MVC Controllers  
**Language**: C# 13  
**Testing**: NUnit 4

### Layers

| Layer | Namespace | Responsibility |
|-------|-----------|----------------|
| Controllers | `TaagBack.Api.Controllers` | HTTP request/response mapping |
| Services | `TaagBack.Api.Services` | Business logic & data access abstraction |
| Models | `TaagBack.Api.Models` | Domain entities |

### Key Controllers

| Controller | Route | Description |
|------------|-------|-------------|
| `HuntsController` | `GET/POST/PUT/DELETE /api/hunts` | CRUD for hunts |
| `HuntStopsController` | `GET/POST/PUT/DELETE /api/hunts/{huntId}/stops` | CRUD for stops |
| `ScanController` | `GET /api/scan/{token}` | QR code token resolution |

### Current Data Store

Services use an **in-memory `List<T>`** for simplicity. Replace `HuntService` and `HuntStopService` with EF Core / Dapper implementations registered in `Program.cs` when ready.

---

## Frontend (ui/)

**Framework**: React Native 0.76 (Expo SDK 52)  
**Language**: TypeScript  
**State**: Local component state (no global store yet)

### Key Screens

| Screen | Description |
|--------|-------------|
| `HuntListScreen` | Shows all hunts; entry point |
| `HuntDetailScreen` | Shows stops for a selected hunt; entry to scanner |
| `QrScanScreen` | Scans a QR code token and shows the stop clue |

### API Client

`src/services/api.ts` contains typed wrappers around `fetch` for all backend endpoints. The base URL is read from `EXPO_PUBLIC_API_URL` (defaults to `http://localhost:5000`).

---

## Planned Improvements

- [ ] Add Entity Framework Core with SQLite / PostgreSQL
- [ ] Add user authentication (ASP.NET Identity or Auth0)
- [ ] Integrate `expo-camera` + `expo-barcode-scanner` for real QR scanning
- [ ] Add React Navigation for proper screen management
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] QR code image generation endpoint
