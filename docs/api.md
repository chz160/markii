# TaagBack REST API Reference

Base URL: `http://localhost:5000` (development)

OpenAPI schema available at `/openapi/v1.json` when running in Development mode.

---

## Hunts

### `GET /api/hunts`
Returns all hunts.

**Response** `200 OK`
```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Downtown QR Quest",
    "description": "Explore the city centre!",
    "createdByUserId": "user-1",
    "createdAt": "2026-03-01T10:00:00Z",
    "isActive": true,
    "stops": []
  }
]
```

---

### `GET /api/hunts/{id}`
Returns a single hunt by ID.

**Response** `200 OK` | `404 Not Found`

---

### `POST /api/hunts`
Creates a new hunt.

**Request body**
```json
{
  "name": "Museum Mystery",
  "description": "Solve clues across 5 galleries.",
  "createdByUserId": "user-42"
}
```

**Response** `201 Created` with the created hunt.

---

### `PUT /api/hunts/{id}`
Updates an existing hunt.

**Response** `200 OK` | `404 Not Found`

---

### `DELETE /api/hunts/{id}`
Deletes a hunt.

**Response** `204 No Content` | `404 Not Found`

---

## Hunt Stops

### `GET /api/hunts/{huntId}/stops`
Returns all stops for a hunt, ordered by `order` field.

**Response** `200 OK` | `404 Not Found` (hunt not found)

---

### `GET /api/hunts/{huntId}/stops/{id}`
Returns a single stop.

**Response** `200 OK` | `404 Not Found`

---

### `POST /api/hunts/{huntId}/stops`
Adds a stop to a hunt.

**Request body**
```json
{
  "title": "The Old Clock Tower",
  "clue": "Where time stands still, look beneath the shadow.",
  "hint": "Check the base of the clock.",
  "order": 1
}
```

**Response** `201 Created` with the new stop including an auto-generated `qrCodeToken`.

---

### `PUT /api/hunts/{huntId}/stops/{id}`
Updates a stop.

**Response** `200 OK` | `404 Not Found`

---

### `DELETE /api/hunts/{huntId}/stops/{id}`
Deletes a stop.

**Response** `204 No Content` | `404 Not Found`

---

## QR Scan

### `GET /api/scan/{token}`
Resolves a QR code token. Called by the mobile app after scanning a QR image.

**Path parameter**: `token` — the `qrCodeToken` value from a `HuntStop`.

**Response** `200 OK`
```json
{
  "id": "...",
  "huntId": "...",
  "order": 2,
  "title": "The Old Clock Tower",
  "clue": "Where time stands still, look beneath the shadow.",
  "hint": "Check the base of the clock.",
  "qrCodeToken": "abc123...",
  "createdAt": "2026-03-01T10:00:00Z"
}
```

**Response** `404 Not Found`
```json
{ "message": "QR code not found or has expired." }
```
