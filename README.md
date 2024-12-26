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
