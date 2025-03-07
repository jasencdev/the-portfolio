---
id: "1"
title: "Personal Portfolio & Blog"
readTime: "5 min"
excerpt: "The design and development process of jasenc.dev"
image: "/img/browser.png"
category: "Web Development"
publishedAt: "March 7, 2025"
author:
  name: "Jasen Carroll"
  avatarUrl: "https://avatars.githubusercontent.com/u/108644550?v=4"
technologies: ["React", "TypeScript", "Chakra UI", "Vite", "Express", "Railway"]
githubUrl: "https://github.com/jasencarroll/the-portfolio"
---

# Building My Portfolio Website

This project serves as both my personal portfolio and blog. I designed it to showcase my work, share my thoughts through blog posts, and demonstrate my technical abilities.

## Project Goals

When building this portfolio site, I had several key objectives:

1. **Modern Tech Stack**: Utilize current, industry-standard technologies
2. **Performance**: Create a fast, responsive site with excellent load times
3. **Maintainability**: Structure code and content to be easily updatable
4. **Accessibility**: Ensure the site works well for all users
5. **Content Flexibility**: Support blog posts and project showcases with markdown

## Technical Architecture

### Frontend Framework

I chose React with TypeScript for this project because:
- Strong typing helps prevent bugs and improves code quality
- Component-based architecture promotes reusability
- Large ecosystem and community support
- Excellent developer experience

### Build System

Vite was selected as the build tool due to its:
- Lightning-fast development server with HMR
- Optimized production builds
- Built-in TypeScript support
- Simple configuration

### UI Framework

Chakra UI provides:
- Accessible components out of the box
- Theming system with dark/light mode support
- Responsive design utilities
- Emotion-based styling with a component-first approach

### Content Management

For blog posts and project descriptions, I implemented a lightweight CMS using:
- Markdown files stored in the repository
- Front matter for metadata
- Remark for markdown processing
- Custom loaders to fetch and parse content

### Deployment

The site is deployed on Railway with:
- Express server for production
- Automatic deployments from GitHub
- Environment variable management
- Great performance at a reasonable cost

## Development Process

### Planning & Design

Before writing any code, I:
1. Sketched wireframes of key pages
2. Defined the site architecture and navigation
3. Selected the color scheme and typography
4. Identified required components and content types

### Implementation

The development followed these phases:
1. Set up the project structure with Vite and TypeScript
2. Implemented core UI components with Chakra UI
3. Created the routing system with React Router
4. Built the markdown parsing system for blog and project content
5. Developed responsive layouts for all screen sizes
6. Added dark/light mode theme support
7. Implemented testing with Jest and React Testing Library

### Testing & Optimization

To ensure quality, I:
- Wrote unit tests for utility functions and components
- Performed cross-browser testing
- Optimized images and assets for web
- Improved Lighthouse performance scores
- Ensured responsive design worked across devices

## Lessons Learned

This project provided valuable experience with:
- Structuring a React application in a maintainable way
- Working with TypeScript in a real-world project
- Balancing design aesthetics with performance
- Creating a seamless responsive experience
- Implementing a simple yet effective content management approach

## Future Enhancements

I plan to continue improving this site with:
- Integration with a headless CMS for easier content management
- Addition of interactive project demos
- Implementation of search functionality
- Performance optimizations for larger content collections
- Addition of analytics to track user engagement

## Conclusion

Building this portfolio site was a rewarding experience that allowed me to showcase both my design sensibilities and technical capabilities. The project serves as a living demonstration of my skills and will continue to evolve as I grow as a developer.