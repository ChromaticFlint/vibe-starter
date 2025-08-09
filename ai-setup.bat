@echo off
REM AI Agent Setup Script for New Projects (Windows)
REM Usage: ai-setup.bat [project-name]

setlocal enabledelayedexpansion

set PROJECT_NAME=%1
set GITHUB_URL=https://github.com/ChromaticFlint/vibe-starter.git

echo 🤖 AI Agent Setup for Vibe-Starter Template
echo ==================================================

REM Check if project name provided
if "%PROJECT_NAME%"=="" (
    echo ❌ Error: Project name required
    echo Usage: ai-setup.bat [project-name]
    echo Example: ai-setup.bat my-awesome-app
    exit /b 1
)

echo 📦 Setting up: %PROJECT_NAME%

REM Check if directory already exists
if exist "%PROJECT_NAME%" (
    echo ⚠️  Directory %PROJECT_NAME% already exists
    set /p "choice=Do you want to remove it and continue? (y/N): "
    if /i "!choice!"=="y" (
        rmdir /s /q "%PROJECT_NAME%"
        echo ✅ Removed existing directory
    ) else (
        echo ❌ Setup cancelled
        exit /b 1
    )
)

REM Clone the repository
echo 📥 Cloning vibe-starter template...
git clone %GITHUB_URL% %PROJECT_NAME%

if errorlevel 1 (
    echo ❌ Failed to clone repository
    exit /b 1
)

cd %PROJECT_NAME%

REM Clean git history
echo 🧹 Cleaning git history...
rmdir /s /q .git
git init
git add .
git commit -m "feat: initial project setup from vibe-starter template"

REM Update project identity
echo 📝 Updating project identity...
powershell -Command "(Get-Content package.json) -replace 'vibe-starter', '%PROJECT_NAME%' | Set-Content package.json"
powershell -Command "(Get-Content README.md) -replace 'Vibe Starter', '%PROJECT_NAME%' | Set-Content README.md"

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

REM Run health check
echo 🏥 Running health check...
npm run pre-commit

if errorlevel 1 (
    echo ❌ Health check failed
    exit /b 1
)

echo ✅ Setup complete!
echo.
echo 📋 Next Steps for AI Agents:
echo 1. Generate project config: npm run generate
echo 2. Load AI context: npm run ai:context
echo 3. Set up git hooks: setup-git-hooks.bat
echo 4. Start development: npm run dev
echo.
echo 🤖 AI agents can now understand project context instantly!
