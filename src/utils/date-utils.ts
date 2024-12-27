export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  export function isValidDate(dateString: string): boolean {
    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date.getTime())
  }
  
  export function sortByDate(a: { date: string }, b: { date: string }): number {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  }