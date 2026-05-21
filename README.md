# Asset Management API

System for managing company IT assets such as laptops, monitors, and other hardware.

---

## Tech Stack

* 🟢 Node.js (Express.js)
* 🔷 TypeScript
* 🗄️ MariaDB
* 🔒 JWT Authentication
* 🐳 Docker

---

## Roadmap

| Feature | Status | Type |
|---|---|---|
| Asset CRUD API | ✅ Done | Core |
| JWT Authentication | ✅ Done | Core |
| Asset Assignment | ✅ Done | Core |
| Asset Status Management | 🚧 In Progress | Core |
| Docker Setup | ⏳ Planned | Infrastructure |
| Asset Filtering & Search | ⏳ Planned | Optional |
| Warranty Tracking | ⏳ Planned | Optional |
| Email Notifications | ⏳ Planned | Optional |

---

## Project Status

🚧 Currently in early development.

The project is being built step by step with a focus on clean architecture, maintainability, and scalability.

---

## Base URL

All endpoints are prefixed with:

`/api/v1`

---

## Authentication

Protected endpoints require a JWT Bearer Token.

Example:

```http
Authorization: Bearer <your_token>
```

---

## Endpoints

### Authentication

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| ![POST](https://img.shields.io/badge/POST-green) | `/login` | ❌ | ✅ Ready |

### Assets

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| ![GET](https://img.shields.io/badge/GET-blue) | `/assets?page=1&limit=20` | 🔒 | ✅ Ready |
| ![GET](https://img.shields.io/badge/GET-blue) | `/assets/:id` | 🔒 | ✅ Ready |
| ![POST](https://img.shields.io/badge/POST-green) | `/assets` | 🔒 | ✅ Ready |
| ![PUT](https://img.shields.io/badge/PUT-orange) | `/assets/:id` | 🔒 | ✅ Ready |
| ![DELETE](https://img.shields.io/badge/DELETE-red) | `/assets/:id` | 🔒 | ✅ Ready |

### Asset Assignments

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| ![GET](https://img.shields.io/badge/GET-blue) | `/asset-assignments?page=1&limit=50` | 🔒 | ✅ Ready |
| ![POST](https://img.shields.io/badge/POST-green) | `/asset-assignments` | 🔒 | ✅ Ready |
| ![PATCH](https://img.shields.io/badge/PATCH-yellow) | `/asset-assignments/:id` | 🔒 | ✅ Ready |

### Asset Status Management

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| ![PATCH](https://img.shields.io/badge/PATCH-yellow) | `/assets/:id/status` | 🔒 | 🚧 In Progress |
| ![GET](https://img.shields.io/badge/GET-blue) | `/asset-statuses?assetId=:id` | 🔒 | 🚧 In Progress |

### Legend

- 🔒 Protected endpoint
- ❌ Public endpoint

---

## Query Parameters

| Parameter | Type   | Description          |
|------------|--------|----------------------|
| page       | number | Current page number  |
| limit      | number | Items per page       |

---

## Login

```json
{
    "email": "admin@nova-app.com",
    "password": "passwort12345"
}
```

## Asset

```json
{
  "id": 1,
  "brand": "Lenovo",
  "type": "Laptop",
  "reseller": "Amazon",
  "purchasedAt": "2025-03-01",
  "model": "Thinkpad 7420",
  "serial": "SN-DL-001-7420",
  "warrantyMonths": 36,
  "price": 1299.99
}
```

## Asset Assignment

```json
{
  "id": 1,
  "assetId": 3,
  "userId": 2,
  "assignedAt": "2026-01-05",
  "returnedAt": "2026-02-10",
  "notes": "Laptop returned"
}
```

---

## Status Codes

| Code | Description         |
|------|---------------------|
| 200  | OK                  |
| 201  | Created             |
| 400  | Bad Request         |
| 404  | Not Found           |
| 500  | Internal Server Error |