package routes

import (
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/controllers"
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/util"

	"github.com/gin-gonic/gin"
)

func SetupUserRoutes(router *gin.RouterGroup) {
	userRoutes := router
	{
		userRoutes.GET("/", controllers.GetAllUser)
		userRoutes.POST("/register", util.Validate, controllers.RegisterUser)
	}
}
