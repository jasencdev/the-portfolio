export const posts = [
    {
      id: '1',
      title: 'The Future of SaaS: Trends to Watch in 2023',
      readTime: '4 min',
      excerpt:
        'Discover the latest trends in SaaS that are shaping the future of digital solutions and how your business can benefit.',
      image: 'https://tinyurl.com/2p8b9h6v',
      category: 'Industry Insights',
      publishedAt: 'January 15, 2023',
      author: {
        name: 'John Doe',
        avatarUrl: 'https://tinyurl.com/2p8h98w8',
      },
    },
    {
      id: '2',
      title: 'Boost Your Business with Custom Software Solutions',
      readTime: '5 min',
      excerpt:
        'Learn how custom software solutions can streamline your operations and drive growth in your business.',
      image: 'https://tinyurl.com/2p8b9h6v',
      category: 'Business Growth',
      publishedAt: 'February 20, 2023',
      author: {
        name: 'Jane Smith',
        avatarUrl: 'https://tinyurl.com/2p98t7nh',
      },
    },
    {
      id: '3',
      title: 'Case Study: How We Helped XYZ Corp Increase Efficiency',
      readTime: '4 min',
      excerpt:
        'A detailed case study on how our digital solutions helped XYZ Corp improve their efficiency by 30%.',
      image: 'https://tinyurl.com/2p8b9h6v',
      category: 'Case Studies',
      publishedAt: 'March 10, 2023',
      author: {
        name: 'Alice Johnson',
        avatarUrl: 'https://tinyurl.com/2p8fy9ym',
      },
    },
  ]
  
  export interface Author {
    name: string
    avatarUrl: string
  }
  
  export interface Post {
    id: string
    title: string
    readTime: string
    excerpt: string
    image: string
    category: string
    publishedAt: string
    author: Author
  }
  