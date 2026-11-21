# Blackroid Team - Project Management Guide

This guide explains how to manage client projects from your end.

## 📋 Backend Project Management

### Using the API

You can create, update, and manage projects via API:

#### Create a Project

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Website Redesign",
    "description": "Complete redesign of company website with new features",
    "status": "planning",
    "progress": 0,
    "startDate": "2024-01-15T00:00:00Z",
    "targetDate": "2024-03-15T00:00:00Z"
  }'
```

#### Update Project Progress

```bash
curl -X PUT http://localhost:3000/api/projects/[PROJECT_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "progress": 50,
    "status": "in-progress",
    "notes": "Frontend design completed, backend development started"
  }'
```

#### Get All Client Projects

```bash
curl -X GET http://localhost:3000/api/projects
```

#### Get Specific Project

```bash
curl -X GET http://localhost:3000/api/projects/[PROJECT_ID]
```

#### Delete a Project

```bash
curl -X DELETE http://localhost:3000/api/projects/[PROJECT_ID]
```

## 🔄 Project Workflow

### Step 1: Create Project (Kickoff)

When a client signs the contract:

1. Create user account for the client (they sign up themselves)
2. Create a project via API
3. Set status to "planning"
4. Set target completion date
5. Client can now see the project in their dashboard

### Step 2: Update Progress (Regularly)

As your team works:

1. Update the progress percentage (0-100%)
2. Change status to "in-progress"
3. Add notes about milestones and updates
4. Client sees updates immediately in their dashboard

### Step 3: Delivery (Completion)

When project is complete:

1. Set progress to 100%
2. Set status to "completed"
3. Set completedDate
4. Add final notes and deliverables
5. Client can review final project

## 📊 Project Fields

### Title (Required)
- Project name visible to client
- Example: "Website Redesign", "Mobile App Development"

### Description (Optional)
- Detailed explanation of the project
- Example: "Complete redesign with new branding and features"

### Status (Required)
Choose one:
- `planning` - Initial phase, planning and setup
- `in-progress` - Active work happening
- `completed` - Project is finished

### Progress (0-100)
- Percentage of project completion
- Updated as work progresses
- Visible as progress bar on client dashboard

### Dates
- **startDate**: When work began
- **targetDate**: Expected completion date
- **completedDate**: Actual completion date (set when status = "completed")

### Notes (Optional)
- Team communication with client
- Milestone updates
- Technical notes
- Example: "Phase 1 complete - frontend design finalized"

## 🗂️ Database Schema

### Users Table
```
- id: Unique identifier
- email: User's email (unique)
- name: User's full name
- password: Hashed password
- portfolio: Link to their portfolio
- projects: Link to their projects
```

### Portfolio Table
```
- id: Unique identifier
- userId: Link to user
- title: Portfolio title
- description: Portfolio description
- theme: Theme preference (dark/light)
- projects: Link to projects
```

### ClientProject Table
```
- id: Unique identifier
- portfolioId: Link to portfolio
- userId: Link to user
- title: Project title
- description: Project description
- status: planning | in-progress | completed
- progress: 0-100 percentage
- startDate: Work start date
- targetDate: Expected completion
- completedDate: Actual completion
- images: Uploaded images array
- deliverables: Deliverables array
- notes: Team notes
- createdAt: When project was created
- updatedAt: Last update time
```

## 🔐 Authentication

### Admin Operations

To manage projects, you need:
1. User account with the system
2. Valid session/authentication

### Client Operations

Clients can:
- ✅ View their own projects
- ✅ Track progress
- ❌ Cannot modify projects
- ❌ Cannot see other clients' projects

## 📱 Client-Facing URL Structure

Share these URLs with clients:

```
Sign Up:        https://yourdomain.com/auth/signup
Sign In:        https://yourdomain.com/auth/signin
Dashboard:      https://yourdomain.com/dashboard
Project View:   https://yourdomain.com/dashboard/projects/[ID]
```

## 🚀 Database Commands

### Generate Types

```bash
npm run prisma:generate
```

### Create Database Schema

```bash
npm run prisma:push
```

### Run Migrations

```bash
npm run prisma:migrate
```

### View Database (GUI)

```bash
npm run prisma:studio
```

This opens a web interface to browse and edit database directly.

## 📝 Best Practices

1. **Clear Descriptions** - Write clear project descriptions for clients
2. **Regular Updates** - Update progress at least weekly
3. **Target Dates** - Always set realistic target completion dates
4. **Milestone Notes** - Add notes when major milestones are reached
5. **Final Delivery** - Mark complete only when truly finished and delivered
6. **Communication** - Use notes field for client communication

## 🔧 Troubleshooting

### Project Not Appearing for Client

- Verify project is linked to correct userId
- Check client is logged in with correct account
- Confirm project status and dates are set

### Cannot Create Project

- Ensure client account exists
- Verify portfolio was created for user
- Check database connection

### Database Connection Issues

- Verify DATABASE_URL in .env.local
- Check Neon connection is active
- Restart development server

## 📞 Support

For technical issues:
1. Check Prisma Studio to verify data
2. Review API response errors
3. Check application logs
4. Verify environment variables

---

**Happy managing! Keep clients informed and projects on track! 🎯**
