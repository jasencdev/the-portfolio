import { formatDate, isValidDate, sortByDate } from '../../src/utils/date-utils';

describe('formatDate', () => {
  test('formats date in Month Day, Year format', () => {
    const date = new Date(2023, 0, 15); // January 15, 2023
    expect(formatDate(date)).toBe('January 15, 2023');
  });

  test('handles different months correctly', () => {
    const date = new Date(2023, 11, 25); // December 25, 2023
    expect(formatDate(date)).toBe('December 25, 2023');
  });

  test('handles single digit days with no leading zero', () => {
    const date = new Date(2023, 6, 1); // July 1, 2023
    expect(formatDate(date)).toBe('July 1, 2023');
  });
});

describe('isValidDate', () => {
  test('returns true for valid date strings', () => {
    expect(isValidDate('2023-01-15')).toBe(true);
    expect(isValidDate('January 15, 2023')).toBe(true);
    expect(isValidDate('1/15/2023')).toBe(true);
  });

  test('returns false for invalid date strings', () => {
    expect(isValidDate('not a date')).toBe(false);
    expect(isValidDate('2023-13-15')).toBe(false); // Invalid month
    expect(isValidDate('')).toBe(false);
  });
});

describe('sortByDate', () => {
  test('sorts objects by date in descending order (newest first)', () => {
    const items = [
      { date: '2023-01-15', title: 'First' },
      { date: '2023-03-10', title: 'Second' },
      { date: '2023-02-20', title: 'Third' }
    ];

    const sorted = [...items].sort(sortByDate);

    expect(sorted[0].title).toBe('Second'); // 2023-03-10 (newest)
    expect(sorted[1].title).toBe('Third');  // 2023-02-20
    expect(sorted[2].title).toBe('First');  // 2023-01-15 (oldest)
  });

  test('handles same dates correctly', () => {
    const items = [
      { date: '2023-01-15', title: 'First' },
      { date: '2023-01-15', title: 'Second' }
    ];

    const sorted = [...items].sort(sortByDate);
    
    // Same dates should remain in original order
    expect(sorted[0].title).toBe('First');
    expect(sorted[1].title).toBe('Second');
  });
});
