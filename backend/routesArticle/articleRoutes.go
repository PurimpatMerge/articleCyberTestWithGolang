package routesArticle

import (
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupArticleRoutes(router *gin.RouterGroup) {
	articleRoutes := router
	{
		articleRoutes.GET("/search", controllers.GetSearchRelationArticleUser)
		articleRoutes.GET("/view/:id", controllers.GetArticleById)
		articleRoutes.POST("/addView/:id", controllers.IncrementArticleView)
		articleRoutes.POST("/createArticle/:id", controllers.CreateArticle)
		articleRoutes.PUT("/updateArticle/:id", controllers.UpdateArticle)
		articleRoutes.GET("/table", controllers.GetAllArticle)
		articleRoutes.GET("/getOnlyArticleById/:id", controllers.GetOnlyArticleByID)
		articleRoutes.DELETE("/deleteArticle/:id", controllers.DeleteArticle)
	}
}
