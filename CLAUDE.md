# CLAUDE.md - Portfolio Project Guidelines

## Build/Lint/Test Commands
- Development: `npm run dev` (Vite dev server)
- Build: `npm run build` (TypeScript compiler + Vite build)
- Lint: `npm run lint` (ESLint)
- Test: `npm run test` (Jest)
- Single test: `npx jest <path-to-test-file>` or `npx jest -t '<test-name>'`
- Production: `npm run start` (Express server)

## Code Style Guidelines
- Use TypeScript with strict typing and explicit return types
- Components: Functional components with React.FC type annotation
- Props: Define interfaces above components
- Imports: Absolute imports from `@/` pointing to `./src/`
- Naming: PascalCase for components/interfaces, camelCase for functions/variables
- Error handling: Try/catch blocks with specific error logging
- File organization: Feature-based folders (blog, portfolio, ui)
- Content: Support both .md and .mdx files in public directory
- CSS: Use Chakra UI components and styling system
- Testing: Jest with @testing-library/react, files in test directory