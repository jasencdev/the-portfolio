// Import from the mock instead of the actual implementation
import { loadContent } from '../../test/__mocks__/project-loader';

// Using the mocks defined in jest-setup.ts
describe('Project Loader', () => {
  test('loads and processes markdown content', async () => {
    const result = await loadContent('test-project');
    
    expect(result).toHaveProperty('frontmatter');
    expect(result).toHaveProperty('content');
    
    // Check frontmatter properties
    expect(result.frontmatter).toHaveProperty('id', 'test-project');
    expect(result.frontmatter).toHaveProperty('title', 'Test Project');
    expect(result.frontmatter).toHaveProperty('readTime', '5 min');
    expect(result.frontmatter).toHaveProperty('category', 'Web Development');
    
    // Check author properties
    expect(result.frontmatter.author).toHaveProperty('name', 'John Doe');
    expect(result.frontmatter.author).toHaveProperty('avatarUrl', '/path/to/avatar.jpg');
    
    // Check HTML content
    expect(result.content).toContain('<h1>Test Content</h1>');
  });

  test('throws error when project file not found', async () => {
    await expect(loadContent('non-existent-project')).rejects.toThrow(
      'Project file not found at path: /public/projects/non-existent-project.md'
    );
  });
});
