package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
	"net/http"
	"os"
    "io"
	"bytes"
)

// Struct for handling form data
type ContactForm struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func sendEmail(form ContactForm) error {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	resendAPIKey := os.Getenv("RESEND_API_KEY")
	if resendAPIKey == "" {
		return fmt.Errorf("Resend API key is missing")
	}

	// Format the email body to include name, email, and message
	emailBody := fmt.Sprintf("Name: %s\nEmail: %s\n\nMessage:\n%s", form.Name, form.Email, form.Message)

	email := map[string]interface{}{
		"from": "contact@jasenc.dev", // Sender's email
		"to":   "jasen.c7@gmail.com", // Recipient email
		"subject": "New Contact Form Submission",
		"text": emailBody, // Formatted email body
	}

	emailJSON, _ := json.Marshal(email)
	req, err := http.NewRequest("POST", "https://api.resend.com/emails", bytes.NewBuffer(emailJSON))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+resendAPIKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Read the response body
	body, _ := io.ReadAll(resp.Body)

	// Log Resend response for debugging
	fmt.Println("Resend Response:", string(body))

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("Resend error: %d - %s", resp.StatusCode, body)
	}

	return nil
}

func main() {
	// Explicitly set the Gin mode to release
	// gin.SetMode(gin.ReleaseMode)

	// Create a Gin router
	r := gin.Default()
	
	// Add CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Serve static files from the "dist" folder (VitePress output)
	r.Static("/", "app/.vitepress/dist/")

	// API route to handle form submissions
    r.POST("/api/contact", func(c *gin.Context) {
        var form ContactForm
        
        // Read the raw body for debugging
        bodyBytes, _ := io.ReadAll(c.Request.Body)
        c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
        
        // Log the raw request body
        fmt.Println("Raw request body:", string(bodyBytes))
        
        if err := c.ShouldBindJSON(&form); err != nil {
            fmt.Println("JSON binding error:", err)
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
            return
        }
    
        // Log the received form data
        fmt.Printf("Received form submission: %+v\n", form)
    
        // Send email notification
        if err := sendEmail(form); err != nil {
            fmt.Println("Email sending error:", err)
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email"})
            return
        }
    
        // Respond with success message
        c.JSON(http.StatusOK, gin.H{"message": "Form submitted and email sent successfully"})
    })

	// Run the server on port 8080
	r.Run()
}