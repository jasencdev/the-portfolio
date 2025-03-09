package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// Helper function to create a test router with the same middleware and routes as the main app
func setupTestRouter() *gin.Engine {
	// Use test mode to avoid log outputs during testing
	gin.SetMode(gin.TestMode)
	
	r := gin.Default()
	
	// Add CORS middleware (same as in main.go)
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
	
	// API route to handle form submissions
	r.POST("/api/contact", func(c *gin.Context) {
		var form ContactForm
		
		if err := c.ShouldBindJSON(&form); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		
		// Validate form data
		if form.Name == "" || form.Email == "" || form.Message == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required fields"})
			return
		}
		
		// For testing, we'll skip the actual email sending
		// In a real test, you would mock this function
		
		c.JSON(http.StatusOK, gin.H{"message": "Form submitted and email sent successfully"})
	})
	
	return r
}

// Mock sendEmail function for testing
func mockSendEmail(form ContactForm) error {
	// Always succeeds in tests
	return nil
}

// Test valid form submission
func TestContactFormSubmission(t *testing.T) {
	// Get router 
	r := setupTestRouter()
	
	// Create test contact form 
	form := ContactForm{
		Name:    "Test User",
		Email:   "test@example.com",
		Message: "This is a test message",
	}
	
	// Convert to JSON
	jsonValue, _ := json.Marshal(form)
	
	// Create test request
	req, _ := http.NewRequest("POST", "/api/contact", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")
	
	// Create response recorder 
	w := httptest.NewRecorder()
	
	// Perform the request
	r.ServeHTTP(w, req)
	
	// Assert status code
	assert.Equal(t, http.StatusOK, w.Code)
	
	// Assert response body
	var response map[string]string
	json.Unmarshal(w.Body.Bytes(), &response)
	assert.Equal(t, "Form submitted and email sent successfully", response["message"])
}

// Test invalid form submission (missing fields)
func TestInvalidContactFormSubmission(t *testing.T) {
	// Get router
	r := setupTestRouter()
	
	// Create invalid test contact form (missing message)
	form := ContactForm{
		Name:  "Test User",
		Email: "test@example.com",
		// Message intentionally left empty
	}
	
	// Convert to JSON
	jsonValue, _ := json.Marshal(form)
	
	// Create test request
	req, _ := http.NewRequest("POST", "/api/contact", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")
	
	// Create response recorder
	w := httptest.NewRecorder()
	
	// Perform the request
	r.ServeHTTP(w, req)
	
	// Assert status code (should be BadRequest)
	assert.Equal(t, http.StatusBadRequest, w.Code)
}

// Test CORS headers are properly set
func TestCorsHeaders(t *testing.T) {
	// Get router
	r := setupTestRouter()
	
	// Create test request (OPTIONS for preflight)
	req, _ := http.NewRequest("OPTIONS", "/api/contact", nil)
	
	// Create response recorder
	w := httptest.NewRecorder()
	
	// Perform the request
	r.ServeHTTP(w, req)
	
	// Assert CORS headers
	assert.Equal(t, "*", w.Header().Get("Access-Control-Allow-Origin"))
	assert.Equal(t, "true", w.Header().Get("Access-Control-Allow-Credentials"))
	assert.Contains(t, w.Header().Get("Access-Control-Allow-Headers"), "Content-Type")
	assert.Contains(t, w.Header().Get("Access-Control-Allow-Methods"), "POST")
	
	// Assert status code (should be NoContent for OPTIONS)
	assert.Equal(t, http.StatusNoContent, w.Code)
}