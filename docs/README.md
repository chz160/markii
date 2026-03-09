# TaagBack

**TaagBack** is a mobile scavenger hunt platform powered by QR codes. Hunt creators build experiences with clues hidden behind printable QR codes; players scan them with their phones to progress through the hunt.

---

## Project Structure

```
markii/
├── docs/                  # Global project documentation
│   ├── README.md          # This file
│   ├── architecture.md    # System architecture overview
│   └── api.md             # REST API reference
├── server/                # .NET 10 backend
│   ├── TaagBack.Api/      # ASP.NET Core Web API
│   ├── TaagBack.Tests/    # NUnit unit tests
│   └── TaagBack.slnx      # .NET solution file
└── ui/
    └── TaagBack/          # React Native (Expo) mobile app
```

---

## Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| .NET SDK | 10.x |
| Node.js | 18+ |
| npm | 9+ |
| Expo CLI | latest |

### Run the API

```bash
cd server/TaagBack.Api
dotnet run
# → http://localhost:5000
# → OpenAPI: http://localhost:5000/openapi/v1.json (dev only)
```

### Run the Mobile App

```bash
cd ui/TaagBack
npm install
npm run web      # browser preview
npm run android  # Android emulator / device
npm run ios      # iOS simulator (macOS only)
```

---

## Features

- 📋 **Create Hunts** – define a scavenger hunt with a name and description
- 📍 **Add Stops** – each stop has a title, clue, optional hint, and a unique QR token
- 📷 **Scan QR Codes** – players scan QR codes to reveal the next clue
- 🔗 **REST API** – full CRUD for hunts and stops; QR scan endpoint

---

## Contributing

See [architecture.md](architecture.md) for design decisions and [api.md](api.md) for endpoint documentation.
