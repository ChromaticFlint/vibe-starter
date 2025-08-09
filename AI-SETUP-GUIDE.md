# AI Agent Setup Guide for New Projects

## 🤖 Optimized Setup Workflow for AI Agents

When cloning vibe-starter for a new project, follow this checklist to ensure proper setup and context loading.

## 📋 AI Agent Setup Checklist

### Phase 1: Repository Setup (< 30 seconds)

#### ✅ **Step 1: Clone and Rename**
```bash
# Clone the template
git clone https://github.com/ChromaticFlint/vibe-starter.git [NEW_PROJECT_NAME]
cd [NEW_PROJECT_NAME]

# Remove existing git history and start fresh
rm -rf .git
git init
git add .
git commit -m "feat: initial project setup from vibe-starter template"
```

#### ✅ **Step 2: Update Project Identity**
```bash
# Update package.json name
sed -i 's/"name": "vibe-starter"/"name": "[NEW_PROJECT_NAME]"/g' package.json

# Update README.md title
sed -i 's/# Vibe Starter/# [NEW_PROJECT_NAME]/g' README.md
```

#### ✅ **Step 3: Install Dependencies**
```bash
npm install
```

### Phase 2: Project Configuration (< 60 seconds)

#### ✅ **Step 4: Generate Project Config**

**Option A: Quick Setup (Recommended for fast start)**
```bash
# 5 questions, 2 minutes
npm run setup
```

**Option B: Full Setup (Comprehensive)**
```bash
# Complete questionnaire, 5-10 minutes
npm run generate
```

**AI Agent Notes:**
- Both create `vibe-project.config.json` with project-specific context
- Updates `.vibe/ai-context.md` with tailored guidelines
- Quick setup provides essential context, full setup provides comprehensive details
- Choose based on project complexity and time available

#### ✅ **Step 5: Verify Setup**
```bash
# Run health check to ensure everything works
npm run pre-commit
```

**Expected Output:**
- ✅ All tests pass (21/21)
- ✅ No linting errors
- ✅ Build succeeds
- ✅ Development server starts

### Phase 3: AI Context Validation (< 30 seconds)

#### ✅ **Step 6: Load AI Context**
```bash
# AI should immediately read these files:
npm run ai:context  # Displays project config
cat .vibe/ai-context.md  # AI-specific guidelines
```

#### ✅ **Step 7: Validate Understanding**
**AI Agent Self-Check:**
- [ ] Can I identify the project type and domain?
- [ ] Do I know the target users and their technical level?
- [ ] Are the core features prioritized with complexity estimates?
- [ ] Do I understand the technical constraints and preferences?
- [ ] Are the business logic and user workflows clear?

### Phase 4: Development Readiness (< 30 seconds)

#### ✅ **Step 8: Set Up Git Hooks**
```bash
# Linux/Mac
./setup-git-hooks.sh

# Windows
setup-git-hooks.bat
```

#### ✅ **Step 9: Create Development Branch**
```bash
# Follow git flow pattern
git checkout -b dev
git push -u origin dev
```

#### ✅ **Step 10: Ready to Develop**
```bash
# Start development server
npm run dev
```

## 🚨 Common Setup Issues & Solutions

### Issue: "Config file is still template"
**Problem:** `vibe-project.config.json` contains placeholder values
**Solution:** Run `npm run generate` to create project-specific config

### Issue: "AI doesn't understand project context"
**Problem:** AI is asking too many generic questions
**Solution:** Verify `.vibe/ai-context.md` is updated with project specifics

### Issue: "Tests failing after clone"
**Problem:** Dependencies not installed or environment issues
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
npm run pre-commit
```

### Issue: "Git hooks not working"
**Problem:** Pre-commit checks not running
**Solution:** Re-run setup script and verify permissions
```bash
chmod +x setup-git-hooks.sh
./setup-git-hooks.sh
```

## 🎯 AI Agent Success Criteria

After setup, AI agents should be able to:

### ✅ **Immediate Understanding (< 5 seconds)**
- Parse project config and understand goals
- Identify target users and technical requirements
- Know feature priorities and complexity estimates
- Understand business constraints and workflows

### ✅ **Smart First Response (< 30 seconds)**
- Suggest appropriate first feature to implement
- Ask 0-3 targeted, context-aware questions
- Propose technical approach matching project needs
- Reference specific user requirements and constraints

### ✅ **Context-Aware Development (ongoing)**
- Make decisions appropriate for target users
- Prioritize features based on business value
- Use technical patterns matching project complexity
- Apply testing strategies relevant to project type

## 📝 AI Agent Setup Script

For maximum efficiency, AI agents can use this automated setup:

```bash
#!/bin/bash
# ai-setup.sh - Automated setup for AI agents

PROJECT_NAME=$1
if [ -z "$PROJECT_NAME" ]; then
  echo "Usage: ./ai-setup.sh [project-name]"
  exit 1
fi

echo "🤖 Setting up $PROJECT_NAME from vibe-starter template..."

# Clone and setup
git clone https://github.com/ChromaticFlint/vibe-starter.git $PROJECT_NAME
cd $PROJECT_NAME

# Clean git history
rm -rf .git
git init

# Update project identity
sed -i "s/vibe-starter/$PROJECT_NAME/g" package.json
sed -i "s/Vibe Starter/$PROJECT_NAME/g" README.md

# Install dependencies
npm install

# Generate project config
echo "📋 Please run: npm run generate"
echo "🔧 Then run: ./setup-git-hooks.sh"
echo "✅ Finally run: npm run pre-commit"

echo "🚀 Setup complete! AI agents can now load context with: npm run ai:context"
```

## 🎉 Expected Outcome

After following this setup guide, AI agents should:

1. **Understand project context immediately** (5 seconds vs 3 minutes)
2. **Ask intelligent, targeted questions** (0-3 vs 10+ generic)
3. **Make appropriate technical decisions** from first interaction
4. **Prioritize features correctly** based on business value
5. **Collaborate effectively** with full project understanding

This transforms the setup from a lengthy discovery process into an instant, intelligent collaboration ready to start productive development immediately.
