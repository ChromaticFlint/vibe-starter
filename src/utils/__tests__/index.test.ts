import { describe, test, expect, vi } from 'vitest'
import { formatNumber, formatCurrency, formatDate, debounce, sleep, generateId } from '../index'

describe('Utility Functions', () => {
  describe('formatNumber', () => {
    test('formats large numbers correctly', () => {
      expect(formatNumber(1000)).toBe('1.0K')
      expect(formatNumber(1000000)).toBe('1.0M')
      expect(formatNumber(1000000000)).toBe('1.0B')
      expect(formatNumber(500)).toBe('500')
    })
  })

  describe('formatCurrency', () => {
    test('formats currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
      expect(formatCurrency(1000, 'EUR')).toBe('€1,000.00')
    })
  })

  describe('formatDate', () => {
    test('formats date correctly', () => {
      const date = new Date('2023-12-25T12:00:00Z')
      const formatted = formatDate(date)
      expect(formatted).toContain('2023')
      expect(formatted).toContain('Dec')
    })
  })

  describe('debounce', () => {
    test('debounces function calls', async () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)
      
      debouncedFn()
      debouncedFn()
      debouncedFn()
      
      expect(mockFn).not.toHaveBeenCalled()
      
      await sleep(150)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('sleep', () => {
    test('waits for specified time', async () => {
      const start = Date.now()
      await sleep(50)
      const end = Date.now()
      expect(end - start).toBeGreaterThanOrEqual(45) // Allow some tolerance
    })
  })

  describe('generateId', () => {
    test('generates unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      
      expect(id1).toBeTruthy()
      expect(id2).toBeTruthy()
      expect(id1).not.toBe(id2)
      expect(typeof id1).toBe('string')
    })
  })
})
