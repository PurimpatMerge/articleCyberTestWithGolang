package routes

import (
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupAuthRoutes(router *gin.RouterGroup) {
	authRoutes := router
	{
		authRoutes.POST("/login", controllers.Login)
	}
}
