# 📸 Quick Visual Guide

## User Journey

```
┌─────────────────────────────────────────────────────────────┐
│                    LANDING PAGE                             │
│              (Public - No Login Needed)                     │
│                                                              │
│    [Home] [About] [Contact]  [Sign Up] [Sign In]           │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                              ▼
   ┌─────────────┐           ┌──────────────┐
   │ Sign Up     │           │  Sign In     │
   │ (New User)  │           │ (Existing)   │
   └──────┬──────┘           └──────┬───────┘
          │                         │
          └──────────────┬──────────┘
                         ▼
            ┌────────────────────────┐
            │  DASHBOARD             │
            │ (Protected - Login OK) │
            │                        │
            │  Your Projects:        │
            │  ☐ Website Redesign    │
            │    Status: In Progress │
            │    Progress: 65%       │
            │  ☐ Mobile App          │
            │    Status: Planning    │
            │    Progress: 20%       │
            │  ☐ Branding            │
            │    Status: Completed   │
            │    Progress: 100%      │
            └────────┬───────────────┘
                     │
                     ▼ (Click Project)
            ┌────────────────────────┐
            │  PROJECT DETAILS       │
            │  Website Redesign      │
            │                        │
            │  Status: In Progress   │
            │  Progress: 65% ████▒  │
            │  Started: Jan 15, 2024 │
            │  Target: Mar 15, 2024  │
            │                        │
            │  Description:          │
            │  Complete redesign of  │
            │  our website...        │
            │                        │
            │  Deliverables:        │
            │  ✓ Wireframes         │
            │  ✓ Designs            │
            │  ◐ Frontend Code      │
            │  ○ Backend            │
            │                        │
            │  Notes:               │
            │  Frontend 90% done.   │
            │  Backend starting...  │
            └────────────────────────┘
```

## Sign Up Process

```
Step 1: Visit /auth/signup
        ↓
        Enter Details
        ├─ Full Name
        ├─ Email
        ├─ Password
        └─ Confirm Password
        ↓
Step 2: Validation
        ├─ Email format valid? ✓
        ├─ Password 6+ chars? ✓
        ├─ Passwords match? ✓
        └─ Email not taken? ✓
        ↓
Step 3: Create Account
        ├─ Hash password
        ├─ Store in database
        ├─ Create portfolio
        └─ Generate session
        ↓
Step 4: Auto Login
        └─ Redirect to /dashboard
```

## Sign In Process

```
Step 1: Visit /auth/signin
        ↓
        Enter Credentials
        ├─ Email
        └─ Password
        ↓
Step 2: Verify
        ├─ Find user by email
        └─ Compare password hash
        ↓
Step 3: Create Session
        ├─ Generate JWT token
        ├─ Set secure cookie
        └─ Store session
        ↓
Step 4: Redirect
        └─ Go to /dashboard
```

## Dashboard Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  DASHBOARD (/dashboard)                                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Navigation Bar                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Portfolio Dashboard  [User Name]  [Sign Out] ⟶         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  Your Projects (Loading from /api/projects)               │
│  ┌────────────────────┐  ┌────────────────────┐             │
│  │ Project 1          │  │ Project 2          │             │
│  │                    │  │                    │             │
│  │ Status: Planning   │  │ Status: Completed  │             │
│  │ Progress: 20% ▒░░░ │  │ Progress: 100% ████│             │
│  │                    │  │                    │             │
│  │ Started: Jan 1     │  │ Finished: Feb 28   │             │
│  │ Target: Mar 1      │  │                    │             │
│  │                    │  │                    │             │
│  │ [Click to View]    │  │ [Click to View]    │             │
│  └────────────────────┘  └────────────────────┘             │
│                                                              │
│  ┌────────────────────┐                                      │
│  │ Project 3          │                                      │
│  │                    │                                      │
│  │ Status: In Progress│                                      │
│  │ Progress: 75% ███▒ │                                      │
│  │                    │                                      │
│  │ Started: Feb 1     │                                      │
│  │ Target: Apr 15     │                                      │
│  │                    │                                      │
│  │ [Click to View]    │                                      │
│  └────────────────────┘                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Project Card Details

```
┌──────────────────────────────────┐
│  Website Redesign                │  ← Title
│  [In Progress] ◄─ Status Badge   │
│                                  │
│  Complete redesign with new      │  ← Description
│  branding and features...        │
│                                  │
│  Progress: 65%                   │  ← Progress Label
│  ████████████████░░░░░░░░░░░░░░  │  ← Progress Bar
│                                  │
│  Started: Jan 15, 2024           │  ← Dates
│  Target: Mar 15, 2024            │
│                                  │
│  [Click to view full details]    │  ← Interactive
└──────────────────────────────────┘
```

