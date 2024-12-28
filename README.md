# the-portfolio

The portfolio will be written in full stack JavaScript. It will leverage TypeScript, React,
and Chakra UI for the client, with Express and Supabase for the server-side. It will
not use Docker. It will not have much of an API, if any. It will be hosted using Netlify.

User authentication will be required to advance beyond the landing page. Beyond the
landing page will be an app playground, where functional apps are demoed.

## in the beginning

Createa a directory, `mkdir`, named accordingly, in the folder that has your repos.

``` bash
npm create vite@latest
```

Select `React` and `TypeScript` when prompted.

This is going to be a single page application so we do not want to use the React Router,
or we would need Node to host the `index.js` that is produced upon build.

- Installed [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

`npm install eslint-plugin-react`

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

- Replaced `tseslint.configs.recommended` with `tseslint.configs.strictTypeChecked`

- Ran `npm run dev` and started server.

## inital deploy

Initially deployed [Vite + React starter page to Netlify](https://grand-cactus-e94c23.netlify.app/).

CI/CD is complete with Netflify and GitHub repo integration. Pushes to main will deploy app.

## development branch

`git checkout -b development`

## let's start developing

### installation of chakra

```bash
npm i @chakra-ui/react @emotion/react
npx @chakra-ui/cli snippet add
```

Update `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Added the provider to `main.tsx`. 

Setup Vite config paths `npm i -D vite-tsconfig-paths`

### install react router dom

`npm install react-router-dom`

and add this to app.js:

`import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';`

## That was fun

But when times get tough, it's time to work on the README.

## Issues

- Portfolio site is not generating the right links.
- Portfolio site is still relying on `data-portfolio.ts`
- i'm not sure if `string-utils.ts` is being used.
- i need to refactor
- need to fix the capitalization in the routes
- that weird ref on an SVG error

## Keeping Track of Dependencies & Their Why

```json
{
  "name": "the-portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "test": "jest",
    "preview": "vite preview"
  },
  "dependencies": {
    "@chakra-ui/react": 
    "@emotion/react": 
    "@emotion/styled": 
    "buffer": 
    "eslint-plugin-react": 
    "framer-motion": 
    "gray-matter": 
    "next-themes": 
    "react": 
    "react-dom": 
    "react-icons": 
    "react-router-dom": 
    "remark": 
    "remark-gfm": 
    "remark-html": 
    "remark-parse": 
  },
  "devDependencies": {
    "@babel/preset-env": 
    "@babel/preset-react": 
    "@babel/preset-typescript": 
    "@eslint/js": 
    "@testing-library/jest-dom": 
    "@testing-library/react": 
    "@types/jest": 
    "@types/react": 
    "@types/react-dom":
    "@vitejs/plugin-react": 
    "babel-jest": 
    "eslint": 
    "eslint-plugin-react-hooks": 
    "eslint-plugin-react-refresh": 
    "globals": 
    "jest": 
    "jest-environment-jsdom": 
    "ts-jest": 
    "typescript": 
    "typescript-eslint": 
    "vite": 
    "vite-tsconfig-paths": 
  }
}
```

## What’s Next

Apparently writing at the bottom of the screen. 

## 1. Type Safety

- Create shared interfaces for common types like `Post` and `Frontmatter` in a separate types file instead of duplicating them in multiple components.
- Add proper type definitions for all component props.
- Consider using `zod` for runtime type validation of MDX frontmatter.

## 2. Code Organization

- Move MDX loading logic into a shared utility function to avoid duplication between `BlogPostLoader` and `ProjectPostLoader`.
- Create a constants file for shared configuration like file paths.
- Consider organizing components into feature-based folders rather than just UI/pages.

## 3. Performance

- Implement proper loading states using Chakra UI's `Skeleton` components.
- Add error boundaries for better error handling.
- Consider implementing pagination for blog/portfolio lists.
- Memoize expensive computations with `useMemo` and `useCallback`.

## 4. Testing

- Add more unit tests beyond the basic string utils.
- Add integration tests for MDX loading functionality.
- Consider adding E2E tests with Cypress/Playwright.

## 5. DX Improvements

```typescript
// src/utils/mdx.ts
export async function loadMDXContent(directory: string, filePath: string) {
  const mdxFiles = import.meta.glob<string>(`/public/${directory}/*.mdx`, {
    as: 'raw',
    eager: false,
  });
  // ... shared loading logic
}
```

## 6. SEO & Accessibility

- Add proper meta tags for SEO.
- Ensure proper heading hierarchy.
- Add proper ARIA labels and roles.
- Add proper alt text for images.

## 7. Error Handling

- Add proper error boundaries.
- Improve error messages and logging.
- Add proper fallback UI for error states.
