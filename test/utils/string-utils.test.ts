import { createSlug, getFileNameFromPath } from '../../src/utils/string-utils';

describe('createSlug', () => {
  test('converts text to URL-friendly slug', () => {
    expect(createSlug('Hello World')).toBe('hello-world');
  });

  test('removes special characters and replaces with hyphens', () => {
    expect(createSlug('Hello, World!')).toBe('hello-world');
  });

  test('handles multiple spaces and special characters', () => {
    expect(createSlug('This is  a   test!!')).toBe('this-is-a-test');
  });

  test('removes diacritics from characters', () => {
    expect(createSlug('risumi cafi')).toBe('risumi-cafi');
  });

  test('trims leading and trailing hyphens', () => {
    expect(createSlug('-hello world-')).toBe('hello-world');
  });

  test('handles empty strings', () => {
    expect(createSlug('')).toBe('');
  });
});

describe('getFileNameFromPath', () => {
  test('extracts filename from markdown path', () => {
    expect(getFileNameFromPath('/path/to/file.md')).toBe('file');
  });

  test('extracts filename from mdx path', () => {
    expect(getFileNameFromPath('/path/to/file.mdx')).toBe('file');
  });

  test('handles paths with no extension', () => {
    expect(getFileNameFromPath('/path/to/file')).toBe('file');
  });

  test('handles just the filename', () => {
    expect(getFileNameFromPath('file.md')).toBe('file');
  });

  test('handles empty path', () => {
    expect(getFileNameFromPath('')).toBe('');
  });
});