#!/bin/bash
# AI Agent Setup Script for New Projects
# Usage: ./ai-setup.sh [project-name]

PROJECT_NAME=$1
GITHUB_URL="https://github.com/ChromaticFlint/vibe-starter.git"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🤖 AI Agent Setup for Vibe-Starter Template${NC}"
echo "=================================================="

# Check if project name provided
if [ -z "$PROJECT_NAME" ]; then
  echo -e "${RED}❌ Error: Project name required${NC}"
  echo "Usage: ./ai-setup.sh [project-name]"
  echo "Example: ./ai-setup.sh my-awesome-app"
  exit 1
fi

echo -e "${BLUE}📦 Setting up: ${PROJECT_NAME}${NC}"

# Check if directory already exists
if [ -d "$PROJECT_NAME" ]; then
  echo -e "${YELLOW}⚠️  Directory $PROJECT_NAME already exists${NC}"
  read -p "Do you want to remove it and continue? (y/N): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf "$PROJECT_NAME"
    echo -e "${GREEN}✅ Removed existing directory${NC}"
  else
    echo -e "${RED}❌ Setup cancelled${NC}"
    exit 1
  fi
fi

# Clone the repository
echo -e "${BLUE}📥 Cloning vibe-starter template...${NC}"
git clone $GITHUB_URL $PROJECT_NAME

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Failed to clone repository${NC}"
  exit 1
fi

cd $PROJECT_NAME

# Clean git history
echo -e "${BLUE}🧹 Cleaning git history...${NC}"
rm -rf .git
git init
git add .
git commit -m "feat: initial project setup from vibe-starter template"

# Update project identity
echo -e "${BLUE}📝 Updating project identity...${NC}"
# Update package.json
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  sed -i '' "s/vibe-starter/$PROJECT_NAME/g" package.json
  sed -i '' "s/Vibe Starter/$PROJECT_NAME/g" README.md
else
  # Linux
  sed -i "s/vibe-starter/$PROJECT_NAME/g" package.json
  sed -i "s/Vibe Starter/$PROJECT_NAME/g" README.md
fi

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Failed to install dependencies${NC}"
  exit 1
fi

# Run health check
echo -e "${BLUE}🏥 Running health check...${NC}"
npm run pre-commit

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Health check failed${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps for AI Agents:${NC}"
echo "1. Generate project config: ${BLUE}npm run generate${NC}"
echo "2. Load AI context: ${BLUE}npm run ai:context${NC}"
echo "3. Set up git hooks: ${BLUE}./setup-git-hooks.sh${NC}"
echo "4. Start development: ${BLUE}npm run dev${NC}"
echo ""
echo -e "${GREEN}🤖 AI agents can now understand project context instantly!${NC}"
