# Real Portfolio with User Authentication 🚀

This is now a **real, production-ready portfolio system** where clients can:
- 👤 **Sign up and log in** with email/password
- 📊 **View their project progress** in a personal dashboard
- 📈 **Track project status, timeline, and completion** in real-time
- 🎨 **Showcase completed projects** in their portfolio

## Tech Stack

- **Frontend**: Next.js 16 + React 19 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Server Actions
- **Database**: PostgreSQL (Neon)
- **Authentication**: NextAuth.js v5
- **Hosting**: Vercel (ready to deploy)

## 📋 Setup Instructions

### 1. Set Up Neon PostgreSQL Database

1. Go to [Neon.tech](https://neon.tech/)
2. Sign up and create a new project
3. Copy your connection string (looks like: `postgresql://user:password@hostname/database`)
4. Add to `.env.local`:

```bash
DATABASE_URL="postgresql://[your-connection-string]"
```

### 2. Install Dependencies

```bash
npm install
# npm install is already running...
```

### 3. Set Up Authentication Secrets

```bash
# Generate NextAuth secret (run in terminal)
openssl rand -hex 32
```

Add to `.env.local`:

```bash
NEXTAUTH_SECRET="[paste-the-generated-secret]"
NEXTAUTH_URL="http://localhost:3000"  # Change to your domain when deploying
```

### 4. Initialize Prisma & Database

```bash
# Generate Prisma client
npm run prisma generate

# Push schema to database
npm run prisma db push

# (Optional) Open Prisma Studio to view data
npm run prisma studio
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 🔐 User Features

### Public Pages
- `/` - Home page
- `/auth/signup` - User registration
- `/auth/signin` - User login

### Authenticated Pages (Protected)
- `/dashboard` - Client project dashboard
- `/dashboard/projects/[id]` - Detailed project view

## 📊 Database Schema

### Users
- Email & password authentication
- Profile information (name, bio, image)

### Portfolio
- One portfolio per user
- Customizable title, description, theme

### ClientProject
- Project title, description, status
- Progress tracking (0-100%)
- Timeline (start date, target date, completion date)
- Deliverables and project notes
- Multiple images support

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signup` - Create account
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session

### Projects
- `GET /api/projects` - List user's projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

## 🚀 Deployment to Vercel

### Quick Deployment

1. Push your code to GitHub
2. Go to [Vercel.com](https://vercel.com/)
3. Import your GitHub repository
4. Add environment variables:
   - `DATABASE_URL` - Your Neon connection string
   - `NEXTAUTH_SECRET` - Your secret key
   - `NEXTAUTH_URL` - Your Vercel domain (e.g., `https://myportfolio.vercel.app`)

5. Deploy! ✨

### Post-Deployment
```bash
# Run migrations on production database
npm run prisma db push
```

## 🔄 Workflow for Your Team

### For Agency (Backend)
1. When you create a project for a client:
   ```bash
   curl -X POST http://localhost:3000/api/projects \
     -H "Authorization: Bearer [token]" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Website Redesign",
       "description": "Complete redesign of company website",
       "startDate": "2024-01-15",
       "targetDate": "2024-03-15"
     }'
   ```

2. Update project progress:
   ```bash
   curl -X PUT http://localhost:3000/api/projects/[id] \
     -H "Authorization: Bearer [token]" \
     -H "Content-Type: application/json" \
     -d '{
       "progress": 50,
       "status": "in-progress",
       "notes": "Frontend completed, working on backend"
     }'
   ```

### For Clients
1. Sign up with their email
2. Log in to view dashboard
3. Click on a project to see detailed progress
4. View timeline, deliverables, and updates

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ SQL injection protection via Prisma
- ✅ CSRF protection with NextAuth
- ✅ Secure session management
- ✅ User data isolation (users only see their own projects)

## 📝 Next Steps

### For Production:
1. [ ] Set up Neon database
2. [ ] Generate and add NEXTAUTH_SECRET
3. [ ] Run `npm run prisma db push`
4. [ ] Test auth locally (`npm run dev`)
5. [ ] Deploy to Vercel
6. [ ] Update NEXTAUTH_URL in Vercel env vars
7. [ ] Run migrations on production

### Optional Enhancements:
- [ ] Email notifications when projects update
- [ ] Admin dashboard to manage all projects
- [ ] File upload for project deliverables
- [ ] Project milestones and sub-tasks
- [ ] Client feedback/comments section
- [ ] Project timeline Gantt charts
- [ ] Real-time notifications
- [ ] Dark/light theme toggle

## 📞 Support

For questions about:
- **Neon PostgreSQL**: https://docs.neon.tech/
- **NextAuth.js**: https://next-auth.js.org/
- **Prisma**: https://www.prisma.io/docs/
- **Next.js**: https://nextjs.org/docs

---

**Your portfolio is now REAL - not demo! 🎉**
