#!/bin/bash

# Setup Git Hooks for Vibe Starter Project
# This script sets up pre-commit hooks to ensure tests pass before commits

echo "🔧 Setting up Git hooks for Vibe Starter..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Please run 'git init' first."
    exit 1
fi

# Create pre-commit hook
echo "📝 Creating pre-commit hook..."
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
echo "🧪 Running pre-commit checks..."

# Run tests
echo "Running tests..."
npm run test
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Commit aborted."
  echo "💡 Fix failing tests before committing."
  exit 1
fi

# Run linting
echo "Running linter..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting failed. Commit aborted."
  echo "💡 Fix linting errors before committing."
  exit 1
fi

# Check build
echo "Checking build..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed. Commit aborted."
  echo "💡 Fix build errors before committing."
  exit 1
fi

echo "✅ All checks passed. Proceeding with commit."
EOF

# Make the hook executable
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks setup complete!"
echo ""
echo "📋 What this does:"
echo "   • Runs tests before every commit"
echo "   • Runs linting before every commit"
echo "   • Checks build before every commit"
echo "   • Prevents commits if any check fails"
echo ""
echo "🚀 You're all set! Now all commits will be automatically checked."
echo "💡 To manually run these checks: npm run pre-commit"
