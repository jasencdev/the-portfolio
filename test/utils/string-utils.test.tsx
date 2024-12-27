// test/string-utils.test.ts
import { createSlug, getFileNameFromPath } from '../../src/utils/string-utils';

describe('string-utils', () => {
  describe('createSlug', () => {
    test('converts text to URL-friendly slug', () => {
      expect(createSlug('Hello World')).toBe('hello-world');
      expect(createSlug('This is a Test')).toBe('this-is-a-test');
    });
  });

  describe('getFileNameFromPath', () => {
    test('extracts filename without extension', () => {
      expect(getFileNameFromPath('/public/posts/hello-world.mdx')).toBe('hello-world');
      expect(getFileNameFromPath('test.mdx')).toBe('test');
    });
  });
});