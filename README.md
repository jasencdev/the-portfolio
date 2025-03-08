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
    r.Static("/", ".vitepress/dist/")

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
