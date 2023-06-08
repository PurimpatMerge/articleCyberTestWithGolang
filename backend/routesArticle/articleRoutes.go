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
		articleRoutes.POST("/addView/:id", controllersArticle.IncrementArticleView)
		articleRoutes.POST("/createArticle/:id", controllersArticle.CreateArticle)
		articleRoutes.PUT("/updateArticle/:id", controllersArticle.UpdateArticle)
		articleRoutes.GET("/table", controllersArticle.GetAllArticle)
		articleRoutes.GET("/getOnlyArticleById/:id", controllersArticle.GetOnlyArticleByID)
		articleRoutes.DELETE("/deleteArticle/:id", controllersArticle.DeleteArticle)
	}
}
