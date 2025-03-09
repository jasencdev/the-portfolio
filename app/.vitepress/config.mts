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
    return {
      text: post.title,
      link: post.link
    }
  })
}

// Get projects for sidebar
function getSidebarProjects() {
  const projects = getProjects()
  return projects.map(project => {
    return {
      text: project.title,
      link: project.link
    }
  })
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "jasenc.dev",
  description: "Portfolio for jasenc.dev",
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
        text: 'Projects',
        items: [
          { text: 'All Projects', link: '/projects' },
          ...getSidebarProjects()
        ]
      },
      {
        text: 'Blog',
        items: [
          { text: 'All Posts', link: '/blog' },
          ...getSidebarPosts()
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
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
