package main

import (
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/initializers"
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/routes"
	"os"

	"github.com/gin-gonic/gin" //framework for dns api route path endpoint res req json
)

func init() {
	initializers.LoadEnv()   // load env port 8000
	initializers.ConnectDB() // load connect to DB
}

func main() {
	router := gin.Default()

	router.Use(initializers.CorsMiddleware())

	// Set up article routes
	routes.SetupArticleRoutes(router.Group("/v1/api/article"))
	routes.SetupUserRoutes(router.Group("/v1/api/users"))
	routes.SetupAuthRoutes(router.Group("/v1/api/auth"))

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
