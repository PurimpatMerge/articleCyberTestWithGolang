package controllers

import (
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/initializers"
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/models"
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/util"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func GetAllUser(c *gin.Context) {
	var users []models.User

	result := initializers.DB.Find(&users)
	if result.Error != nil {
		// Handle the database query error with a 500 status code
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}

	// Return the users as a JSON response
	c.JSON(200, gin.H{"users": users})
}

func RegisterUser(c *gin.Context) {
	// log.Println("Request Body:")

	// Get the formData from the context
	formData, exists := c.Get("formData")
	if !exists {
		c.JSON(400, gin.H{"error": "Invalid request payload"})
		return
	}

	// Type assertion to convert formData to util.FormData
	requestBody, ok := formData.(util.FormDataUser)
	if !ok {
		c.JSON(400, gin.H{"error": "Invalid request payload"})
		return
	}

	log.Println("requestBody:", requestBody)
	log.Println("2")

	// Check if email already exists
	var existingUser models.User
	if err := initializers.DB.Where("uemail = ?", requestBody.UEmail).First(&existingUser).Error; err == nil {
		// Email already exists
		c.JSON(409, gin.H{"error": "This Email already exists."})
		return
	}

	log.Println("3")
	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(requestBody.UPassword), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to hash password"})
		return
	}

	log.Println("4")
	// Create a new user instance
	newUser := models.NewUser(
		requestBody.FName,
		requestBody.LName,
		requestBody.Username,
		requestBody.UEmail,
		string(hashedPassword),
		requestBody.UPicture[0],
	)
	newUser.CreatedAt = time.Now()
	newUser.UpdatedAt = time.Now()

	log.Println("5")
	// Save the new user to the database
	if err := initializers.DB.Create(&newUser).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(201, gin.H{"message": "Registration successful.", "results": newUser})
}
