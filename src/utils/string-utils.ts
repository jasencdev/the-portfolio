/**
 * Creates a URL-friendly slug from a string
 * @param text The text to convert into a slug
 * @returns A URL-friendly version of the text
 */
export const createSlug = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')                // Normalize unicode characters
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9]+/g, '-')     // Replace non-alphanumeric chars with hyphens
      .replace(/(^-|-$)+/g, '')        // Remove leading/trailing hyphens
      .trim()
  }
  
  /**
   * Extracts the filename without extension from a file path
   * @param path The full file path
   * @returns The filename without extension
   */
  export const getFileNameFromPath = (path: string): string => {
    return path.split('/').pop()?.replace(/\.(md|mdx)$/, '') || ''
  }