## Status Badge Colors

```
┌──────────────────────────────────────┐
│  Planning      → Blue  🔵           │
│  In Progress   → Yellow 🟡          │
│  Completed     → Green 🟢           │
└──────────────────────────────────────┘
```

## API Call Flow

```
Client Request
    ↓
┌─────────────────────────────────────┐
│ Next.js API Route                   │
├─────────────────────────────────────┤
│ 1. Check Authentication             │
│    └─ Is user logged in? ✓          │
│                                     │
│ 2. Validate Input                   │
│    └─ Is data valid? ✓              │
│                                     │
│ 3. Query Database                   │
│    └─ Prisma filters by userId      │
│                                     │
│ 4. Return Response                  │
│    └─ Send JSON data back           │
└─────────────────────────────────────┘
    ↓
Client Receives Data
    ↓
Display on Page
```

## Database Query Example

```
User clicks: http://localhost:3000/dashboard
    ↓
Page loads, calls: fetch('/api/projects')
    ↓
API Route runs:
    ├─ const session = await auth()
    ├─ if (!session) return 401
    └─ const projects = await prisma.clientProject.findMany({
         where: { userId: session.user.id }  ← Filters by user!
       })
    ↓
Only returns that user's projects:
    ├─ Project A (belongs to user123)
    ├─ Project B (belongs to user123)
    └─ Project C (belongs to user123)
    
    NOT returned:
    ├─ Project X (belongs to user456)
    ├─ Project Y (belongs to user789)
    └─ Project Z (belongs to user012)
```

## Password Security

```
User enters: "MyPassword123"
    ↓
Hashing with bcrypt (10 rounds):
    └─ $2b$10$SomeHashedValueThatIs60CharsLong...
    ↓
Stored in database:
    └─ [hashed value only - never plain text]
    ↓
When signing in:
    ├─ User enters: "MyPassword123"
    ├─ Hash it again
    ├─ Compare to stored hash
    └─ If match → Login success ✓
```

## Session Management

```
Step 1: User Logs In
    └─ Credentials verified ✓
    ↓
Step 2: JWT Token Created
    └─ Signed with NEXTAUTH_SECRET
    ↓
Step 3: Token Stored
    ├─ Browser cookie (HTTP only)
    └─ 30-day expiration
    ↓
Step 4: Protected Page Access
    ├─ User requests /dashboard
    ├─ Middleware checks token
    ├─ Token valid? ✓
    └─ Allow access
    ↓
Step 5: Session Expires
    └─ After 30 days → redirect to /auth/signin
```

## Deployment Architecture

```
┌─────────────────────────────────────────────┐
│          VERCEL (Global CDN)                │
├─────────────────────────────────────────────┤
│                                             │
│  ┌────────────────────────────────────┐    │
│  │  Your Domain                       │    │
│  │  (yourdomain.com)                  │    │
│  │                                    │    │
│  │  ├─ /auth/signup      (Edge)       │    │
│  │  ├─ /auth/signin      (Edge)       │    │
│  │  ├─ /dashboard        (Edge)       │    │
│  │  └─ /api/*            (Serverless)│    │
│  └────────────────────────────────────┘    │
│           ↓                                 │
│           Connects to                       │
└───────────┼───────────────────────────────┘
            ↓
        ┌─────────────────────────────────┐
        │  NEON POSTGRESQL                │
        ├─────────────────────────────────┤
        │                                 │
        │  users       portfolios         │
        │  projects    sessions           │
        │                                 │
        └─────────────────────────────────┘
```

## Security Layers Visualization

```
              ┌─────────────────────┐
              │   User Input        │
              └──────────┬──────────┘
                         ▼
         ┌────────────────────────────────┐
         │  1. Input Validation (Zod)     │ ← No invalid data
         └────────────────┬───────────────┘
                          ▼
         ┌────────────────────────────────┐
         │  2. Authentication Check       │ ← Must be logged in
         └────────────────┬───────────────┘
                          ▼
         ┌────────────────────────────────┐
         │  3. User Authorization         │ ← Can only see own data
         └────────────────┬───────────────┘
                          ▼
         ┌────────────────────────────────┐
         │  4. Database Query Filtering   │ ← WHERE userId = :id
         └────────────────┬───────────────┘
                          ▼
         ┌────────────────────────────────┐
         │  5. HTTPS/TLS Encryption       │ ← Secure transmission
         └────────────────┬───────────────┘
                          ▼
                   ✅ SAFE DATA
```

---

**Visual Guide - Now you can see exactly how everything works! 👀**
