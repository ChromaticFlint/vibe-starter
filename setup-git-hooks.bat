@echo off
REM Setup Git Hooks for Vibe Starter Project (Windows)
REM This script sets up pre-commit hooks to ensure tests pass before commits

echo 🔧 Setting up Git hooks for Vibe Starter...

REM Check if we're in a git repository
if not exist ".git" (
    echo ❌ Error: Not in a git repository. Please run 'git init' first.
    exit /b 1
)

REM Create pre-commit hook
echo 📝 Creating pre-commit hook...
(
echo #!/bin/sh
echo echo "🧪 Running pre-commit checks..."
echo.
echo # Run tests
echo echo "Running tests..."
echo npm run test
echo if [ $? -ne 0 ]; then
echo   echo "❌ Tests failed. Commit aborted."
echo   echo "💡 Fix failing tests before committing."
echo   exit 1
echo fi
echo.
echo # Run linting
echo echo "Running linter..."
echo npm run lint
echo if [ $? -ne 0 ]; then
echo   echo "❌ Linting failed. Commit aborted."
echo   echo "💡 Fix linting errors before committing."
echo   exit 1
echo fi
echo.
echo # Check build
echo echo "Checking build..."
echo npm run build
echo if [ $? -ne 0 ]; then
echo   echo "❌ Build failed. Commit aborted."
echo   echo "💡 Fix build errors before committing."
echo   exit 1
echo fi
echo.
echo echo "✅ All checks passed. Proceeding with commit."
) > .git\hooks\pre-commit

echo ✅ Git hooks setup complete!
echo.
echo 📋 What this does:
echo    • Runs tests before every commit
echo    • Runs linting before every commit
echo    • Checks build before every commit
echo    • Prevents commits if any check fails
echo.
echo 🚀 You're all set! Now all commits will be automatically checked.
echo 💡 To manually run these checks: npm run pre-commit
pause
