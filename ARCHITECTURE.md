# Real Portfolio Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACE                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Home Page     Auth Pages      Dashboard     Project View   │
│  (Public)      (Sign up/in)    (Protected)   (Protected)   │
│                                                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              NEXT.JS API ROUTES & SERVER                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  NextAuth              Projects API         Session API     │
│  ├─ /api/auth/signin   ├─ GET /projects     ├─ /session   │
│  ├─ /api/auth/signup   ├─ POST /projects    └─ /status    │
│  ├─ /api/auth/signout  ├─ GET /projects/[id]              │
│  └─ /auth/[...nextauth]├─ PUT /projects/[id]              │
│                        └─ DELETE /projects/[id]            │
│                                                              │
│  Middleware: Route Protection & Authentication              │
│                                                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    PRISMA ORM                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User Model       Portfolio Model     ClientProject Model   │
│  ├─ id           ├─ id                ├─ id               │
│  ├─ email        ├─ userId            ├─ portfolioId      │
│  ├─ password     ├─ title             ├─ userId           │
│  ├─ name         ├─ description       ├─ title            │
│  └─ portfolio    └─ projects          ├─ description      │
│                                        ├─ status           │
│                                        ├─ progress (0-100) │
│                                        ├─ dates            │
│                                        └─ notes            │
│                                                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│          POSTGRESQL DATABASE (Neon)                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  users table          portfolios table   client_projects    │
│  ├─ id               ├─ id               ├─ id             │
│  ├─ email (unique)   ├─ userId (unique) ├─ portfolioId    │
│  ├─ password         ├─ title           ├─ userId         │
│  └─ ...              └─ ...             └─ ...            │
│                                                              │
│  Relationships:                                             │
│  User 1 ──→ 1 Portfolio 1 ──→ N ClientProjects            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### User Sign Up Flow
```
User Input
   ↓
Sign Up Form (/auth/signup)
   ↓
Validation (Zod)
   ↓
Check if user exists
   ↓
Hash password (bcrypt)
   ↓
Create User in DB
   ↓
Create Portfolio for User
   ↓
Automatic Sign In
   ↓
Redirect to Dashboard
```

### Project View Flow
```
User Clicks Dashboard
   ↓
NextAuth Session Check
   ↓
Fetch User Projects via API
   ↓
Prisma Query Database
   ↓
Return Projects
   ↓
Render Dashboard with Projects
   ↓
Client can click to view details
```

### Project Update Flow (Backend)
```
Team Updates Project via API
   ↓
Validation & Authorization
   ↓
Update DB via Prisma
   ↓
Return Success
   ↓
Client Sees Update in Real-Time
   (Dashboard auto-refreshes or shows notification)
```

## 🔐 Security Layers

```
┌──────────────────────────────────┐
│   Input Validation (Zod)         │ ← Prevents invalid data
├──────────────────────────────────┤
│   Password Hashing (bcrypt)      │ ← Passwords never stored plain
├──────────────────────────────────┤
│   Session Management (NextAuth)  │ ← Secure authentication
├──────────────────────────────────┤
│   Route Middleware Protection    │ ← Blocks unauthorized access
├──────────────────────────────────┤
│   Prisma Query Isolation         │ ← Prevents SQL injection
├──────────────────────────────────┤
│   User Data Filtering            │ ← Users only see own data
├──────────────────────────────────┤
│   HTTPS/TLS (in production)      │ ← Encrypted communication
└──────────────────────────────────┘
```

## 📱 Frontend Components

### Authentication Pages
- **Sign Up** (`/auth/signup`)
  - Form validation
  - Password confirmation
  - Email uniqueness check
  
- **Sign In** (`/auth/signin`)
  - Email & password login
  - Error handling
  - Redirect to dashboard on success

### Dashboard
- **Main Dashboard** (`/dashboard`)
  - Project grid/list
  - Project status filtering
  - Progress visualization
  - Quick access to details
  
- **Project Details** (`/dashboard/projects/[id]`)
  - Full project information
  - Timeline visualization
  - Progress details
  - Deliverables
  - Project notes

## 🌐 API Endpoints

```
Authentication
├─ POST   /api/auth/signin          # Sign in with credentials
├─ POST   /api/auth/signup          # Create new account
├─ POST   /api/auth/signout         # Log out
└─ GET    /api/auth/session         # Get current session

Projects
├─ GET    /api/projects             # List user's projects
├─ POST   /api/projects             # Create new project
├─ GET    /api/projects/[id]        # Get project details
├─ PUT    /api/projects/[id]        # Update project
└─ DELETE /api/projects/[id]        # Delete project
```

## 🚀 Deployment Architecture

```
┌────────────────────────────────────────────────────┐
│          VERCEL (Frontend + Backend)               │
│  ┌────────────────────────────────────────────┐   │
│  │  Next.js App                               │   │
│  │  ├─ Pages & Components                     │   │
│  │  ├─ API Routes                             │   │
│  │  └─ Server Actions                         │   │
│  └────────────────────────────────────────────┘   │
│              ↓                                      │
│  ┌────────────────────────────────────────────┐   │
│  │  Vercel Edge Functions (Optional)         │   │
│  │  ├─ Middleware                             │   │
│  │  └─ Caching                                │   │
│  └────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────────────────┐
│       NEON POSTGRESQL (Database)                  │
│  ├─ Automatic backups                            │
│  ├─ Automatic scaling                            │
│  ├─ High availability                            │
│  └─ Connection pooling                           │
└────────────────────────────────────────────────────┘
```

## 📊 Database Relationships

```
┌─────────────┐
│    Users    │
└──────┬──────┘
       │ 1
       │ has
       │
       ▼ N
┌──────────────────┐         ┌──────────────────────┐
│   Portfolios     │  1 ───→ N  ClientProjects    │
│                  │ has        │                  │
│ - id             │            │ - id             │
│ - userId (FK)    │            │ - portfolioId(FK)│
│ - title          │            │ - userId (FK)    │
│ - description    │            │ - title          │
└──────────────────┘            │ - status         │
                                │ - progress       │
                                │ - dates          │
                                │ - notes          │
                                └──────────────────┘
```

## 🔄 Session Management

```
Client Login
   ↓
Credentials → NextAuth
   ↓
JWT Token Generated
   ↓
Session Established
   ↓
Protected Routes Check Token
   ↓
Access Granted / Denied
   ↓
Session Expires After 30 Days
   ↓
Re-login Required
```

## 📈 Scalability

- **Database**: Neon PostgreSQL scales automatically
- **Server**: Vercel serverless functions scale automatically
- **Frontend**: Static generation + revalidation
- **Sessions**: JWT-based (stateless)

## 🔄 Real-Time Updates

Options for real-time updates (future enhancements):
1. **Polling** - Dashboard refreshes every 30 seconds
2. **WebSockets** - Using Socket.io or Vercel KV
3. **Server-Sent Events** - Vercel Functions + Edge
4. **Push Notifications** - Browser notifications API

---

This architecture is production-ready, secure, and scalable! 🎉
