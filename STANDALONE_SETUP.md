# Standalone Client Portal - Independent Setup Guide

## ✅ This Portal is 100% Independent

Your client portfolio is a **completely standalone application**:
- ✅ No external website dependencies
- ✅ Works independently on any domain
- ✅ Login system built-in
- ✅ Database integrated
- ✅ Ready for production

---

## 🚀 Setup Steps (Windows)

### Step 1: Create Neon PostgreSQL Database

1. **Go to https://neon.tech**
2. **Sign up for free account**
3. **Create a new project** (automatically creates a database)
4. **Copy the connection string** - looks like:
   ```
   postgresql://user:password@ep-xyz.neon.tech/database
   ```

### Step 2: Generate NEXTAUTH_SECRET

Open PowerShell and run:
```powershell
openssl rand -hex 32
```

This outputs a random 64-character string. **Copy it!**

### Step 3: Update `.env.local`

Edit `C:\Users\ADMIN\Documents\PROJECT\blackroid-clientpaortfolio\.env.local`:

```env
# Your site configuration (customize as needed)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME=Your Company Name
NEXT_PUBLIC_CONTACT_EMAIL=support@yourcompany.com
NEXT_PUBLIC_PHONE=+1234567890
NEXT_PUBLIC_PHONE_DISPLAY=+1 (234) 567-890

# Optional: Social media links (leave empty to disable)
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/yourcompany
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourcompany
NEXT_PUBLIC_X_URL=https://x.com/yourcompany
NEXT_PUBLIC_WHATSAPP_URL=

# Database - REQUIRED (from Neon)
DATABASE_URL=postgresql://user:password@ep-xyz.neon.tech/dbname

# Authentication - REQUIRED
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=paste-your-64-character-hex-string-here
```

### Step 4: Create Database Schema

```powershell
cd C:\Users\ADMIN\Documents\PROJECT\blackroid-clientpaortfolio
npm run prisma:push
```

You'll be prompted - type **y** to create the database schema.

### Step 5: Start the Development Server

```powershell
npm run dev
```

Watch for the message: `> Local: http://localhost:3000`

---

## 🧪 Test the Login System

### Test 1: Sign Up a New Account

1. **Open browser:** http://localhost:3000/auth/signup
2. **Enter test data:**
   - Full Name: `John Client`
   - Email: `john@test.com`
   - Password: `TestPassword123`
3. **Click "Sign Up"**
4. **You should be logged in and redirected to dashboard** ✅

### Test 2: Verify Session Persistence

1. **Refresh the page** (Ctrl+R)
2. **You should stay logged in** (not redirected to login) ✅
3. **Dashboard should load** ✅

### Test 3: Sign Out

1. **Click "Sign Out" button** in top right
2. **Should redirect to home page** ✅
3. **Click "Sign In"** - you should see the sign-in page ✅

### Test 4: Sign In with Existing Account

1. **Go to:** http://localhost:3000/auth/signin
2. **Enter:**
   - Email: `john@test.com`
   - Password: `TestPassword123`
3. **Click "Sign In"**
4. **Should be logged in and at dashboard** ✅

### Test 5: Create a Project (via API)

```powershell
# In PowerShell, run:
$body = @{
    title = "Test Website Project"
    description = "Complete website redesign and rebuild"
    status = "in-progress"
    progress = 45
    startDate = "2024-01-15T00:00:00Z"
    targetDate = "2024-03-15T00:00:00Z"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/projects" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

### Test 6: View Project on Dashboard

1. **Go to dashboard:** http://localhost:3000/dashboard
2. **Should see your new project card** ✅
3. **Shows title, description, progress, status** ✅

---

## 📋 Verify Independence

### ✅ No External Dependencies

Check that the system works without any external website:

1. **Open DevTools (F12) → Network tab**
2. **Sign up and log in**
3. **Look at network requests**
4. You should **NOT see any requests to:**
   - blackroid.com
   - Any external authentication service
   - Any external dashboard

4. **All requests should be to:**
   - `localhost:3000` (or your domain)
   - API endpoints on the same domain

### ✅ Completely Standalone

The portal:
- Authenticates users locally (NextAuth.js)
- Stores data in your own database (Neon)
- Has no dependencies on external services
- Works the same on any domain

---

## 🌐 Production Deployment

### Deploy to Vercel

1. **Create GitHub repository** (if not already done):
   ```powershell
   cd C:\Users\ADMIN\Documents\PROJECT\blackroid-clientpaortfolio
   git init
   git add .
   git commit -m "Initial commit: Standalone client portal"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

