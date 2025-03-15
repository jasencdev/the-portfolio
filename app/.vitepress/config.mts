import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
// Add reference to type declaration file
/// <reference path="./types.d.ts" />

// Function to get all posts
function getPosts() {
  const postsDir = path.join(__dirname, '../posts')
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'))
  
  const posts = files.map(file => {
    const filePath = path.join(postsDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(content)
    const filename = path.basename(file, '.md')
    
    // Parse date properly - handle both Date objects and date strings
    let dateValue = data.date
    
    // If it's not already a Date object, try to parse it
    if (!(dateValue instanceof Date)) {
      if (typeof dateValue === 'string') {
        // Try to parse the date string - ensure it's in ISO format (YYYY-MM-DD)
        const dateParts = dateValue.split('-')
        if (dateParts.length === 3) {
          // If it looks like YYYY-MM-DD format
          const [year, month, day] = dateParts
          // JavaScript months are 0-indexed, so subtract 1 from month
          dateValue = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        } else {
          // If it's not in our expected format, create a new date
          dateValue = new Date()
        }
      } else {
        // If it's not a string or a Date, use current date
        dateValue = new Date()
      }
    }
    
    // Convert date to ISO string format for consistent storage
    const isoDate = dateValue.toISOString()
    
    return {
      title: data.title || filename,
      date: isoDate, // Store as ISO date string for reliable parsing
      link: `/posts/${filename}`
    }
  })
  
  // Sort posts by date in descending order
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Function to get all projects
function getProjects() {
  const projectsDir = path.join(__dirname, '../projects')
  const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.md'))
  
  const projects = files.map(file => {
    const filePath = path.join(projectsDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(content)
    const filename = path.basename(file, '.md')
    
    // Parse date properly - handle both Date objects and date strings
    let dateValue = data.date
    
    // If it's not already a Date object, try to parse it
    if (!(dateValue instanceof Date)) {
      if (typeof dateValue === 'string') {
        // Try to parse the date string - ensure it's in ISO format (YYYY-MM-DD)
        const dateParts = dateValue.split('-')
        if (dateParts.length === 3) {
          // If it looks like YYYY-MM-DD format
          const [year, month, day] = dateParts
          // JavaScript months are 0-indexed, so subtract 1 from month
          dateValue = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        } else {
          // If it's not in our expected format, create a new date
          dateValue = new Date()
        }
      } else {
        // If it's not a string or a Date, use current date
        dateValue = new Date()
      }
    }
    
    // Convert date to ISO string format for consistent storage
    const isoDate = dateValue.toISOString()
    
    return {
      title: data.title || filename,
      date: isoDate, // Store as ISO date string for reliable parsing
      link: `/projects/${filename}`
    }
  })
  
  // Sort posts by date in descending order
  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get posts for sidebar
function getSidebarPosts() {
  const posts = getPosts()
  return posts.map(post => {
    // Truncate title at first colon if it exists
    const truncatedTitle = post.title.includes(':') 
      ? post.title.split(':')[0] 
      : post.title
    return {
      text: `• ${truncatedTitle}`,
      link: post.link
    }
  })
}

// Get projects for sidebar
function getSidebarProjects() {
  const projects = getProjects()
  return projects.map(project => {
    // Truncate title at first colon if it exists
    const truncatedTitle = project.title.includes(':') 
      ? project.title.split(':')[0] 
      : project.title
    return {
      text: `• ${truncatedTitle}`,
      link: project.link
    }
  })
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'https://raw.githubusercontent.com/jasencdev/the-portfolio/refs/heads/main/app/img/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'description', content: 'Portfolio for jasenc.dev' }],
    ['meta', { property: 'og:title', content: 'Jasen Carroll | Software Engineer Portfolio' }],
    ['meta', { property: 'og:description', content: 'Explore projects, blog posts, and DevOps tutorials from Jasen Carroll.' }],
    ['meta', { property: 'og:url', content: 'https://jasenc.dev' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],
  sitemap: {
    hostname: 'https://jasenc.dev'
  },
  title: "jasenc.dev",
  titleTemplate: "Jasen Carroll | Software Engineer",
  description: "Jasen Carroll is a software engineer with expertise in Go, Python, DevOps, and backend development. Explore projects, blog posts, and career insights.",
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/projects' },
      { text: 'Blog', link: '/blog' },
      { text: 'About', link: '/about' },
      { text: 'Contact', link: '/contact' },
    ],

    sidebar: [
      {
        text: 'Projects', link: '/projects',
        items: [
          ...getSidebarProjects()
        ]
      },
      {
        text: 'Blog', link: '/blog',
        items: [
          ...getSidebarPosts()
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jasencdev' }
    ],
    
    // Add posts to theme data
    posts: getPosts(),
    // Add projects to theme data
    projects: getProjects()
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => ['FormKit', 'FormKitSchema'].includes(tag) || tag.startsWith('FormKit')
      }
    }
  }
})
