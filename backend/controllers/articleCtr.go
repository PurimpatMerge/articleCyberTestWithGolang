package controllers

import (
	"github.com/gin-gonic/gin"
)

func GetSearchRelationArticleUser(c *gin.Context) {

	page := "page"

	c.JSON(200, page)
}
