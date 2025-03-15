package main

import (
	"context"
	"encoding/json"
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
	// Replace this with actual email sending logic (SMTP, SendGrid, Postmark, etc.)
	fmt.Printf("Sending email to: %s\nMessage: %s\n", form.Email, form.Message)
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