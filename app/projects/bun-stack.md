---
title: "Bun-Stack: Building a Rails-Inspired Fullstack Generator for the Bun Ecosystem"
date: 2025-07-02
---

# Bun-Stack: Building a Rails-Inspired Fullstack Generator for the Bun Ecosystem

## Overview

This project is a fullstack application generator that brings Rails-like productivity to the Bun runtime. Leveraging Bun's blazing-fast performance and built-in tooling, the generator creates production-ready applications with authentication, database integration, and testing infrastructure in under 30 seconds.

## Live Link
[Bun Stack!](https://bun-stack.jasenc.dev/)

## Architecture

### Generator Architecture
- **Template System**: Single-file CLI with embedded template literals for zero-dependency generation
- **Project Structure**: Opinionated file organization following Rails conventions with modern JavaScript patterns
- **Build Pipeline**: Utilizes Bun's native bundler and hot reload capabilities for instant feedback

### Application Architecture
- **Backend Service**: Bun.serve() with file-based routing and middleware composition
- **Frontend**: React 18 with TypeScript, React Router, and Tailwind CSS
- **Database Layer**: Drizzle ORM with dual PostgreSQL/SQLite support

## Technologies Used
- **Runtime**: 
  - Bun 1.0+ for JavaScript/TypeScript execution
  - Native Bun APIs for password hashing, file operations, and testing
- **Backend**: 
  - File-based routing with TypeScript
  - JWT authentication with CSRF protection
  - Drizzle ORM for type-safe database queries
- **Frontend**: 
  - React 18 with Suspense and Error Boundaries
  - React Query for server state management
  - Tailwind CSS for utility-first styling
- **DevOps**: 
  - Docker with Bun's official image
  - GitHub Actions for CI/CD
  - Railway/Fly.io deployment support

## Features
- **Zero-Config Setup**: 
  - Automatic Bun installation detection
  - Database auto-configuration with fallback
  - Pre-configured linting and formatting
- **Authentication System**: 
  - JWT-based authentication with secure defaults
  - CSRF protection using double-submit cookies
  - Protected route middleware
- **Developer Experience**: 
  - Hot reload with sub-millisecond refresh
  - End-to-end type safety
  - Integration testing with real HTTP requests
- **Security Features**: 
  - Content Security Policy headers
  - Input validation with Zod
  - SQL injection protection via parameterized queries

## Development Process

### Motivation and Evolution
This project emerged from the gap between Rails' productivity and modern JavaScript tooling:
- Started as an exploration of Bun's capabilities for fullstack development
- Evolved from a simple boilerplate to a comprehensive generator
- Implemented Rails-inspired conventions while embracing JavaScript ecosystem strengths

### Architecture Decisions
- **Bun.serve() over Express**: Leveraged native performance without framework overhead
- **File-based Routing over Controllers**: Simplified API structure with intuitive organization
- **Repository Pattern**: Abstracted database operations for testability and flexibility
- **Single-file CLI**: Eliminated installation dependencies for instant project creation

### Workflow
1. Template design with escape sequences for nested template literals
2. Middleware composition system for request processing pipeline
3. Dual database support implementation with automatic detection
4. Integration testing strategy without mocks or stubs
5. Security layer implementation with modern best practices

### Key Advantages
- 10x faster installation compared to npm-based generators
- Near-instant hot reload improving developer iteration speed
- Type safety from database to frontend components
- Production-ready security without configuration

## Implementation Details

### Template Generation
The generator uses a unique approach to handle template literals within templates:

```typescript
// Template file content with escaped backticks
const serverTemplate = `
import { serve } from "bun";

const PORT = process.env.PORT || 3000;

serve({
  port: PORT,
  fetch: async (req) => {
    return new Response(\`Hello from Bun at \${new Date().toISOString()}\`);
  }
});
`;

// Write template to project
await Bun.write(path.join(projectPath, "src/server/index.ts"), serverTemplate);
```

### Middleware Architecture
Request processing follows a composable middleware pattern:

```typescript
type Middleware = (req: Request, next: () => Promise<Response>) => Promise<Response>;

function compose(...middlewares: Middleware[]) {
  return async (req: Request) => {
    let index = -1;
    
    async function dispatch(i: number): Promise<Response> {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;
      
      const middleware = middlewares[i];
      if (!middleware) return new Response("Not Found", { status: 404 });
      
      return middleware(req, () => dispatch(i + 1));
    }
    
    return dispatch(0);
  };
}
```

## Deployment

The generated applications are containerized with minimal overhead:

```dockerfile
FROM oven/bun:1
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

COPY . .
RUN bun run build:css

EXPOSE 3000
CMD ["bun", "src/server/index.ts"]
```

Deployment is streamlined for modern platforms with automatic database URL detection and environment-based configuration.

## Lessons Learned

Throughout this project, I gained valuable insights:
- **Bun's Maturity**: The runtime proved production-ready with excellent stability and performance
- **Testing Complexity**: Real integration tests without mocks revealed edge cases early
- **Template Escaping**: Managing template literals within templates required creative solutions
- **Security Balance**: Implementing security without sacrificing developer experience was challenging but achievable

## Future Improvements

Planned enhancements include:
- WebSocket support for real-time features
- GraphQL option alongside REST APIs
- Admin panel generator for CRUD operations
- Background job queue with Bun's Worker API
- API documentation generation with OpenAPI
- Built-in observability with OpenTelemetry