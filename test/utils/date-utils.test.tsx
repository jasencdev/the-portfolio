import { formatDate, isValidDate } from '../../src/utils/date-utils'

describe('Date Utils', () => {
  test('formatDate converts dates to readable format', () => {
    const date = new Date('2024-03-15')
    expect(formatDate(date)).toBe('March 15, 2024')
  })

  test('isValidDate validates date strings', () => {
    expect(isValidDate('2024-03-15')).toBe(true)
    expect(isValidDate('invalid')).toBe(false)
  })
})