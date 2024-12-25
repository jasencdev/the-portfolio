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
