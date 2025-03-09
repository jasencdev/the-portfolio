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
- **Frontend Testing**: 
  - Run tests: `cd app && npm test`
  - Watch mode: `cd app && npm run test:watch`
  - Uses Vitest + Vue Test Utils for component testing
  - Test files should be named `*.test.ts` next to the component

- **Backend Testing**:
  - Run tests: `go test -v`
  - Uses standard Go testing package with Testify assertions
  - Test files should be named `*_test.go`

## Type Safety
- Use TypeScript types for all functions, variables, and components
- Avoid `any` type, prefer explicit typing

## Environment Variables
- Backend uses godotenv to load variables from .env file
- Required variables:
  - `RESEND_API_KEY` - API key for Resend email service