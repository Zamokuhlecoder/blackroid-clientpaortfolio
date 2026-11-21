# 🧪 Test Login System Independently

Your client portal is **100% independent**. This guide shows you how to test it works completely standalone.

---

## ✅ What "Independent" Means

Your portal:
- ✅ Has **its own login system** (NextAuth.js v5)
- ✅ Uses **its own database** (Neon PostgreSQL)
- ✅ Works on **its own domain**
- ✅ Does **NOT depend** on blackroid.com or any external service
- ✅ Can run **completely offline** (except database)

---

## 🚀 Quick Setup to Test Login

### Prerequisites
- Node.js 20.9+ installed
- npm installed
- Git installed

### Step 1: Create Neon PostgreSQL Account (Free)

1. Go to https://neon.tech
2. Click "Sign Up"
3. Create account (use your email)
4. Create a new project
5. Copy the connection string (looks like: `postgresql://user:pwd@ep-xyz.neon.tech/db`)

### Step 2: Configure Environment

Open `.env.local` and update:

```env
# Your company info
NEXT_PUBLIC_COMPANY_NAME=My Test Company
NEXT_PUBLIC_CONTACT_EMAIL=test@example.com

# Database - paste from Neon
DATABASE_URL=postgresql://user:password@ep-xyz.neon.tech/dbname

# Generate secret
NEXTAUTH_SECRET=generate-with-openssl-rand-hex-32

# Local testing
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

To generate NEXTAUTH_SECRET:
```powershell
openssl rand -hex 32
```
Copy the output and paste into `.env.local`

### Step 3: Install & Create Database

```powershell
cd C:\Users\ADMIN\Documents\PROJECT\blackroid-clientpaortfolio

# Install dependencies
npm install

# Create database schema
npm run prisma:push
```

You'll be prompted to create the database - type **y**

### Step 4: Start Server

```powershell
npm run dev
```

Wait for: `> Local: http://localhost:3000`

---

## 🧪 Test 1: Sign Up Page Works

### Test Independent Sign Up

1. **Open browser:** http://localhost:3000/auth/signup
2. **Look at the page:**
   - Title should be "Sign Up" ✅
   - Has email field ✅
   - Has password field ✅
   - Has "Sign Up" button ✅
   - Shows link to "Sign In" page ✅

3. **Fill out form:**
   ```
   Full Name: John Doe
   Email: john@test.com
   Password: TestPassword123
   ```

4. **Click "Sign Up"**

5. **Expected result:**
   - ✅ No errors
   - ✅ Redirected to dashboard
   - ✅ Logged in automatically
   - ✅ NOT redirected to blackroid.com ❌
   - ✅ NOT redirected to any external site ❌

---

## 🧪 Test 2: Session Persists

### Test Session Continuity

1. **Still on dashboard after sign up**
2. **Press Ctrl+R** to refresh
3. **Expected result:**
   - ✅ Still logged in
   - ✅ Dashboard loads
   - ✅ NOT redirected to login ❌
   - ✅ Session is persistent ✅

---

## 🧪 Test 3: Sign Out

### Test Sign Out Function

1. **On dashboard, click "Sign Out"** (top right)
2. **Expected result:**
   - ✅ Redirected to home page
   - ✅ NOT redirected to blackroid.com ❌
   - ✅ NOT redirected anywhere external ❌
   - ✅ Session cleared ✅

---

## 🧪 Test 4: Sign In Page Works

### Test Independent Sign In

1. **Click "Sign In"** from home page
2. **Go to:** http://localhost:3000/auth/signin
3. **Page should show:**
   - Title: "Sign In" ✅
   - Email field ✅
   - Password field ✅
   - "Sign In" button ✅
   - Link to "Sign Up" page ✅

4. **Enter credentials:**
   ```
   Email: john@test.com
   Password: TestPassword123
   ```

5. **Click "Sign In"**

6. **Expected result:**
   - ✅ Logged in
   - ✅ Redirected to dashboard
   - ✅ NOT redirected to blackroid.com ❌
   - ✅ NOT redirected to any external site ❌

---

## 🧪 Test 5: Dashboard Only Shows Own Projects

### Test Data Isolation

1. **Logged in as john@test.com**
2. **Dashboard URL:** http://localhost:3000/dashboard
3. **Currently shows:** Empty (no projects yet)

4. **Create a project** (we'll do this via API in next test)

5. **Expected result:**
   - ✅ Only john@test.com's projects shown
   - ✅ NOT anyone else's projects ❌
   - ✅ Data is isolated ✅

---

## 🧪 Test 6: Create Project via API

### Add a Test Project

**Option A: Using PowerShell**

```powershell
# First, make sure you're logged in by visiting dashboard

$body = @{
    title = "Website Redesign"
    description = "Complete website redesign and rebuild"
    status = "in-progress"
    progress = 45
    startDate = "2024-01-15T00:00:00Z"
    targetDate = "2024-03-15T00:00:00Z"
    notes = "Phase 1 of project is complete"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/projects" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body `
  -Credentials (Get-Credential) `  # Use john@test.com / TestPassword123
  -SessionVariable "session"
```

**Option B: Using Curl (Git Bash)**

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Website Redesign",
    "description": "Complete website redesign and rebuild",
    "status": "in-progress",
    "progress": 45,
    "startDate": "2024-01-15T00:00:00Z",
    "targetDate": "2024-03-15T00:00:00Z",
    "notes": "Phase 1 of project is complete"
  }'
