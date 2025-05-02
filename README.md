# 🛒 Orders Dashboard – Angular 17 + SSR + PWA

A modern orders dashboard for a fictional e-commerce platform, built with Angular 17, TailwindCSS, SSR, and PWA support. Features include viewing, filtering, editing, and creating orders using a mock API.

### Hosting

To check out the project, the webapp is hosted on

`https://orders-dashboard-4f322.web.app/`

### Backend

This project uses MockAPI.io, a hosted REST API service, to simulate a backend for handling order data.

All order-related HTTP operations in the app (view, create, update, delete) are handled through a MockAPI.io project.
The available resource created for this project is "orders", CRUD Operations can be handled through this URL

GET - `https://6814a289225ff1af162980a5.mockapi.io/api/orders` - List Orders Order[]
GET - `https://6814a289225ff1af162980a5.mockapi.io/api/orders/{orderID}` - Details about an Order
POST - `https://6814a289225ff1af162980a5.mockapi.io/api/orders` - Create a new Order
PUT - `https://6814a289225ff1af162980a5.mockapi.io/api/orders/{orderID}` - Update details about an Order
DELETE - `https://6814a289225ff1af162980a5.mockapi.io/api/orders/{orderID}` - Update details about an Order

---

## ✨ Features

- Angular 17 Standalone Components
- TailwindCSS with Dark/Light Theme Toggle
- Server-Side Rendering with Angular Universal + Hydration
- PWA Support: Installable with Offline Caching
- Mock Backend using `json-server`
- Orders: List, Create, Edit, Delete
- State Management via Angular Signals
- Firebase Deployment Ready

---

## 🧑‍💻 Getting Started

### 1. Install Dependencies

```bash
npm install
```
