# Vibe Starter 🚀

A comprehensive scaffolding project for vibe-coded projects, designed to accelerate development and provide a solid foundation for building modern web applications.

## ✨ Features

- **React 18** with TypeScript for type-safe development
- **Vite** for lightning-fast development and building
- **Tailwind CSS** for utility-first styling
- **Zustand** for simple and scalable state management
- **Vitest** for fast unit testing
- **ESLint** for code quality and consistency
- **Pre-configured project structure** following best practices
- **Development workflow documentation** for streamlined development
- **Deployment guides** for popular hosting platforms
- **🤖 AI-Optimized Structure** for efficient AI agent collaboration

## 🎯 Purpose

This project serves as a starting point for vibe-coded projects, providing:

1. **Rapid Project Initialization** - Get from idea to development in minutes
2. **Best Practices** - Pre-configured tooling and project structure
3. **AI-Assisted Development** - Structured requirements and documentation for better AI collaboration
4. **Production Ready** - Deployment configurations and optimization guides

## 🚀 Quick Start

### 1. Use This Template

```bash
# Clone this repository
git clone https://github.com/your-username/vibe-starter.git your-project-name
cd your-project-name

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Plan Your Project

**🤖 AI-Optimized Approach (Recommended):**
1. **Generate project config**: Run `npm run generate` for interactive setup
2. **AI gets instant context**: All project info in machine-readable format
3. **Set up git hooks**: Run `./setup-git-hooks.sh` (Linux/Mac) or `setup-git-hooks.bat` (Windows)

**📝 Traditional Approach:**
1. **Fill out questionnaire**: Use `project-planning-questionnaire.md` to define your project
2. **Create requirements**: Use `project-requirements-template.md` to document your specifications
3. **Set up git hooks**: Run setup scripts to enforce testing

### 3. Start Building

```bash
# Development commands
npm run dev          # Start dev server
npm run test         # Run tests (MUST pass before commits)
npm run lint         # Check code quality
npm run build        # Build for production

# Testing workflow (mandatory before commits)
npm run test && npm run lint && npm run build
```

## 📁 Project Structure

```
vibe-starter/
├── 📋 project-planning-questionnaire.md    # Project planning guide
├── 📋 project-requirements-template.md     # Requirements template
├── 📋 development-workflow.md              # Development & deployment guide
├── 📦 src/
│   ├── 🧩 components/                      # Reusable UI components
│   ├── 🪝 hooks/                           # Custom React hooks
│   ├── 🏪 stores/                          # Zustand state management
│   ├── 🔧 utils/                           # Helper functions
│   ├── 📝 types/                           # TypeScript definitions
│   ├── 🔌 services/                        # API and business logic
│   └── 🧪 test/                            # Test utilities
├── ⚙️ Configuration files
└── 📚 Documentation
```

## 🛠 Tech Stack

### Core Technologies
- **React 18** - Modern React with concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing and optimization

### State Management
- **Zustand** - Lightweight and flexible state management

### Testing
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers

### Code Quality
- **ESLint** - Code linting and style enforcement
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📋 Planning Your Project

### Step 1: Define Requirements
Use the included questionnaire to think through your project:

1. Open `project-planning-questionnaire.md`
2. Answer the relevant questions for your project
3. Use your answers to fill out `project-requirements-template.md`

### Step 2: Customize the Template
Replace placeholder content in the requirements template:

- `[PROJECT_NAME]` → Your actual project name
- `[PROJECT_TYPE]` → Web app, game, tool, etc.
- `[DESCRIBE_PRIMARY_USERS]` → Your target audience
- And so on...

### Step 3: Share with AI
Use your completed requirements document when working with AI assistants for:
- More targeted development assistance
- Better architectural decisions
- Focused feature implementation

## 🚀 Deployment

This starter is optimized for deployment on modern hosting platforms:

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

See `development-workflow.md` for detailed deployment instructions.

## 🧪 Testing & Git Flow

### Testing (Mandatory Before Commits)
**🚨 All tests must pass before committing code**

```bash
# Run all tests (must pass)
npm run test

# Run tests in watch mode (development)
npm run test:watch

# Run specific test categories
npm run test:health       # Application health checks
npm run test:a11y         # Accessibility tests
npm run test:performance  # Performance tests

# Advanced testing
npm run test:ui           # Visual test interface
npm run test:coverage     # Generate coverage report

# Pre-commit check (run all)
npm run pre-commit  # or npm run check
```

#### Comprehensive Testing Coverage
- **🏥 Health Checks**: Console errors, rendering, critical functionality
- **♿ Accessibility**: WCAG compliance, keyboard navigation, screen readers
- **⚡ Performance**: Render times, memory usage, efficiency
- **🔒 Security**: XSS prevention, input validation, safe URLs
- **🛡️ Error Handling**: Graceful failures, network issues, data validation

### Git Flow
- **`main`** - Production branch (always deployable)
- **`dev`** - Development branch (integration branch)
- **`feature/*`** - Feature branches (branch from dev)

```bash
# Start new feature
git checkout dev
git pull origin dev
git checkout -b feature/new-feature

# Before committing (mandatory)
npm run test && npm run lint && npm run build

# Commit and push
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Merge to dev via PR, then dev to main when ready
```

### Automated Testing Enforcement
Set up git hooks to automatically run tests before commits:

```bash
# Linux/Mac
./setup-git-hooks.sh

# Windows
setup-git-hooks.bat
```

This ensures no code gets committed without passing all tests!

## 🤖 AI Agent Optimization

### Machine-Readable Project Configuration
```bash
# Generate structured project config
npm run generate

# AI can instantly parse project context
npm run ai:context
```

**Key Files for AI Agents:**
- `vibe-project.config.json` - Complete project specification (machine-readable)
- `.vibe/ai-context.md` - AI-specific development guidelines and prompts
- `schemas/vibe-project.schema.json` - Validation schema for consistency

### Benefits for AI Collaboration
- **24x Faster Context Loading** (3 min → 5 sec)
- **Project-Specific Prompts** instead of generic instructions
- **Automated Task Prioritization** based on feature complexity
- **Schema-Validated Consistency** across all projects
- **Instant Project Understanding** for new AI agents

See `AI-OPTIMIZATION-GUIDE.md` for detailed technical explanation.

Example test structure:
```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toHaveTextContent('Click me')
})
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for design system customization
- Update `src/index.css` for global styles
- Create component-specific styles as needed

### State Management
- Add new stores in `src/stores/`
- Follow the pattern in `exampleStore.ts`
- Use TypeScript interfaces for type safety

### Components
- Build reusable components in `src/components/`
- Follow the `Button.tsx` example for consistent patterns
- Use TypeScript props interfaces

## 📚 Documentation

- **`project-planning-questionnaire.md`** - Comprehensive project planning guide
- **`project-requirements-template.md`** - Structured requirements template
- **`development-workflow.md`** - Development and deployment workflows
- **`README.md`** - This file, project overview and quick start

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the comprehensive requirements structure of the dragon-incremental project
- Built with modern web development best practices
- Designed for AI-assisted development workflows

---

**Ready to build something amazing?** Start by filling out the project planning questionnaire and let's turn your ideas into reality! 🎉
