@echo off
REM Quick setup script for real portfolio (Windows)

echo 🚀 Setting up Real Portfolio...
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo ⚠️  .env.local not found!
    echo Please create .env.local with your Neon database URL:
    echo.
    echo DATABASE_URL="postgresql://...your-neon-url..."
    echo NEXTAUTH_SECRET="[generate with: openssl rand -hex 32]"
    echo NEXTAUTH_URL="http://localhost:3000"
    echo.
    exit /b 1
)

echo ✅ Found .env.local
echo.

REM Generate Prisma client
echo 📦 Generating Prisma client...
call npm run prisma:generate

echo.
echo 🔄 Pushing schema to database...
call npm run prisma:push

echo.
echo ✨ Setup complete!
echo.
echo Start development server with:
echo   npm run dev
echo.
echo Then visit: http://localhost:3000
echo.
pause
