export interface Frontmatter {
  id: string;
  title: string;
  readTime: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt: string;
  author: {
    name: string;
    avatarUrl: string;
  };
}

export async function loadContent(filePath: string): Promise<{
  frontmatter: Frontmatter;
  content: string;
}> {
  if (filePath === 'test-project') {
    return {
      frontmatter: {
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
      },
      content: '<h1>Test Content</h1><p>This is a test markdown content.</p>'
    };
  } else {
    throw new Error(`Project file not found at path: /public/projects/${filePath}.md`);
  }
}