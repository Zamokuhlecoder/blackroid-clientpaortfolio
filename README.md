# Client Portfolio - Standalone & Independent

This is a **completely independent, production-ready client portal** where your clients can:
- ✅ Sign up and create accounts
- ✅ Sign in securely
- ✅ Track project progress in real-time
- ✅ View project milestones and timelines
- ✅ View deliverables and project notes

**NO external dependencies** - works completely standalone without relying on any external website or service.

## Key Features

### 🔐 Secure Authentication
- User registration with email validation
- Secure sign-in with password hashing
- JWT session management
- Password recovery (coming soon)

### 📊 Project Tracking
- Real-time project status updates
- Progress percentage tracking (0-100%)
- Milestone timeline visualization
- Project notes and updates
- Deliverables management

### 🎯 Client-Focused
- Simple, intuitive interface
- Mobile-responsive design
- Real-time dashboard updates
- Secure data isolation (clients only see their projects)

## Getting Started

### Requirements
- Node.js 20.9+
- npm or yarn
- Neon PostgreSQL account (free tier available)

### Quick Setup

1. **Clone or copy this project**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables in `.env.local`:**
   ```bash
   # Copy the template
   cp .env.example .env.local
   
   # Edit .env.local with your values:
   # - DATABASE_URL: Your Neon PostgreSQL connection string
   # - NEXTAUTH_SECRET: Generated with: openssl rand -hex 32
   # - NEXTAUTH_URL: http://localhost:3000 (for local) or your domain (for production)
   # - NEXT_PUBLIC_SITE_URL: Your website URL
   # - NEXT_PUBLIC_COMPANY_NAME: Your company/brand name
   # - NEXT_PUBLIC_CONTACT_EMAIL: Support email for clients
   ```

4. **Create the database schema:**
   ```bash
   npm run prisma:push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open in browser:**
   - Home: http://localhost:3000
   - Sign Up: http://localhost:3000/auth/signup
   - Sign In: http://localhost:3000/auth/signin
   - Dashboard: http://localhost:3000/dashboard

## Testing Locally

### Create a Test Account
1. Go to http://localhost:3000/auth/signup
2. Enter test email and password
3. Click "Sign Up"
4. You're logged in! Now at dashboard

### Create a Test Project (via API)
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "This is a test project",
    "status": "in-progress",
    "progress": 50,
    "startDate": "2024-01-15T00:00:00Z",
    "targetDate": "2024-03-15T00:00:00Z"
  }'
```

## Available Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Check code quality
npm run typecheck        # Validate TypeScript
npm run prisma:push      # Create database schema
npm run prisma:studio    # Open database GUI viewer
npm run prisma:generate  # Generate Prisma types
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub (new repository, not forked)
2. Import repository in Vercel
3. Add environment variables:
   - `DATABASE_URL` - Neon PostgreSQL connection
   - `NEXTAUTH_SECRET` - Generated secret
   - `NEXTAUTH_URL` - Your Vercel domain
   - `NEXT_PUBLIC_SITE_URL` - Your Vercel domain
   - `NEXT_PUBLIC_COMPANY_NAME` - Your company name
   - `NEXT_PUBLIC_CONTACT_EMAIL` - Support email

4. Deploy
5. Test at your domain

## Configuration

All customization is done via environment variables or code:

### Environment Variables
- `NEXT_PUBLIC_SITE_URL` - Your website URL
- `NEXT_PUBLIC_COMPANY_NAME` - Company/brand name displayed
- `NEXT_PUBLIC_CONTACT_EMAIL` - Client support email
- `NEXT_PUBLIC_PHONE` - Optional contact phone
- `NEXT_PUBLIC_LINKEDIN_URL` - Optional LinkedIn link
- `NEXT_PUBLIC_INSTAGRAM_URL` - Optional Instagram link
- `NEXT_PUBLIC_X_URL` - Optional X/Twitter link
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for sessions
- `NEXTAUTH_URL` - Your app's URL

### Customize UI

Edit these files to customize:
- `src/app/layout.tsx` - Main layout and styling
- `src/app/globals.css` - Colors, fonts, spacing
- `src/app/auth/signup/page.tsx` - Sign up page
- `src/app/auth/signin/page.tsx` - Sign in page
- `src/app/dashboard/page.tsx` - Dashboard layout

## Security

✅ **Built-in Security:**
- Password hashing (bcryptjs)
- JWT session tokens
- SQL injection prevention (Prisma)
- XSS protection (Next.js)
- CSRF protection
- Secure headers
- User data isolation

## API Endpoints

### Authentication (Public)
```
POST   /api/auth/signin             # Sign in
POST   /api/auth/signup             # Create account
POST   /api/auth/signout            # Sign out
GET    /api/auth/session            # Get session
```

### Projects (Requires Authentication)
```
GET    /api/projects                # List projects
POST   /api/projects                # Create project
GET    /api/projects/[id]           # Get project details
PUT    /api/projects/[id]           # Update project
DELETE /api/projects/[id]           # Delete project
```

## Documentation

Detailed guides available:
- [GETTING_STARTED.md](./GETTING_STARTED.md) - Quick start guide
- [REAL_PORTFOLIO_SETUP.md](./REAL_PORTFOLIO_SETUP.md) - Detailed setup with Neon
- [CLIENT_USER_GUIDE.md](./CLIENT_USER_GUIDE.md) - User documentation
- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) - Backend API guide
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Commands and reference
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and fixes
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design and architecture

## Database Schema

Three main tables:

### Users
- `id` - Unique identifier
- `email` - Email (unique, used for sign in)
- `name` - User's name
- `password` - Hashed password
- `createdAt` - Account creation date
- `updatedAt` - Last update

### Portfolio
- `id` - Unique identifier
- `userId` - Link to user
- `title` - Portfolio title
- `description` - Portfolio description
- `createdAt` - Creation date
- `updatedAt` - Last update

### ClientProject
- `id` - Unique identifier
- `userId` - Link to user
- `title` - Project name
- `description` - Project description
- `status` - planning | in-progress | completed
- `progress` - 0-100 percentage
- `startDate` - When work started
- `targetDate` - Expected completion
- `completedDate` - Actual completion
- `notes` - Team notes and updates
- `createdAt` - Creation date
- `updatedAt` - Last update

## Technology Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Authentication:** NextAuth.js v5
- **Database:** PostgreSQL (via Neon)
- **ORM:** Prisma
- **Styling:** Tailwind CSS
- **Validation:** Zod
- **Deployment:** Vercel

## Troubleshooting

### Database Connection Error
- Verify DATABASE_URL is correct
- Check Neon account is active
- Run: `npm run prisma:push` again

### Sign In Fails
- Verify NEXTAUTH_SECRET is set
- Check database is running
- Restart dev server: `npm run dev`

### Type Errors
```bash
npm run prisma:generate
npm run typecheck
```

## Support

For detailed help, see the documentation files included in this project.

## License

This project is provided as-is for client project tracking.

---

**Your independent, production-ready client portal is ready to deploy! 🚀**
