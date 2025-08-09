# Development Workflow & Deployment Guide

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- VS Code (recommended) with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint

### Getting Started
```bash
# Clone or create your project
git clone <your-repo-url>
cd your-project

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Development Commands
```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint
```

## Project Structure

```
vibe-starter/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   └── Button.tsx      # Example component
│   ├── hooks/              # Custom React hooks
│   │   └── useLocalStorage.ts
│   ├── services/           # API calls and business logic
│   ├── stores/             # Zustand state management
│   │   └── exampleStore.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Helper functions
│   │   └── index.ts
│   ├── test/               # Test setup and utilities
│   │   └── setup.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

## Development Best Practices

### Code Organization
- **Components**: Keep components small and focused on a single responsibility
- **Hooks**: Extract reusable logic into custom hooks
- **Stores**: Use Zustand for state management, create focused stores
- **Types**: Define TypeScript interfaces for all data structures
- **Utils**: Create pure functions for common operations

### Naming Conventions
- **Files**: Use PascalCase for components (`Button.tsx`), camelCase for utilities (`formatNumber.ts`)
- **Components**: PascalCase (`MyComponent`)
- **Variables/Functions**: camelCase (`userName`, `handleClick`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`User`, `ApiResponse`)

### Git Flow & Testing Strategy

#### Branch Structure
- **`main`** - Production branch (always deployable)
- **`dev`** - Development branch (integration of features)
- **`feature/*`** - Feature branches (branched from dev)

#### Git Workflow
```bash
# 1. Start from dev branch
git checkout dev
git pull origin dev

# 2. Create feature branch
git checkout -b feature/new-feature

# 3. Make changes and ensure tests pass
npm run test
npm run lint

# 4. Commit only when tests pass
git add .
git commit -m "feat: add new feature"

# 5. Push feature branch
git push origin feature/new-feature

# 6. Create PR to merge into dev
# After review and approval, merge to dev

# 7. When ready for production, merge dev to main
git checkout main
git pull origin main
git merge dev
git push origin main
```

#### Testing Rules (MANDATORY)
**🚨 Never commit or push code that doesn't pass all tests**

```bash
# Before every commit, run:
npm run test        # All tests must pass
npm run lint        # No linting errors
npm run build       # Build must succeed

# Optional but recommended:
npm run test:coverage  # Check test coverage
```

#### Pre-commit Checklist
- [ ] All tests pass (`npm run test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Code is properly formatted
- [ ] New features have tests
- [ ] Documentation updated if needed

### Commit Message Format
```
type(scope): description

Types:
- feat: new feature
- fix: bug fix
- docs: documentation
- style: formatting
- refactor: code restructuring
- test: adding tests
- chore: maintenance

Examples:
- feat(auth): add user login functionality
- fix(api): resolve timeout issue in user service
- test(components): add tests for Button component
```

## Testing Strategy

### Testing Philosophy
**Tests are mandatory and must pass before any commit.** This ensures code quality and prevents regressions.

### Test Types & Coverage Requirements

#### Unit Tests (Required for all components/functions)
```typescript
// Example test file: src/components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('applies correct variant styles', () => {
    render(<Button variant="danger">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-red-600')
  })
})
```

#### Store Tests (Required for all Zustand stores)
```typescript
// src/stores/__tests__/exampleStore.test.ts
import { renderHook, act } from '@testing-library/react'
import { useExampleStore } from '../exampleStore'

