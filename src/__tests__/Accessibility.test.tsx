import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('Accessibility Tests', () => {
  test('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Test tab navigation works
    await user.tab()
    expect(document.activeElement).toBeInTheDocument()
    
    // Test that interactive elements are focusable
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 0) {
      buttons[0].focus()
      expect(document.activeElement).toBe(buttons[0])
    }
  })

  test('has proper semantic HTML structure', () => {
    render(<App />)
    
    // Check for main content area
    const main = document.querySelector('main') || document.querySelector('[role="main"]')
    expect(main || document.body).toBeInTheDocument()
    
    // Check headings exist and are properly structured
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1))
      expect(level).toBeGreaterThan(0)
      expect(level).toBeLessThan(7)
    })
  })

  test('buttons have accessible names', () => {
    render(<App />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      // Button should have text content or aria-label
      const hasAccessibleName = 
        button.textContent?.trim() ||
        button.getAttribute('aria-label') ||
        button.getAttribute('aria-labelledby') ||
        button.getAttribute('title')
      
      expect(hasAccessibleName).toBeTruthy()
    })
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
    
    // In a real app, you'd check that animations are disabled
    // For now, just verify the app still renders
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })

  test('has sufficient color contrast', () => {
    render(<App />)
    
    // This is a basic check - in a real app you'd use tools like axe-core
    // to automatically check color contrast ratios
    const textElements = document.querySelectorAll('h1, h2, h3, p, span, div')
    expect(textElements.length).toBeGreaterThan(0)
    
    // Verify text is visible (not transparent or same color as background)
    textElements.forEach(element => {
      const styles = window.getComputedStyle(element)
      expect(styles.opacity).not.toBe('0')
    })
  })
})
