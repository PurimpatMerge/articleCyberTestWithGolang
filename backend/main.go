package main

import (
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/initializers"
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/routesArticle"
	"os"

	// เป็นการimport ที่เรียกใช้ในการ print in console มา

	"github.com/gin-gonic/gin" //framework for dns api route path endpoint
)

func init() {
	initializers.LoadEnv()   // load env port 8000
	initializers.ConnectDB() // load env port 8000
}

func main() {
	router := gin.Default()

	router.Use(initializers.CorsMiddleware())

	// Set up article routes
	routesArticle.SetupArticleRoutes(router.Group("/v1/api/article"))

	//basic starter before sperate the env
	// router.GET("/v1/api/article/search", func(c *gin.Context) {
	// 	fmt.Println("working on main")
	// 	c.JSON(200, gin.H{
	// 		"message": "pong",
	// 	})
	// })
	PORT := os.Getenv("PORT")
	router.Run(":" + PORT) // listen and serve on 0.0.0.0:8080
}
