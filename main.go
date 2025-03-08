package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    // Create a Gin router
    r := gin.Default()

    // Serve static files from the "dist" folder (VitePress output)
    r.Static("/", ".vitepress/dist/")

    // Run the server on port 8080
    r.Run(":8080")
}