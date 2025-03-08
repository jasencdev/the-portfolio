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

```bash
cd dev
mkdir the-portfolio
cd the-portfolio
touch README.md
git init
```