package util

import (
	"log"
	"regexp"
	"strings"
	"unicode"

	"github.com/gin-gonic/gin"
)

type FormData struct {
	FName     string   `json:"fname"`
	LName     string   `json:"lname"`
	Username  string   `json:"username"`
	UEmail    string   `json:"uemail"`
	UPassword string   `json:"upassword"`
	UPicture  []string `json:"upicture"`
}

func Validate(c *gin.Context) {
	var formData FormData

	// Bind the JSON data from the request body to the formData struct
	if err := c.ShouldBindJSON(&formData); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request payload"})
		c.Abort()
		return
	}

	// Validate the request body
	validationErrors := []string{}

	if len(formData.Username) < 5 {
		validationErrors = append(validationErrors, "Username should be at least 5 characters long")
	}

	if len(formData.UPassword) < 5 {
		validationErrors = append(validationErrors, "Password should be at least 5 characters long")
	}

	if !containsCapitalLetter(formData.UPassword) {
		validationErrors = append(validationErrors, "Password should contain at least one capital letter")
	}

	if !isValidEmail(formData.UEmail) {
		validationErrors = append(validationErrors, "Invalid email address")
	}

	LogValidationErrors(validationErrors)

	if len(validationErrors) > 0 {
		c.JSON(400, gin.H{"errors": validationErrors})
		c.Abort()
		return
	}

	// Store the formData in the context for access in the controller
	c.Set("formData", formData)

	c.Next()
}

func containsCapitalLetter(password string) bool {
	for _, char := range password {
		if unicode.IsUpper(char) {
			return true
		}
	}
	return false
}

func isValidEmail(email string) bool {
	email = strings.TrimSpace(email)
	emailPattern := `\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b`
	match, _ := regexp.MatchString(emailPattern, email)
	return match
}

func LogValidationErrors(validationErrors []string) {
	if len(validationErrors) > 0 {
		log.Println("Validation failed:")
		for _, err := range validationErrors {
			log.Println("-", err)
		}
	}
}
