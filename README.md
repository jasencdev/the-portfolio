# The Portfolio

This is the personal portfolio and landing page for [jasenc.dev](https://www.jasenc.dev/). It's built with modern web technologies and designed to be easily customizable.

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: Chakra UI
- **Routing**: React Router
- **Content Management**: Markdown files processed with remark
- **Styling**: Emotion (via Chakra UI)
- **Icons**: React Icons
- **Testing**: Jest with React Testing Library
- **Deployment**: Express server (compatible with Railway)

## 📋 Features

- Responsive design that works on all device sizes
- Dark/light mode support
- Blog section with markdown support
- Portfolio/projects showcase
- Contact form integration
- Fast page loads with client-side routing
- SEO friendly structure

## 🛠️ Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/the-portfolio.git
   cd the-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📂 Project Structure

```
/
├── public/            # Static files and content
│   ├── img/           # Images
│   ├── posts/         # Markdown blog posts
│   └── projects/      # Markdown project descriptions
├── src/
│   ├── assets/        # Logo and other assets
│   ├── components/    # React components
│   │   ├── about/     # About section components
│   │   ├── blog/      # Blog section components
│   │   ├── main/      # Main page components
│   │   ├── portfolio/ # Portfolio section components
│   │   └── ui/        # Reusable UI components
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
└── test/              # Test files
```

## 🔧 Available Scripts

- `npm run dev` - Starts the Vite development server
- `npm run build` - Builds the app for production (TypeScript compile + Vite build)
- `npm run lint` - Runs ESLint to check code quality
- `npm run test` - Runs Jest tests
- `npm run preview` - Previews the production build locally
- `npm run start` - Starts the Express server for production

## 📝 Content Management

### Blog Posts

Add new blog posts by creating markdown files in the `public/posts/` directory. Each file should include front matter:

```markdown
---
title: My Blog Post Title
date: 2025-01-01
description: A brief description of the post
image: /img/my-image.jpg
---

Content goes here...
```

### Projects

Add new projects by creating markdown files in the `public/projects/` directory with similar front matter:

```markdown
---
title: Project Title
description: Project description
image: /img/project-image.jpg
tags: [React, TypeScript, Chakra UI]
---

Project details go here...
```

## 🎨 Customization

- Update personal information and site content by editing the markdown files
- Modify theme settings in `src/components/ui/provider.tsx`
- Add new components as needed in the appropriate directories

## 🚢 Deployment

This project includes a simple Express server for production:

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm run start
   ```

The server will run on port 3000 by default, or use the PORT environment variable.

### Deployment with Railway

This site is ready to deploy on Railway:
1. Create a new project on Railway
2. Connect your GitHub repository
3. Railway will automatically detect and use the build and start commands

## 📃 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgements

- Chakra UI for the component library
- Vite for the blazing fast build tool
- React community for the amazing ecosystem