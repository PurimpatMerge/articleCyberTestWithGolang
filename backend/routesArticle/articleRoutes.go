package routesArticle

import (
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/controllersArticle"

	"github.com/gin-gonic/gin"
)

func SetupArticleRoutes(router *gin.RouterGroup) {
	articleRoutes := router
	{
		articleRoutes.GET("/search", controllersArticle.GetSearchRelationArticleUser)
		articleRoutes.GET("/view/:id", controllersArticle.GetArticleById)
	}
}
