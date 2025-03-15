package main

import (
	"context"
	"encoding/json"
	"os"
	"bytes"
	"io"
	"fmt"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// ContactForm represents the expected form data
type ContactForm struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

// sendEmail is a placeholder function for email sending logic
func sendEmail(form ContactForm) error {
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

// Lambda handler function
func Handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var form ContactForm

	// Read and log raw request body
	bodyBytes := []byte(request.Body)
	fmt.Println("Raw request body:", string(bodyBytes))

	// Parse JSON request body
	if err := json.Unmarshal(bodyBytes, &form); err != nil {
		fmt.Println("JSON parsing error:", err)
		return events.APIGatewayProxyResponse{StatusCode: http.StatusBadRequest, Body: `{"error":"Invalid request"}`}, nil
	}

	// Validate required fields
	if form.Name == "" || form.Email == "" || form.Message == "" {
		fmt.Println("Missing required fields")
		return events.APIGatewayProxyResponse{StatusCode: http.StatusBadRequest, Body: `{"error":"Missing required fields"}`}, nil
	}

	// Log the received form data
	fmt.Printf("Received form submission: %+v\n", form)

	// Send email
	if err := sendEmail(form); err != nil {
		fmt.Println("Email sending error:", err)
		return events.APIGatewayProxyResponse{StatusCode: http.StatusInternalServerError, Body: `{"error":"Failed to send email"}`}, nil
	}

	// Return success response
	return events.APIGatewayProxyResponse{StatusCode: http.StatusOK, Body: `{"message":"Form submitted and email sent successfully"}`}, nil
}

// Entry point for AWS Lambda
func main() {
	lambda.Start(Handler)
}