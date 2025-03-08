import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory (Vite's production build)
app.use(express.static(path.join(__dirname, ".vitepress/dist")));

// Handle SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, ".vitepress/dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});