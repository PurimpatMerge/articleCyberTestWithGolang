package main

import (
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/initializers"
	"fmt" // เป็นการimport ที่เรียกใช้ในการ print in console มา

	"github.com/gin-gonic/gin" //framework for dns api route path endpoint
)

func init() {
	initializers.LoadEnv()   // load env port 8000
	initializers.ConnectDB() // load env port 8000
}

func main() {
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		fmt.Println("working on main")
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080
}
