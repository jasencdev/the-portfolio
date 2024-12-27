export interface Author {
    name: string;
    avatarUrl: string;
  }
  
  export interface Frontmatter {
    id: string;
    title: string;
    readTime: string;
    excerpt: string;
    image: string;
    category: string;
    publishedAt: string;
    author: Author;
  }
  
  export interface Post {
    frontmatter: Frontmatter;
    content: string;
  }