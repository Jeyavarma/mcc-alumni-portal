# MCC Alumni & Development Office Portal

> **Madras Christian College** · Est. 1837 · *In Hoc Signo*

A premium, full-stack alumni relations and institutional development portal built exclusively for **Madras Christian College, Chennai**.

---

## 🏛️ About

This portal serves as the central hub for:
- **Alumni CRM** — profiles, engagement tracking, communication logs
- **Fundraising** — crowdfunding campaigns, endowment corpus tracking
- **CSR & Corporate Relations** — proposal workflow (Draft → Approved)
- **Reunion Management** — Silver/Golden Jubilee events, RSVP tracking
- **Content Management** — news, success stories, announcements
- **Administrative Calendar** — yearly activity planner
- **Reports** — downloadable PDF reports
- **AI Assistant** — smart FAQ chatbot (MCC Assist)

---

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (optional — runs in demo mode without it)

### 1. Frontend

```bash
cd client
npm install
npm run dev
# Opens at http://localhost:5173
```

### 2. Backend (optional for full API)

```bash
cd server
npm install
npm run dev
# Runs at http://localhost:5000
```

### 3. Demo Login Credentials

| Role      | Email                | Password    |
|-----------|----------------------|-------------|
| Admin     | admin@mcc.edu.in     | admin123    |
| Staff     | staff@mcc.edu.in     | staff123    |
| Alumni    | alumni@mcc.edu.in    | alumni123   |
| Corporate | csr@tcs.com          | csr123      |

---

## 🗂️ Project Structure

```
mcc/
├── client/              # React + Vite + Tailwind CSS
│   └── src/
│       ├── components/  # UI, Layout, AI Assistant
│       ├── pages/       # Dashboard, CRM, Fundraising, CSR, etc.
│       ├── context/     # AuthContext
│       ├── data/        # Sample data store
│       └── utils/       # Helpers
│
├── server/              # Node.js + Express REST API
│   ├── src/
│   │   ├── routes/      # All API routes
│   │   └── middleware/  # JWT auth
│   ├── prisma/
│   │   └── schema.prisma  # PostgreSQL schema
│   └── data/            # Seed JSON data
│
└── docker-compose.yml   # Full stack deployment
```

---

## 🎨 Design System

| Token        | Value     | Usage                  |
|--------------|-----------|------------------------|
| `maroon-800` | `#7b1c2e` | Primary brand color    |
| `maroon-700` | `#a52840` | Hover states           |
| `gold-500`   | `#c8961a` | Accent color           |
| `gold-400`   | `#f0b429` | Highlights             |
| Surface Dark | `#1a1012` | Card backgrounds       |
| Text Primary | `#f5ede0` | Body text              |

**Fonts:** Inter (sans) + Crimson Text (serif headings)

---

## 📡 API Reference

| Method | Endpoint                           | Description           |
|--------|------------------------------------|-----------------------|
| POST   | `/api/auth/login`                  | Login → JWT           |
| POST   | `/api/auth/register`               | Alumni registration   |
| GET    | `/api/alumni`                      | List alumni           |
| POST   | `/api/alumni`                      | Create alumni         |
| GET    | `/api/fundraising/campaigns`       | List campaigns        |
| POST   | `/api/fundraising/donations`       | Record donation       |
| GET    | `/api/csr/proposals`               | List proposals        |
| PATCH  | `/api/csr/proposals/:id/status`    | Update status         |
| GET    | `/api/reunion/events`              | List events           |
| POST   | `/api/reunion/rsvp`                | Submit RSVP           |
| GET    | `/api/calendar`                    | Get calendar events   |
| GET    | `/api/reports/:type`               | Generate report       |
| POST   | `/api/ai/chat`                     | AI assistant query    |

---

## 🗄️ Database Setup (PostgreSQL)

```bash
# Install Prisma
cd server
npm install prisma @prisma/client

# Push schema to database
npx prisma db push

# Open Prisma Studio (GUI)
npx prisma studio
```

---

## 🐳 Docker Deployment

```bash
docker-compose up -d
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
# Database: localhost:5432
```

---

## 📝 License

© 2024 Madras Christian College · Alumni & Development Office  
Built with ❤️ for MCC's 175+ year legacy of excellence.
