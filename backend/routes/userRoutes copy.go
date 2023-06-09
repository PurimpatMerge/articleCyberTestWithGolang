package routes

import (
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupUserRoutes(router *gin.RouterGroup) {
	userRoutes := router
	{
		userRoutes.GET("/", controllers.GetAllUser)
		userRoutes.POST("/register", controllers.RegisterUser)
	}
}
