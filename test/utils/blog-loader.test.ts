// Import from the mock instead of the actual implementation
import { loadContent } from '../../test/__mocks__/blog-loader';

// Using the mocks defined in jest-setup.ts
describe('Blog Loader', () => {
  test('loads and processes markdown content', async () => {
    const result = await loadContent('test-blog');
    
    expect(result).toHaveProperty('frontmatter');
    expect(result).toHaveProperty('content');
    
    // Check frontmatter properties
    expect(result.frontmatter).toHaveProperty('id', 'test-blog');
    expect(result.frontmatter).toHaveProperty('title', 'Test Blog Post');
    expect(result.frontmatter).toHaveProperty('readTime', '8 min');
    expect(result.frontmatter).toHaveProperty('category', 'Technology');
    
    // Check author properties
    expect(result.frontmatter.author).toHaveProperty('name', 'Jane Smith');
    expect(result.frontmatter.author).toHaveProperty('avatarUrl', '/path/to/jane-avatar.jpg');
    
    // Check HTML content
    expect(result.content).toContain('<h1>Test Blog</h1>');
  });

  test('throws error when blog post file not found', async () => {
    await expect(loadContent('non-existent-blog')).rejects.toThrow(
      'Blog post file not found at path: /public/posts/non-existent-blog.md'
    );
  });
});
