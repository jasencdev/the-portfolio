const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'dist' directory (Vite's production build)
app.use(express.static(path.join(__dirname, "dist")));

// Handle SPA routing (for React/Vue/Routing frameworks)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