2. **Go to https://vercel.com**
3. **Import the GitHub repository**
4. **Add Environment Variables:**
   - `DATABASE_URL` - Your Neon connection string
   - `NEXTAUTH_SECRET` - Your generated secret
   - `NEXTAUTH_URL` - Your Vercel domain (e.g., https://myportal.vercel.app)
   - `NEXT_PUBLIC_SITE_URL` - Same as NEXTAUTH_URL
   - `NEXT_PUBLIC_COMPANY_NAME` - Your company name
   - `NEXT_PUBLIC_CONTACT_EMAIL` - Support email

5. **Click Deploy** 🚀

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Never commit `.env.local` to git (already in `.gitignore`)
- [ ] Generate a strong NEXTAUTH_SECRET (we did this)
- [ ] Use HTTPS in production (Vercel does this automatically)
- [ ] Set up custom domain (optional but recommended)
- [ ] Test sign up/sign in workflow on production URL
- [ ] Test project creation and viewing
- [ ] Check that clients can ONLY see their own projects
- [ ] Monitor for errors in Vercel dashboard

---

## 📱 URLs for Your Clients

### Local Development
```
Home Page:        http://localhost:3000
Sign Up:          http://localhost:3000/auth/signup
Sign In:          http://localhost:3000/auth/signin
Dashboard:        http://localhost:3000/dashboard
```

### Production (after Vercel deployment)
```
Home Page:        https://yourdomain.com
Sign Up:          https://yourdomain.com/auth/signup
Sign In:          https://yourdomain.com/auth/signin
Dashboard:        https://yourdomain.com/dashboard
```

Share the **Sign Up** or **Sign In** link with clients. They create their own accounts!

---

## 🛠️ Customize for Your Brand

### Update Company Info

Edit `.env.local`:
```env
NEXT_PUBLIC_COMPANY_NAME=Your Company
NEXT_PUBLIC_CONTACT_EMAIL=support@yourcompany.com
NEXT_PUBLIC_PHONE=+1234567890
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/yours
```

### Update Colors & Styling

Edit `src/app/globals.css`:
- Change color variables
- Update fonts
- Adjust spacing

### Update Home Page

Edit `src/app/page.tsx`:
- Add welcome message
- Add company description
- Add features/benefits

---

## 📊 Database Access

### View Database (GUI)

```powershell
npm run prisma:studio
```

Opens: http://localhost:5555

You can:
- View all users
- View all projects
- Edit data directly
- Create new records

### SQL Query (Neon Console)

1. Go to https://neon.tech
2. Open your project
3. Go to "SQL Editor"
4. Run queries like:
   ```sql
   SELECT * FROM "User";
   SELECT * FROM "ClientProject" WHERE "userId" = 'some-id';
   ```

---

## 🐛 Troubleshooting

### "Database connection error"
```powershell
# Check your DATABASE_URL
# Make sure it's correct in .env.local
# Try again:
npm run prisma:push
npm run dev
```

### "Sign up fails" or "Sign in fails"
```powershell
# Check your NEXTAUTH_SECRET is set
# Restart the server:
npm run dev

# Or restart from scratch:
npm install
npm run prisma:push
npm run dev
```

### "Dashboard is blank" (no projects)
1. Check you're logged in
2. Create a project using the API (see Test 5 above)
3. Projects should appear on dashboard

### "Session expires immediately"
```powershell
# Check NEXTAUTH_URL matches your site URL
# Check NEXTAUTH_SECRET is correct
# Restart server
```

---

## ✅ Success Indicators

Your portal is working correctly when:

✅ **Sign Up Works**
- Users can create accounts with email/password
- Automatically logged in after sign up
- Redirected to dashboard

✅ **Sign In Works**
- Users can log in with email/password
- Session persists on page refresh
- Redirected to dashboard

✅ **Dashboard Works**
- Shows list of projects
- Each project shows title, description, progress, status
- Real data from database (not sample data)

✅ **No External Dependencies**
- Works without any external website
- No redirects to blackroid.com or any other site
- Completely self-contained

✅ **Independent Deployment**
- Can be deployed on any domain
- Works on localhost, Vercel, or any host
- No configuration points to external services

---

## 🎉 You're Done!

Your standalone client portal is ready!

### Next Steps:
1. Test the login workflow locally
2. Create a Vercel account
3. Deploy to production
4. Share the sign-up link with clients
5. Create projects for clients
6. Watch them track progress!

### Support:
- See [README.md](./README.md) for overview
- See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for commands
- See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues

**Your independent, production-ready client portal is live! 🚀**
