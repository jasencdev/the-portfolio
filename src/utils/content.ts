export interface Project {
    id: string
    title: string
    readTime: string
    excerpt: string
    image: string
    category: string
    publishedAt: string
    author: {
      name: string
      avatarUrl: string
    }
  }
  
  export interface Frontmatter extends Project {}