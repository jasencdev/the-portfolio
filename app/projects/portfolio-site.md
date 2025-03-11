---
title: "Portfolio Architecture: Building a Modern Developer Showcase with VitePress and Go"
date: 2025-03-08
---

# Portfolio Architecture: Building a Modern Developer Showcase with VitePress and Go

## Overview
This project is my personal portfolio website, built using VitePress, Vue, and Go. It showcases my projects and blog posts in a clean, responsive interface while providing excellent performance and easy content management.

## Architecture

### Frontend Architecture
- **Static Site Generator**: VitePress handles static site generation, which pre-renders all content at build time
- **Component Framework**: Vue 3 with Composition API powers interactive UI elements
- **Routing**: VitePress handles routing automatically based on the file structure
- **Styling**: Custom CSS with CSS variables for theming and responsive design
- **TypeScript**: Used throughout for type safety and better developer experience
- **Content**: Markdown files with frontmatter (YAML metadata) for all content

### Backend Architecture
- **Server**: Go with the Gin framework serves the static assets
- **API Endpoints**: RESTful endpoints for contact form submission and other dynamic features
- **Email Service**: Integration with Resend API for sending contact form emails
- **Error Handling**: Centralized error handling middleware for consistent responses
- **Testing**: Unit tests for critical backend functionality

## Technologies Used
- **Frontend**: 
  - VitePress 1.0 (Vue 3-based SSG)
  - Vue 3 with Composition API
  - TypeScript for type safety
  - Vitest for frontend testing
- **Styling**: 
  - Custom CSS with variables for theming
  - Mobile-first responsive design
  - No CSS frameworks to ensure optimal performance
- **Backend**: 
  - Go 1.20 for server implementation
  - Gin web framework for routing and middleware
  - Godotenv for environment variable management
- **Content Management**: 
  - Markdown with gray-matter for frontmatter parsing
  - YAML metadata for content organization
- **DevOps**:
  - Docker for containerization
  - CI/CD pipeline for automated deployments

## Features
- **Responsive Design**: Fully responsive layout that works seamlessly on mobile, tablet, and desktop
- **Blog System**: 
  - Markdown-based blogging with code syntax highlighting
  - Post categorization and tagging
  - Post sorting by date and filtering capabilities
- **Project Showcase**: 
  - Featured projects with detailed descriptions
  - Technology tags for each project
  - Consistent project card format
- **Performance**: 
  - Fast static site generation for quick initial loads
  - Lazy-loaded images and components
  - Optimized asset delivery
- **SEO**: 
  - Server-side rendering for improved search engine visibility
  - Automatic generation of meta tags
  - Sitemap generation
- **Contact Form**: 
  - Form validation with error handling
  - Email notification system via Resend API
  - CSRF protection
- **Accessibility**: 
  - Semantic HTML structure
  - ARIA attributes for screen readers
  - Keyboard navigation support

## Development Process

### Motivation and Evolution
I developed this site to replace my previous Chakra UI-based portfolio. The original portfolio had several issues:
- Complex styling due to CSS resets from Chakra UI
- Maintenance challenges with growing codebase
- Distractions from content creation due to technical debt

### Architecture Decisions
- **VitePress over Next.js**: Chose VitePress for its Markdown-first approach and simplicity
- **Go over Node.js Backend**: Selected Go for its performance, small binary size, and built-in concurrency
- **No CSS Framework**: Opted for custom CSS to maintain full control over styling and performance
- **Static Generation**: Prioritized static generation for performance and simplified hosting

### Workflow
1. Content is written in Markdown files with YAML frontmatter
2. VitePress builds static HTML, CSS, and JavaScript
3. Go server serves the static assets and handles dynamic API requests
4. Docker containerizes the application for consistent deployment

### Key Advantages
- Simplified content management through Markdown
- Improved performance through static site generation
- More maintainable styling system
- Clear separation of concerns between content and presentation
- Efficient workflow for adding new projects and blog posts

## Implementation Details

### Content Management
The site organizes content in a structured file system:
- `/app/posts/` - Blog post markdown files
- `/app/projects/` - Project showcase markdown files
- `/app/about.md` - About page content
- `/app/index.md` - Home page content

Each file uses frontmatter to define metadata:

```yaml
---
title: "Portfolio Website"
date: 2025-03-08
tags: ["web development", "vue", "go"]
image: "/img/portfolio-thumbnail.jpg"
---
```

### Project Loading System
The project loading system dynamically discovers and loads project markdown files:

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
  
  // Sort projects by date (newest first)
  return projects.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
```

### Contact Form Implementation
The contact form integrates with Go backend APIs for submission:

```typescript
async function submitForm(formData) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}
```

Server-side endpoint in Go:

```go
func handleContactForm(c *gin.Context) {
  var form ContactForm
  if err := c.ShouldBindJSON(&form); err != nil {
    c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    return
  }
  
  // Send email using Resend API
  err := sendEmail(form.Email, form.Name, form.Message)
  if err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email"})
    return
  }
  
  c.JSON(http.StatusOK, gin.H{"message": "Form submitted successfully"})
}
```

## Deployment

The site is containerized using Docker and deployed to a cloud provider:

```dockerfile
FROM node:16 AS frontend-builder
WORKDIR /app
COPY app/ ./
RUN npm install
RUN npm run docs:build

FROM golang:1.20 AS backend-builder
WORKDIR /app
COPY . .
COPY --from=frontend-builder /app/.vitepress/dist ./app/.vitepress/dist
RUN go build -o server main.go

FROM debian:bullseye-slim
WORKDIR /app
COPY --from=backend-builder /app/server .
COPY --from=frontend-builder /app/.vitepress/dist ./app/.vitepress/dist
CMD ["./server"]
```

## Lessons Learned

Throughout this project, I gained valuable insights:
- **Simplicity Wins**: A simpler tech stack leads to easier maintenance
- **Content-First Approach**: Focusing on content rather than complex UI improves user experience
- **Performance Matters**: Static generation significantly improves load times
- **Type Safety**: TypeScript catches errors early and improves developer experience
- **Separation of Concerns**: Keeping content in Markdown separates it from presentation logic

## Future Improvements

Some enhancements could include include:
- Improved image optimization pipeline
- RSS feed for blog posts
- Integration with GitHub API to automatically update project information
- Enhanced analytics to better understand user behavior