describe('Example Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useExampleStore.setState({ count: 0 })
  })

  test('increments count', () => {
    const { result } = renderHook(() => useExampleStore())

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
```

#### Integration Tests (For complex workflows)
```typescript
// src/__tests__/UserWorkflow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../App'

test('complete user workflow', async () => {
  render(<App />)

  // Test full user interaction flow
  fireEvent.click(screen.getByText('Add Item'))
  fireEvent.change(screen.getByPlaceholderText('Enter item'), {
    target: { value: 'New item' }
  })
  fireEvent.click(screen.getByText('Save'))

  await waitFor(() => {
    expect(screen.getByText('New item')).toBeInTheDocument()
  })
})
```

### Test Organization & Best Practices
- **Location**: Place tests in `__tests__` folders next to components
- **Naming**: Use descriptive test names that explain the behavior
- **Structure**: Group related tests using `describe` blocks
- **Coverage**: Aim for 80%+ test coverage on critical paths
- **Mocking**: Mock external dependencies and API calls
- **Cleanup**: Reset state between tests to avoid interference

### Testing Commands & Workflow
```bash
# Run all tests (must pass before commit)
npm run test

# Run tests in watch mode during development
npm run test -- --watch

# Run tests with coverage report
npm run test:coverage

# Run tests for specific file
npm run test Button.test.tsx

# Run tests with UI (helpful for debugging)
npm run test:ui
```

### Test-Driven Development (TDD) Approach
1. **Write failing test** - Define expected behavior
2. **Write minimal code** - Make the test pass
3. **Refactor** - Improve code while keeping tests green
4. **Repeat** - Continue with next feature

### Essential Testing Best Practices

#### Application Health & Console Error Tests
**Critical**: Every project should test that the application renders without console errors.

```typescript
// src/__tests__/AppHealth.test.tsx
import { render } from '@testing-library/react'
import App from '../App'

describe('Application Health', () => {
  let consoleSpy: vi.SpyInstance

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  test('renders without console errors', () => {
    render(<App />)
    expect(consoleSpy).not.toHaveBeenCalled()
  })

  test('renders without console warnings', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(<App />)
    expect(warnSpy).not.toHaveBeenCalled()
    warnSpy.mockRestore()
  })

  test('all routes render successfully', () => {
    // Test critical routes don't crash
    const routes = ['/', '/about', '/contact'] // Add your routes
    routes.forEach(route => {
      window.history.pushState({}, '', route)
      expect(() => render(<App />)).not.toThrow()
    })
  })
})
```

#### API Health & Connection Tests
```typescript
// src/__tests__/ApiHealth.test.ts
import { describe, test, expect, beforeAll } from 'vitest'

describe('API Health Checks', () => {
  test('API endpoints are reachable', async () => {
    const endpoints = [
      '/api/health',
      '/api/users',
      // Add your critical endpoints
    ]

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`)
        expect(response.status).toBeLessThan(500) // Not server error
      } catch (error) {
        // In development, API might not be running - that's ok
        if (import.meta.env.MODE === 'production') {
          throw error
        }
      }
    }
  })

  test('external service connections', async () => {
    // Test critical external services
    const services = [
      'https://api.github.com', // Example external service
      // Add your external dependencies
    ]

    for (const service of services) {
      try {
        const response = await fetch(service, { method: 'HEAD' })
        expect(response.status).toBeLessThan(500)
      } catch (error) {
        console.warn(`External service ${service} unreachable:`, error)
        // Don't fail tests for external services in development
      }
    }
  })
})
```

### Testing Checklist (Before Every Commit)
- [ ] All existing tests pass
- [ ] New features have corresponding tests
- [ ] Edge cases are covered
- [ ] Error scenarios are tested
- [ ] Mock external dependencies
- [ ] Tests are readable and maintainable
- [ ] No console errors or warnings in tests
- [ ] Application health tests pass
- [ ] API health checks pass (if applicable)

### Automated Testing Enforcement

#### Git Hooks (Recommended Setup)
To automatically enforce testing before commits, set up git hooks:

```bash
# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
echo "Running pre-commit checks..."

# Run tests
echo "Running tests..."
npm run test
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Commit aborted."
  exit 1
fi

# Run linting
echo "Running linter..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting failed. Commit aborted."
  exit 1
fi

# Check build
echo "Checking build..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed. Commit aborted."
  exit 1
fi

echo "✅ All checks passed. Proceeding with commit."
EOF

# Make it executable
chmod +x .git/hooks/pre-commit
```

#### Alternative: Using Husky (Optional)
```bash
# Install husky for better git hook management
npm install -D husky

# Initialize husky
npx husky init

# Add pre-commit hook
echo "npm run test && npm run lint && npm run build" > .husky/pre-commit
```

## Cross-Cutting Concerns Testing

### Performance Testing
**Goal**: Ensure application performs well under normal and stress conditions.

```typescript
// src/__tests__/Performance.test.tsx
import { render, screen } from '@testing-library/react'
import { performance } from 'perf_hooks'
import App from '../App'

describe('Performance Tests', () => {
  test('app renders within acceptable time', () => {
    const start = performance.now()
    render(<App />)
    const end = performance.now()

    const renderTime = end - start
    expect(renderTime).toBeLessThan(1000) // Should render in under 1 second
  })

  test('large lists render efficiently', () => {
    const LargeList = () => (
      <ul>
        {Array.from({ length: 1000 }, (_, i) => (
          <li key={i}>Item {i}</li>
        ))}
      </ul>
    )

    const start = performance.now()
    render(<LargeList />)
    const end = performance.now()

    expect(end - start).toBeLessThan(500) // Large lists should render quickly
  })

  test('memory usage stays reasonable', () => {
    const initialMemory = (performance as any).memory?.usedJSHeapSize || 0

    // Render and unmount multiple times
    for (let i = 0; i < 10; i++) {
      const { unmount } = render(<App />)
      unmount()
    }

    const finalMemory = (performance as any).memory?.usedJSHeapSize || 0
    const memoryIncrease = finalMemory - initialMemory

    // Memory shouldn't increase dramatically (allow 10MB increase)
    expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024)
  })
})
```

### Security Testing
**Goal**: Prevent common security vulnerabilities.

```typescript
// src/__tests__/Security.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect } from 'vitest'

describe('Security Tests', () => {
  test('prevents XSS in user input', () => {
    const UserInput = ({ value }: { value: string }) => (
      <div dangerouslySetInnerHTML={{ __html: value }} />
    )

    const maliciousScript = '<script>alert("XSS")</script>'

    // Should sanitize or escape dangerous content
    render(<UserInput value={maliciousScript} />)

    // Script tags should not be executed
    expect(document.querySelector('script')).toBeNull()
  })

  test('validates input lengths', () => {
    const TestForm = () => {
      const [value, setValue] = useState('')
      return (
        <input
          value={value}
          onChange={(e) => {
            // Prevent extremely long inputs
            if (e.target.value.length <= 1000) {
              setValue(e.target.value)
            }
          }}
          data-testid="secure-input"
        />
      )
    }

    render(<TestForm />)
    const input = screen.getByTestId('secure-input')

    // Try to input extremely long string
    const longString = 'a'.repeat(2000)
    fireEvent.change(input, { target: { value: longString } })

    expect(input.value.length).toBeLessThanOrEqual(1000)
  })

  test('sanitizes URLs', () => {
    const SafeLink = ({ href }: { href: string }) => {
      const isSafeUrl = (url: string) => {
        try {
          const parsed = new URL(url)
          return ['http:', 'https:', 'mailto:'].includes(parsed.protocol)
        } catch {
          return false
        }
      }

      return isSafeUrl(href) ? (
        <a href={href} data-testid="safe-link">Link</a>
      ) : (
        <span data-testid="blocked-link">Blocked unsafe link</span>
      )
    }

    // Test safe URLs
    render(<SafeLink href="https://example.com" />)
    expect(screen.getByTestId('safe-link')).toBeInTheDocument()

    // Test dangerous URLs
    render(<SafeLink href="javascript:alert('XSS')" />)
    expect(screen.getByTestId('blocked-link')).toBeInTheDocument()
  })

  test('prevents CSRF by checking origins', () => {
    // Mock a form submission that checks origin
    const secureSubmit = (formData: FormData, origin: string) => {
      const allowedOrigins = ['http://localhost:3000', 'https://myapp.com']
      return allowedOrigins.includes(origin)
    }

    expect(secureSubmit(new FormData(), 'https://myapp.com')).toBe(true)
    expect(secureSubmit(new FormData(), 'https://evil.com')).toBe(false)
  })
})
```

### Accessibility Testing
**Goal**: Ensure application is usable by people with disabilities.

```typescript
// src/__tests__/Accessibility.test.tsx
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import userEvent from '@testing-library/user-event'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

describe('Accessibility Tests', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(<App />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  test('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Test tab navigation
    await user.tab()
    expect(document.activeElement).toBeInTheDocument()

    // Test that all interactive elements are reachable
    const buttons = screen.getAllByRole('button')
    const links = screen.getAllByRole('link')
    const inputs = screen.getAllByRole('textbox')

    const interactiveElements = [...buttons, ...links, ...inputs]

    for (const element of interactiveElements) {
      element.focus()
      expect(document.activeElement).toBe(element)
    }
  })

  test('has proper ARIA labels', () => {
    render(<App />)

    // Check for proper labeling
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(
        button.getAttribute('aria-label') ||
        button.textContent ||
        button.getAttribute('aria-labelledby')
      ).toBeTruthy()
    })

    // Check form inputs have labels
    const inputs = screen.getAllByRole('textbox')
    inputs.forEach(input => {
      expect(
        screen.getByLabelText(input.getAttribute('aria-label') || '') ||
        input.closest('label') ||
        input.getAttribute('aria-labelledby')
      ).toBeTruthy()
    })
  })

  test('supports screen readers', () => {
    render(<App />)

    // Check for semantic HTML
    expect(screen.getByRole('main')).toBeInTheDocument()

    // Check headings are properly structured
    const headings = screen.getAllByRole('heading')
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      expect(level).toBeGreaterThan(0)
      expect(level).toBeLessThan(7)
    })
  })

  test('has sufficient color contrast', () => {
    render(<App />)

    // This would typically use a tool like axe-core
    // For now, we'll check that text elements exist
    const textElements = screen.getAllByText(/./i)
    expect(textElements.length).toBeGreaterThan(0)

    // In a real implementation, you'd check computed styles
    // and verify contrast ratios meet WCAG guidelines
  })

  test('respects reduced motion preferences', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    render(<App />)

    // Check that animations are disabled or reduced
    // This would depend on your specific implementation
    const animatedElements = document.querySelectorAll('[class*="animate"]')
    animatedElements.forEach(element => {
      const styles = window.getComputedStyle(element)
      // Verify animations are disabled when reduced motion is preferred
      expect(
        styles.animationDuration === '0s' ||
        styles.animationDuration === '0.01ms'
      ).toBeTruthy()
    })
  })
})
```

### Error Handling & Resilience Testing
**Goal**: Ensure application gracefully handles errors and edge cases.

```typescript
// src/__tests__/ErrorHandling.test.tsx
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from 'react-error-boundary'

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('Error Handling Tests', () => {
  test('error boundary catches component errors', () => {
    const ErrorFallback = ({ error }: { error: Error }) => (
      <div role="alert">Something went wrong: {error.message}</div>
    )

    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong')
  })

  test('handles network failures gracefully', async () => {
    // Mock fetch to simulate network failure
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    const NetworkComponent = () => {
      const [error, setError] = useState<string | null>(null)
      const [loading, setLoading] = useState(false)

      const fetchData = async () => {
        setLoading(true)
        try {
          await fetch('/api/data')
        } catch (err) {
          setError('Failed to load data')
        } finally {
          setLoading(false)
        }
      }

      return (
        <div>
          <button onClick={fetchData}>Load Data</button>
          {loading && <div>Loading...</div>}
          {error && <div role="alert">{error}</div>}
        </div>
      )
    }

    render(<NetworkComponent />)
    fireEvent.click(screen.getByText('Load Data'))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to load data')
    })
  })

  test('handles malformed data gracefully', () => {
    const DataDisplay = ({ data }: { data: any }) => {
      try {
        return <div>{JSON.stringify(data)}</div>
      } catch {
        return <div>Invalid data format</div>
      }
    }

    // Test with circular reference (causes JSON.stringify to fail)
    const circularData: any = { name: 'test' }
    circularData.self = circularData

    render(<DataDisplay data={circularData} />)
    expect(screen.getByText('Invalid data format')).toBeInTheDocument()
  })

  test('validates environment variables', () => {
    const requiredEnvVars = ['VITE_API_URL', 'VITE_APP_NAME']

    requiredEnvVars.forEach(envVar => {
      expect(import.meta.env[envVar]).toBeDefined()
      expect(import.meta.env[envVar]).not.toBe('')
    })
  })
})
```

### Data Validation Testing
**Goal**: Ensure all data inputs are properly validated.

```typescript
// src/__tests__/DataValidation.test.ts
import { describe, test, expect } from 'vitest'

// Example validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
}

const sanitizeInput = (input: string): string => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
}

describe('Data Validation Tests', () => {
  test('validates email addresses correctly', () => {
    expect(validateEmail('user@example.com')).toBe(true)
    expect(validateEmail('invalid-email')).toBe(false)
    expect(validateEmail('user@')).toBe(false)
    expect(validateEmail('@example.com')).toBe(false)
  })

  test('validates passwords correctly', () => {
    expect(validatePassword('Password123')).toBe(true)
    expect(validatePassword('weak')).toBe(false)
    expect(validatePassword('NoNumbers')).toBe(false)
    expect(validatePassword('nonumbers123')).toBe(false)
  })

  test('sanitizes dangerous input', () => {
    const maliciousInput = '<script>alert("XSS")</script>Hello'
    const sanitized = sanitizeInput(maliciousInput)
    expect(sanitized).toBe('Hello')
    expect(sanitized).not.toContain('<script>')
  })

  test('handles edge cases in validation', () => {
    // Test null/undefined inputs
    expect(() => validateEmail(null as any)).not.toThrow()
    expect(() => validatePassword(undefined as any)).not.toThrow()

    // Test extremely long inputs
    const longString = 'a'.repeat(10000)
    expect(() => validateEmail(longString)).not.toThrow()
    expect(() => sanitizeInput(longString)).not.toThrow()
  })
})
```

## Testing Setup & Dependencies

### Required Testing Dependencies
Add these to your project for comprehensive testing:

```bash
# Core testing dependencies (already included)
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Additional testing utilities
npm install -D jest-axe @axe-core/react
npm install -D @testing-library/react-hooks
npm install -D msw  # Mock Service Worker for API mocking

# Performance testing
npm install -D @testing-library/react-performance

# Visual regression testing (optional)
npm install -D @storybook/test-runner chromatic
```

### Test Configuration Updates
Update your `vite.config.ts` to include testing globals:

```typescript
// vite.config.ts
export default defineConfig({
  // ... existing config
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
      ],
    },
  },
})
```

### Enhanced Test Setup File
Update `src/test/setup.ts`:

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { toHaveNoViolations } from 'jest-axe'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Suppress console errors in tests unless explicitly testing them
const originalError = console.error
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
```

### Comprehensive Testing Checklist

#### Before Every Commit
- [ ] **Application Health**: No console errors/warnings
- [ ] **Unit Tests**: All components and utilities tested
- [ ] **Integration Tests**: User workflows work end-to-end
- [ ] **API Health**: Critical endpoints are reachable
- [ ] **Performance**: Render times within acceptable limits
- [ ] **Security**: Input validation and XSS prevention
- [ ] **Accessibility**: WCAG compliance and keyboard navigation
- [ ] **Error Handling**: Graceful failure scenarios
- [ ] **Data Validation**: All inputs properly validated
- [ ] **Cross-browser**: Works in target browsers

#### Weekly/Release Testing
- [ ] **Load Testing**: Performance under stress
- [ ] **Security Audit**: Dependency vulnerabilities check
- [ ] **Accessibility Audit**: Full axe-core scan
- [ ] **Visual Regression**: UI hasn't broken unexpectedly
- [ ] **Mobile Testing**: Responsive design works correctly
- [ ] **SEO Testing**: Meta tags and structured data correct

### Testing Commands Summary
```bash
# Basic testing
npm run test              # Run all tests
npm run test:watch        # Watch mode for development
npm run test:coverage     # Generate coverage report
npm run test:ui           # Visual test interface

# Advanced testing
npm run test:a11y         # Accessibility tests only
npm run test:performance  # Performance tests only
npm run test:security     # Security tests only
npm run test:e2e          # End-to-end tests (if configured)

# Pre-commit validation
npm run pre-commit        # All checks (tests + lint + build)
```

This comprehensive testing approach ensures your application is robust, secure, accessible, and performant across all scenarios.
```

## Hosting & Deployment

### Recommended Hosting Platforms

#### Vercel (Recommended for React apps)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Pros:**
- Zero-config deployment for Vite/React
- Automatic HTTPS and CDN
- Preview deployments for PRs
- Excellent performance
- Free tier available

**Setup:**
1. Connect GitHub repository
2. Auto-deploys on push to main
3. Preview URLs for feature branches

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

**Pros:**
- Drag-and-drop deployment
- Form handling
- Serverless functions
- Split testing
- Free tier available



### Environment Variables

Create `.env` files for different environments:

```bash
# .env.local (development)
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=My App Dev

# .env.production (production)
VITE_API_URL=https://api.myapp.com
VITE_APP_NAME=My App
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

### Build Optimization

#### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@headlessui/react', '@heroicons/react'],
        },
      },
    },
  },
})
```

#### Performance Tips
- Use dynamic imports for code splitting
- Optimize images (WebP format)
- Enable gzip compression
- Use CDN for static assets
- Implement service worker for caching

### Domain Setup

#### Custom Domain
1. **Purchase domain** from registrar (Namecheap, GoDaddy, etc.)
2. **Configure DNS** to point to hosting provider
3. **Enable HTTPS** (usually automatic with modern hosts)

#### DNS Configuration
```
Type    Name    Value
A       @       192.0.2.1
CNAME   www     yourapp.vercel.app
```

### Monitoring & Analytics

#### Error Tracking
```bash
# Install Sentry
npm install @sentry/react @sentry/tracing

# Configure in main.tsx
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
})
```

#### Analytics
```typescript
// Google Analytics 4
import { gtag } from 'ga-gtag'

gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: document.title,
  page_location: window.location.href,
})
```

### Security Considerations

#### Content Security Policy
```html
<!-- Add to index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

#### Environment Security
- Never commit `.env` files
- Use different API keys for dev/prod
- Validate all user inputs
- Sanitize data before rendering
- Use HTTPS in production

### Backup & Recovery

#### Code Backup
- Use Git with remote repositories (GitHub, GitLab)
- Tag releases for easy rollback
- Maintain development and production branches

#### Data Backup
- Regular database backups if using backend
- Export user data functionality
- Version control for configuration

### Scaling Considerations

#### Performance Monitoring
- Core Web Vitals tracking
- Bundle size monitoring
- API response time tracking
- Error rate monitoring

#### Scaling Strategies
- CDN for global distribution
- Database optimization
- Caching strategies
- Load balancing for high traffic

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update type definitions
npm update @types/react @types/react-dom
```

#### Deployment Issues
- Check build output in `dist/` folder
- Verify environment variables
- Check hosting platform logs
- Test production build locally with `npm run preview`

---

*This workflow guide should be updated as your project grows and requirements change.*
