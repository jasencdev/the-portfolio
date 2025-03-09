# The Portfolio

This is Version 2.0 using `VitePress` and `Vue` for the front end. I grew tired of maintaining a
Chakra UI app and not being able to use certain formatting tools because of the CSS resets. This
might have been something with my particular app, but I ran out of desire to troubleshoot. Version
1.0 was growing bulky and the more I used it, the more I'd get distracted by things I wanted to fix
rather than focusing on the content, material, and knowledge gain.

The backend will be hosted using Go's `Gin` because of it's built-in static serving. I evaluated the
use of Python's `Starlette` framework, whichs seems great and all, but in this app I won't need
the bundled features that come along with `Starlette`. This is quickly turning into a blog post so
let's get started.

## Overview

This portfolio site combines a VitePress-based frontend with a Go/Gin backend that serves the static site. It features:

- Fast, SEO-friendly static site generation
- Markdown-based content management
- TypeScript support
- Contact form with email functionality
- Modern responsive design
- Blog and project showcase sections

## Requirements

- Node.js (v16+)
- npm or yarn
- Go (v1.16+)
- Git

## Getting Started

From your `home` directory, make a `dev` directory or some other directory for building apps.

```bash
cd dev
mkdir the-portfolio
cd the-portfolio
touch README.md
git init
```

## Installing VitePress

If you don't already have VitePress on your computer, you'll need to run the following command.
But if you have already, you won't need to again.

```bash
npm add -D vitepress
```

Now that you're in the directory for the project, and you have VitePress installed, run the next
command.

```bash
npx vitepress init
```

Here I'll walk you through what options I chose. Choose the current directory, make a site name,
site description, and chose Default Theme + Customization, use TypeScript and Add VitePress npm
scripts to package.json.

```bash
Tips:
- Make sure to add .vitepress/dist and .vitepress/cache to your .gitignore file.
- Since you've chosen to customize the theme, you should also explicitly install vue as a dev dependency.
```

Let's work through those tips above.

```bash
nano .gitignore
```

```nano
*.vitepress/cache
*.vitepress/dist
node_modules*
package-lock.json
```

And hit ctrl+x to save the file. Then we'll install `Vue`.

```bash
npm install vue
```

Finally, we'll build the VitePress site.

```bash
npm run docs:build
```

## Installing Gin

You'll need to install `Go` first using the website and package managers. Then run this in the repo.

```bash
go mod init the-portfolio
```

I'm going straight for Gin.

```bash
go get github.com/gin-gonic/gin
nano main.go
```

```nano
package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    // Create a Gin router
    r := gin.Default()

    // Serve static files from the "dist" folder (VitePress output)
    r.Static("/", "app/.vitepress/dist/")

    // Run the server on port 8080
    r.Run(":8080")
}
```

Let's comile the Go program

```bash
go build -o server main.go
```

Then we'll run the server

```bash
./server
```

And the VitePress site should be available at `localhost:8080`.

## Development Workflow

### Frontend Development

1. Navigate to the app directory:
   ```bash
   cd app
   ```

2. Start the VitePress development server:
   ```bash
   npm run docs:dev
   ```
   
   This will start a dev server at `localhost:5173` with hot-reload.

3. Make changes to the Markdown files in the `app/` directory to update content.

4. To add new blog posts, create Markdown files in the `app/posts/` directory.

5. To add new projects, create Markdown files in the `app/projects/` directory.

### Backend Development

1. Make changes to `main.go` to modify the server behavior.

2. Rebuild the Go server:
   ```bash
   go build -o server main.go
   ```

3. Run the server:
   ```bash
   ./server
   ```

## Building for Production

1. Build the VitePress site:
   ```bash
   cd app
   npm run docs:build
   ```

2. Build the Go server:
   ```bash
   go build -o server main.go
   ```

3. The compiled server binary and the static site content can be deployed together.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
RESEND_API_KEY=your_resend_api_key
```

This is used for the contact form email functionality.

## Testing

### Frontend Tests
```bash
cd app
npm test
```

### Backend Tests
```bash
go test -v
```

## Docker Deployment

A Dockerfile is included for easy deployment:

```bash
docker build -t the-portfolio .
docker run -p 8080:8080 -e RESEND_API_KEY=your_key the-portfolio
```

## Project Structure

- `app/` - VitePress frontend
  - `posts/` - Blog post markdown files
  - `projects/` - Project showcase markdown files
  - `.vitepress/` - VitePress configuration
- `main.go` - Go/Gin backend server
- `main_test.go` - Backend tests

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
