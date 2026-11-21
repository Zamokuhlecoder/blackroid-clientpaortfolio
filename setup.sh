#!/bin/bash
# Quick setup script for real portfolio

echo "🚀 Setting up Real Portfolio..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found!"
    echo "Please create .env.local with your Neon database URL:"
    echo ""
    echo "DATABASE_URL=\"postgresql://...your-neon-url...\""
    echo "NEXTAUTH_SECRET=\"$(openssl rand -hex 32)\""
    echo "NEXTAUTH_URL=\"http://localhost:3000\""
    echo ""
    exit 1
fi

echo "✅ Found .env.local"
echo ""

# Generate Prisma client
echo "📦 Generating Prisma client..."
npm run prisma:generate

echo ""
echo "🔄 Pushing schema to database..."
npm run prisma:push

echo ""
echo "✨ Setup complete!"
echo ""
echo "Start development server with:"
echo "  npm run dev"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
