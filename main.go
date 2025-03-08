package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
    // Explicitly set the Gin mode to release
	gin.SetMode(gin.ReleaseMode)
		
	// Create a Gin router
    r := gin.Default()

    // Serve static files from the "dist" folder (VitePress output)
    r.Static("/", "app/.vitepress/dist/")

    // Run the server on port 8080
    r.Run()
}