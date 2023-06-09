package util

import (
	"net/http"
	"strings"

	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func VerifyToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")

		// Check if tokenString starts with "Bearer "
		if tokenString != "" && len(tokenString) > 7 && strings.HasPrefix(tokenString, "Bearer ") {
			// Extract the token from the string
			tokenString = tokenString[7:]
		} else {
			// Token not found in the header, check the cookie
			cookie, err := c.Cookie("accessToken")
			if err == nil {
				tokenString = cookie
			}
		}

		// log.Fatal(tokenString)
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "You are not authenticated!", "status": http.StatusUnauthorized})
			c.Abort()
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT")), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Token is not valid!", "status": http.StatusUnauthorized})
			c.Abort()
			return
		}

		c.Next()
	}
}
