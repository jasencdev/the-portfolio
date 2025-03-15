package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/netlify/functions-go"
)

// ContactForm represents the expected form data
type ContactForm struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

// sendEmail is a placeholder function for email sending logic
func sendEmail(form ContactForm) error {
	// Replace this with actual email sending logic (SMTP, SendGrid, Postmark, etc.)
	fmt.Printf("Sending email to: %s\nMessage: %s\n", form.Email, form.Message)
	return nil
}

// Handler function for Netlify's serverless execution
func Handler(ctx context.Context, req functions.Request) (functions.Response, error) {
	var form ContactForm

	// Read and log raw request body
	bodyBytes := req.Body
	fmt.Println("Raw request body:", string(bodyBytes))

	// Parse JSON request body
	if err := json.Unmarshal(bodyBytes, &form); err != nil {
		fmt.Println("JSON parsing error:", err)
		return functions.NewJSONResponse(http.StatusBadRequest, gin.H{"error": "Invalid request"}), nil
	}

	// Validate required fields
	if form.Name == "" || form.Email == "" || form.Message == "" {
		fmt.Println("Missing required fields")
		return functions.NewJSONResponse(http.StatusBadRequest, gin.H{"error": "Missing required fields"}), nil
	}

	// Log the received form data
	fmt.Printf("Received form submission: %+v\n", form)

	// Send email
	if err := sendEmail(form); err != nil {
		fmt.Println("Email sending error:", err)
		return functions.NewJSONResponse(http.StatusInternalServerError, gin.H{"error": "Failed to send email"}), nil
	}

	// Return success response
	return functions.NewJSONResponse(http.StatusOK, gin.H{"message": "Form submitted and email sent successfully"}), nil
}

// Entry point for Netlify
func main() {
	functions.Serve(Handler)
}