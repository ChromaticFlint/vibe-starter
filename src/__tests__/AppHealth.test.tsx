import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import App from '../App'

describe('Application Health', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>

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

  test('app renders successfully', () => {
    const { container } = render(<App />)
    expect(container.firstChild).toBeInTheDocument()
  })

  test('contains expected content', () => {
    render(<App />)
    // Test that key elements are present
    expect(document.querySelector('h1')).toBeInTheDocument()
    expect(document.querySelector('button')).toBeInTheDocument()
  })

  test('no JavaScript errors thrown during render', () => {
    expect(() => {
      render(<App />)
    }).not.toThrow()
  })
})
