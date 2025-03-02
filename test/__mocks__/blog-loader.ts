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
  if (filePath === 'test-blog') {
    return {
      frontmatter: {
        id: 'test-blog',
        title: 'Test Blog Post',
        readTime: '8 min',
        excerpt: 'This is a test blog post',
        image: '/path/to/blog-image.jpg',
        category: 'Technology',
        publishedAt: '2023-02-20',
        author: {
          name: 'Jane Smith',
          avatarUrl: '/path/to/jane-avatar.jpg'
        }
      },
      content: '<h1>Test Blog</h1><p>This is a test blog post content.</p>'
    };
  } else {
    throw new Error(`Blog post file not found at path: /public/posts/${filePath}.md`);
  }
}