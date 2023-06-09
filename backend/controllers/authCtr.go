package controllers

import (
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/initializers"
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/models"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Login(c *gin.Context) {
	var requestBody struct {
		UEmail    string `json:"uemail"`
		UPassword string `json:"password"`
	}

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request payload"})
		return
	}

	// Check if the user exists
	var user models.User
	if err := initializers.DB.Where("uemail = ?", requestBody.UEmail).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			// User not found
			c.JSON(404, gin.H{"error": "User not found"})
		} else {
			// An error occurred while querying the database
			c.JSON(500, gin.H{"error": "Failed to retrieve user"})
		}
		return
	}

	// Compare the password with the hashed password
	if err := bcrypt.CompareHashAndPassword([]byte(user.UPassword), []byte(requestBody.UPassword)); err != nil {
		// Invalid password
		c.JSON(401, gin.H{"error": "Invalid password"})
		return
	}

	// Password is correct, generate a token
	token, err := generateToken(user.UserID)
	if err != nil {
		// Error generating token
		c.JSON(500, gin.H{"error": "Failed to generate token"})
		return
	}

	// Set the token as a cookie
	c.SetCookie("accessToken", token, 3600, "/", "", false, true)

	// Return the token and user ID in the response
	c.JSON(200, gin.H{"message": "Login successful", "accessToken": token, "userid": user.UserID})
}

// GenerateToken generates a JWT token for the given user ID
func generateToken(userID uint) (string, error) {
	JWT := os.Getenv("JWT")

	// Create the claims
	claims := jwt.MapClaims{
		"userId": userID,
		"exp":    time.Now().Add(time.Hour).Unix(), // Token expiration time
	}

	// Create the token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign the token with the JWT secret
	signedToken, err := token.SignedString([]byte(JWT))
	if err != nil {
		return "", err
	}

	return signedToken, nil
}
