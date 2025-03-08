# THE-PORTFOLIO - DEVELOPMENT GUIDE

## Build Commands
- Frontend Dev: `npm run docs:dev` - Start VitePress development server
- Frontend Build: `npm run docs:build` - Build static site
- Frontend Preview: `npm run docs:preview` - Preview built site
- Backend Build: `go build -o server main.go` - Build Go server
- Backend Run: `./server` - Run server (localhost:8080)

## Project Structure
- Frontend: VitePress/Vue in `app/` directory
- Backend: Go/Gin server in root that serves built VitePress site

## Code Style Guidelines
- **TypeScript/Vue**: 2-space indentation, single quotes, type annotations
- **Go**: Standard Go formatting (gofmt), Gin framework conventions
- **Imports**: Group by external/internal, alphabetize
- **Naming**: camelCase for JS variables/functions, PascalCase for components
- **Error Handling**: Defensive coding with fallbacks in frontend, standard Gin error handling in backend

## Testing
- No formal testing setup, consider adding Jest/Vitest for frontend

## Type Safety
- Use TypeScript types for all functions, variables, and components
- Avoid `any` type, prefer explicit typing