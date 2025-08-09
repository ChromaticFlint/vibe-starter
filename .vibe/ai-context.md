# AI Context & Instructions

## Quick Project Summary
<!-- Auto-generated from vibe-project.config.json -->
**Project**: [PROJECT_NAME]  
**Type**: [PROJECT_TYPE]  
**Domain**: [DOMAIN]  
**Status**: [STATUS]  

## AI Development Guidelines

### 🎯 Primary Objectives
1. [OBJECTIVE_1]
2. [OBJECTIVE_2]
3. [OBJECTIVE_3]

### 🏗️ Architecture Decisions
- **Frontend**: React + TypeScript + Vite + Tailwind
- **State**: Zustand for client state
- **Testing**: Vitest + Testing Library (mandatory before commits)
- **Deployment**: [DEPLOYMENT_PLATFORM]

### 🧪 Testing Requirements (MANDATORY)
```bash
# All tests must pass before commits
npm run pre-commit  # Runs: test + lint + build
```

**Test Categories Required:**
- ✅ Application Health (no console errors)
- ✅ Accessibility (WCAG compliance)
- ✅ Performance (render times)
- ✅ Security (XSS prevention)
- ✅ Unit tests for all components

### 🔄 Git Flow
- **main**: Production branch
- **dev**: Integration branch  
- **feature/***: Feature branches (branch from dev)

### 🚨 Critical Constraints
- [CONSTRAINT_1]
- [CONSTRAINT_2]
- [CONSTRAINT_3]

### 💡 Development Priorities
1. **User Experience**: [UX_PRIORITY]
2. **Performance**: [PERFORMANCE_PRIORITY]
3. **Accessibility**: [A11Y_PRIORITY]
4. **Security**: [SECURITY_PRIORITY]

### 🎨 UI/UX Guidelines
- **Design System**: [DESIGN_APPROACH]
- **Responsive**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: <1s initial load, <500ms interactions

### 📊 Success Metrics
- **Performance**: [PERFORMANCE_TARGETS]
- **Accessibility**: [A11Y_TARGETS]
- **User Engagement**: [ENGAGEMENT_TARGETS]

## AI Prompt Templates

### For New Features
```
Context: Working on [PROJECT_NAME] - [PROJECT_TYPE] in [DOMAIN] domain.
Architecture: React + TypeScript + Vite + Tailwind + Zustand
Testing: Mandatory comprehensive testing (health, a11y, performance, security)
Git Flow: feature/* -> dev -> main

Task: [SPECIFIC_TASK]
Requirements: [SPECIFIC_REQUIREMENTS]
Constraints: [SPECIFIC_CONSTRAINTS]

Please implement following our testing standards and git flow.
```

### For Bug Fixes
```
Context: [PROJECT_NAME] bug fix
Issue: [BUG_DESCRIPTION]
Expected: [EXPECTED_BEHAVIOR]
Actual: [ACTUAL_BEHAVIOR]

Please fix while maintaining test coverage and following our standards.
```

### For Refactoring
```
Context: [PROJECT_NAME] refactoring
Target: [COMPONENT/FEATURE_TO_REFACTOR]
Goal: [REFACTORING_GOAL]

Please refactor while maintaining all existing tests and functionality.
```

## Quick Commands Reference
```bash
# Development
npm run dev              # Start dev server
npm run test:watch       # Watch mode testing

# Pre-commit (mandatory)
npm run pre-commit       # All checks must pass

# Specific testing
npm run test:health      # Application health
npm run test:a11y        # Accessibility
npm run test:performance # Performance

# Deployment
npm run build           # Production build
npm run preview         # Preview build
```

---
*This file is auto-updated when vibe-project.config.json changes*
