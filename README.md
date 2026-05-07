# EduFind — College Discovery Platform

A production-grade, full-stack college discovery platform built with Next.js 14, TypeScript, PostgreSQL, and Tailwind CSS. Bold Editorial design — completely different from generic ed-tech platforms.

## 🚀 Live Demo
- **App:** https://your-app.vercel.app
- **GitHub:** https://github.com/your-username/college-next

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 College Listing | Search, filter by state/type/course/fees, sort, paginate (12/page) |
| 🏫 College Detail | 5-tab detail page — Overview, Courses, Placements, Exams, Reviews |
| ⚖️ Compare Tool | Side-by-side comparison of 2–3 colleges with best/worst highlights |
| 🎯 Rank Predictor | JEE/CAT/NEET/GATE rank → recommended colleges with match strength |
| 📚 Courses | Browse all courses with filters, linked to colleges |
| 📝 Exams | Complete exam guide with eligibility, syllabus, dates, accepting colleges |
| 🏆 Rankings | 6 ranking types — Overall, Engineering, Management, Medical, Placement, Fees |
| 💬 Q&A Forum | Ask questions, post answers, sort/filter, solved status |
| 🔐 Auth | Signup with password strength, login with NextAuth JWT sessions |
| ❤️ Saved | Save colleges per user, view/unsave from dashboard |
| 📊 Dashboard | Personal stats, saved colleges preview, quick actions |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | Next.js API Routes (TypeScript) |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth.js (Credentials) + bcryptjs |
| HTTP Client | Axios |
| Icons | Lucide React |
| Hosting | Vercel (app) + Railway (database) |

---

## 🎨 Design System

Bold Editorial aesthetic — Playfair Display serif headlines, DM Sans body, ink-black (#0A0A0A) + cream (#F5F0E8) + accent yellow (#E8C547). Zero blue-and-white clichés.

---

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/your-username/college-next
cd college-next
npm install
```

### 2. Environment Variables
```bash
cp .env.example .env
```
Edit `.env`:
```
DATABASE_URL="postgresql://your_username@localhost:5432/college_next"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Setup
```bash
psql postgres -c "CREATE DATABASE college_next;"
npx prisma migrate dev --name init
npm run db:seed
```

### 4. Run
```bash
npm run dev
```
Open **http://localhost:3000**

---

## 📁 Project Structure

```
college-next/
├── app/
│   ├── page.tsx              # Bold editorial homepage
│   ├── colleges/             # Listing + detail pages
│   ├── courses/              # Course listing + detail
│   ├── exams/                # Exam guide + detail
│   ├── compare/              # Compare tool
│   ├── predict/              # Rank predictor
│   ├── qa/                   # Q&A forum
│   ├── rankings/             # College rankings
│   ├── saved/                # Saved colleges
│   ├── dashboard/            # User dashboard
│   ├── login/                # Auth pages
│   ├── signup/
│   └── api/                  # All API routes
├── components/
│   ├── layout/               # Navbar, Footer, Providers
│   ├── college/              # CollegeCard
│   ├── filters/              # SearchBar, FilterPanel
│   ├── compare/              # CompareTable
│   ├── predict/              # PredictorForm
│   ├── qa/                   # Q&A components
│   └── ui/                   # SaveButton, Skeleton, EmptyState
├── lib/
│   ├── prisma.ts             # DB singleton
│   ├── auth.ts               # NextAuth config
│   └── utils.ts              # Helpers
├── types/
│   └── index.ts              # TypeScript interfaces
└── prisma/
    ├── schema.prisma         # Full DB schema
    └── seed.ts               # 30 colleges + 10 exams
```

---

## 🚢 Deployment

### Railway (Database)
1. Create account at railway.app
2. New Project → Add Service → PostgreSQL
3. Copy the `DATABASE_URL` from Connect tab
4. Run migrations: `DATABASE_URL="..." npx prisma migrate deploy`
5. Seed: `DATABASE_URL="..." npm run db:seed`

### Vercel (Frontend)
1. Push code to GitHub
2. Import repo at vercel.com
3. Add environment variables:
   - `DATABASE_URL` → Railway URL
   - `NEXTAUTH_SECRET` → any random string
   - `NEXTAUTH_URL` → your Vercel URL
4. Deploy

---

## 🔑 Demo Credentials
- Email: `demo@example.com`
- Password: `password123`

---

## 📊 Database

- **30 colleges** — 7 IITs, 6 NITs, 3 IIMs, 4 private engineering, 4 private MBA, 4 state universities, 2 medical
- **10 exams** — JEE Main, JEE Advanced, CAT, NEET, GATE, BITSAT, VITEEE, CLAT, MAT, GMAT
- **5 Q&A** questions with 2 answers each
- **3 reviews** with pros/cons

---

## ⚠️ Architecture Decisions

1. **Next.js App Router** — Unified frontend + backend, no separate Express server needed
2. **Prisma ORM** — Type-safe DB queries, easy migrations, works with PostgreSQL
3. **NextAuth Credentials** — Simple email/password auth with JWT sessions
4. **localStorage for Compare** — No DB needed for temporary compare selections
5. **Rule-based Predictor** — Fast, no ML needed, easily extendable dataset
6. **Server Components + Client Components** — Server for data-fetching pages, Client for interactive UIs

---

Built for the Blostem Technologies Internship Task — Track B: College Discovery Platform
