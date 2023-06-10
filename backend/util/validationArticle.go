package util

import (
	"log"

	"github.com/gin-gonic/gin"
)

type FormDataArticle struct {
	Title    string   `json:"title"`
	Content  string   `json:"content"`
	Author   string   `json:"author"`
	Category string   `json:"category"`
	Tags     []string `json:"tags"`
	Image    []string `json:"image"`
}

func ValidateArticle(c *gin.Context) {
	var formData FormDataArticle

	// Bind the JSON data from the request body to the formData struct
	if err := c.ShouldBindJSON(&formData); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request payload"})
		c.Abort()
		return
	}

	// Validate the request body
	validationErrors := []string{}

	if len(formData.Title) < 1 {
		validationErrors = append(validationErrors, "This Title input needs to be required")
	}

	if len(formData.Content) < 1 {
		validationErrors = append(validationErrors, "This Content input needs to be required")
	}

	if len(formData.Author) < 1 {
		validationErrors = append(validationErrors, "This Author input needs to be required")
	}

	if len(formData.Category) < 1 {
		validationErrors = append(validationErrors, "This Category input needs to be required")
	}

	if len(formData.Tags) < 1 {
		validationErrors = append(validationErrors, "This Tags input needs to be required")
	} else {
		// Check if Tags contains an empty string
		for _, tag := range formData.Tags {
			if tag == "" {
				validationErrors = append(validationErrors, "This Tags input needs to be required")
				break
			}
		}
	}

	if len(formData.Image) < 1 {
		validationErrors = append(validationErrors, "This Image input needs to be required")
	}

	LogValidationErrorsArticle(validationErrors)

	if len(validationErrors) > 0 {
		c.JSON(400, gin.H{"errors": validationErrors})
		c.Abort()
		return
	}

	// Store the formData in the context for access in the controller
	c.Set("formData", formData)

	c.Next()
}

func LogValidationErrorsArticle(validationErrors []string) {
	if len(validationErrors) > 0 {
		log.Println("Validation failed:")
		for _, err := range validationErrors {
			log.Println("-", err)
		}
	}
}
