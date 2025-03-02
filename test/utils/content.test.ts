import { Project, Frontmatter } from '../../src/utils/content';

describe('Project interface', () => {
  test('validates Project interface properties', () => {
    const validProject: Project = {
      id: 'test-project',
      title: 'Test Project',
      readTime: '5 min',
      excerpt: 'This is a test project',
      image: '/path/to/image.jpg',
      category: 'Web Development',
      publishedAt: '2023-01-15',
      author: {
        name: 'John Doe',
        avatarUrl: '/path/to/avatar.jpg'
      }
    };

    // Check for type correctness
    expect(typeof validProject.id).toBe('string');
    expect(typeof validProject.title).toBe('string');
    expect(typeof validProject.readTime).toBe('string');
    expect(typeof validProject.excerpt).toBe('string');
    expect(typeof validProject.image).toBe('string');
    expect(typeof validProject.category).toBe('string');
    expect(typeof validProject.publishedAt).toBe('string');
    expect(typeof validProject.author).toBe('object');
    expect(typeof validProject.author.name).toBe('string');
    expect(typeof validProject.author.avatarUrl).toBe('string');
  });
});

describe('Frontmatter interface', () => {
  test('is compatible with Project interface', () => {
    const validFrontmatter: Frontmatter = {
      id: 'test-frontmatter',
      title: 'Test Frontmatter',
      readTime: '10 min',
      excerpt: 'This is a test frontmatter',
      image: '/path/to/frontmatter-image.jpg',
      category: 'Testing',
      publishedAt: '2023-02-20',
      author: {
        name: 'Jane Smith',
        avatarUrl: '/path/to/jane-avatar.jpg'
      }
    };

    // Test that Frontmatter extends Project correctly
    const project: Project = validFrontmatter;
    
    expect(project).toEqual(validFrontmatter);
  });
});