```

**Expected response:**
```json
{
  "id": "some-id",
  "title": "Website Redesign",
  "status": "in-progress",
  "progress": 45,
  "createdAt": "2024-01-15T...",
  "updatedAt": "2024-01-15T..."
}
```

---

## 🧪 Test 7: See Project on Dashboard

### View Created Project

1. **Go to dashboard:** http://localhost:3000/dashboard
2. **Expected result:**
   - ✅ Project card appears
   - ✅ Shows title: "Website Redesign"
   - ✅ Shows description
   - ✅ Shows progress bar: 45%
   - ✅ Shows status: "In Progress"
   - ✅ Shows dates
   - ✅ NOT anyone else's projects ❌

---

## 🧪 Test 8: Check Network Requests

### Verify No External Dependencies

1. **Open DevTools:** Press F12
2. **Go to "Network" tab**
3. **Refresh page** (Ctrl+R)
4. **Look at all requests**

**Expected:**
- ✅ All requests to `localhost:3000`
- ✅ API calls to `/api/auth/...`
- ✅ API calls to `/api/projects`

**NOT expected:**
- ❌ No requests to `blackroid.com`
- ❌ No requests to `auth0.com`
- ❌ No requests to any external auth service
- ❌ No requests to any external API

---

## 🧪 Test 9: Test Wrong Credentials

### Test Error Handling

1. **Go to Sign In:** http://localhost:3000/auth/signin
2. **Enter wrong email:**
   ```
   Email: wrong@test.com
   Password: TestPassword123
   ```
3. **Click "Sign In"**

**Expected result:**
- ✅ Error message shows: "Invalid credentials"
- ✅ NOT logged in
- ✅ Stays on sign-in page
- ✅ Error handled gracefully

---

## 🧪 Test 10: Test Sign Up Validation

### Test Validation

1. **Go to Sign Up:** http://localhost:3000/auth/signup
2. **Try submitting empty form**

**Expected result:**
- ✅ Browser validation shows required fields
- ✅ Cannot submit

3. **Try password < 6 characters**

**Expected result:**
- ✅ Error message
- ✅ Cannot sign up

---

## ✅ Independence Verification Checklist

After all tests, verify complete independence:

**Authentication:**
- [ ] Sign up works independently
- [ ] Sign in works independently
- [ ] Session persists independently
- [ ] Sign out works independently
- [ ] No external auth services used

**Database:**
- [ ] Projects created and stored
- [ ] Projects retrieved from database
- [ ] Data persists across sessions
- [ ] No external database services visible

**Network:**
- [ ] All API calls to localhost:3000
- [ ] No requests to blackroid.com
- [ ] No requests to external services
- [ ] No external redirects

**Data:**
- [ ] Only john@test.com sees john's projects
- [ ] Projects are user-isolated
- [ ] No shared data visible

**Configuration:**
- [ ] All env vars local
- [ ] No external service dependencies
- [ ] Can run offline (except database)
- [ ] Completely self-contained

---

## 🚀 Test With Multiple Users

### Create Second Account

1. **Sign out:** Click Sign Out
2. **Go to Sign Up:** http://localhost:3000/auth/signup
3. **Create new account:**
   ```
   Full Name: Jane Doe
   Email: jane@test.com
   Password: TestPassword123
   ```

4. **Jane's dashboard should be empty** (john's project not visible)
5. **Create project for jane:**
   ```
   Title: Mobile App
   Description: iOS and Android app
   Status: planning
   Progress: 25
   ```

6. **Expected result:**
   - ✅ jane@test.com only sees jane's project
   - ✅ john's project NOT visible to jane
   - ✅ Complete data isolation
   - ✅ System works for multiple users

---

## 🐛 If Tests Fail

### Sign Up Fails
```powershell
# Check environment
npm run prisma:studio

# Verify database connection
# Try again
npm run dev

# Check .env.local - DATABASE_URL must be correct
```

### Login Page Doesn't Load
```powershell
# Check server is running
# Check terminal for errors
# Try:
npm install
npm run prisma:generate
npm run dev
```

### Cannot Create Projects
```powershell
# Check you're logged in
# Try creating via API (see Test 6)
# Check database schema: npm run prisma:studio
```

### External Redirect Happens
1. Check [src/lib/site.ts](./src/lib/site.ts)
2. Should have no hardcoded blackroid.com
3. Navigation should point to local pages
4. Check [src/app/layout.tsx](./src/app/layout.tsx) metadata

---

## 📊 Database Inspection

### View All Users
```powershell
npm run prisma:studio
```

Then go to: http://localhost:5555

You can:
- View all User records
- View all ClientProject records
- Edit data directly
- Delete records

---

## 🎉 Success!

If all 10 tests pass, your portal is:
- ✅ **100% Independent**
- ✅ **Production Ready**
- ✅ **Secure**
- ✅ **Scalable**
- ✅ **Ready to Deploy**

---

## Next Steps

1. ✅ Tests passed locally?
2. 📝 Update `.env.local` with real company info
3. 🚀 Deploy to Vercel
4. 👥 Create accounts for real clients
5. 📊 Create projects for clients
6. 🎉 Clients track their own projects!

**Your independent client portal is working! 🚀**
