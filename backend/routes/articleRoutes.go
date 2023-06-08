package routes

import (
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupArticleRoutes(router *gin.RouterGroup) {
	articleRoutes := router
	{
		articleRoutes.GET("/search", controllers.GetSearchRelationArticleUser)
	}
}
