---
title: "Portfolio Website"
date: 2025-03-08
---

# Portfolio Website

## Overview
This project is my personal portfolio website, built using VitePress, Vue, and Go. It showcases my projects and blog posts in a clean, responsive interface.

## Technologies Used
- **Frontend**: VitePress, Vue 3
- **Styling**: CSS with custom variables
- **Backend**: Go with the Gin framework
- **Content Management**: Markdown with gray-matter for frontmatter parsing

## Features
- Responsive design that works on all devices
- Blog system with markdown support
- Project showcase with featured projects
- Fast static site generation
- Server-side rendering for improved SEO

## Development Process
I developed this site to replace my previous Chakra UI-based portfolio. The key advantages of this approach include:
- Simplified content management through Markdown
- Improved performance through static site generation
- More maintainable styling system

## Code Examples

### Project Loading
```typescript
function getProjects() {
  const projectsDir = path.join(__dirname, '../projects')
  const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.md'))
  
  const projects = files.map(file => {
    const filePath = path.join(projectsDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(content)
    const filename = path.basename(file, '.md')
    
    return {
      title: data.title || filename,
      details: data.description || '',
      icon: data.icon || '',
      link: `/projects/${filename}`
    }
  })
  
  return projects
}