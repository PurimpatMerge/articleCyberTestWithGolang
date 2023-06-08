package controllersArticle

import (
	"strconv"

	"CyberTestWithGolang/articleCyberTestWithGolang/backend/initializers"

	"github.com/gin-gonic/gin"
)

func GetSearchRelationArticleUser(c *gin.Context) {
	search := c.Query("search")
	pageStr := c.Query("page")
	limitStr := c.Query("limit")

	page, err := strconv.Atoi(pageStr)
	if err != nil || page <= 0 {
		page = 1
	}

	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 {
		limit = 10
	}

	offset := (page - 1) * limit

	// Build the query with joins and conditions
	query := initializers.DB.Table("users").
		Select("users.*, user_articles.*, articles.*").
		Joins("JOIN user_articles ON users.userid = user_articles.userId").
		Joins("JOIN articles ON user_articles.articleId = articles.id").
		Offset(offset).
		Limit(limit)

	countQuery := initializers.DB.Table("users").
		Select("COUNT(*)").
		Joins("JOIN user_articles ON users.userid = user_articles.userId").
		Joins("JOIN articles ON user_articles.articleId = articles.id")

	if search != "" {
		searchQuery := "%" + search + "%"

		query = query.Where("users.username LIKE ? OR articles.title LIKE ? OR articles.content LIKE ? OR articles.author LIKE ? OR articles.publishedAt LIKE ? OR articles.category LIKE ? OR users.fname LIKE ? OR users.lname LIKE ?",
			searchQuery, searchQuery, searchQuery, searchQuery, searchQuery, searchQuery, searchQuery, searchQuery)

		countQuery = countQuery.Where("users.username LIKE ? OR articles.title LIKE ? OR articles.content LIKE ? OR articles.author LIKE ? OR articles.publishedAt LIKE ? OR articles.category LIKE ? OR users.fname LIKE ? OR users.lname LIKE ?",
			searchQuery, searchQuery, searchQuery, searchQuery, searchQuery, searchQuery, searchQuery, searchQuery)
	}

	// Execute the query
	var results []map[string]interface{}
	if err := query.Find(&results).Error; err != nil {
		// Handle the database query error with a 500 status code
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}

	// Execute the count query
	var totalCount int64
	if err := countQuery.Count(&totalCount).Error; err != nil {
		// Handle the count query error with a 500 status code
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}

	// Return the response
	c.JSON(200, gin.H{
		"results":    results,
		"totalCount": totalCount,
	})
}

func GetArticleById(c *gin.Context) {
	articleId := c.Param("id")

	query := `SELECT *
	FROM users
	JOIN user_articles ON users.userid = user_articles.userId
	JOIN articles ON user_articles.articleId = articles.id
	WHERE articles.id = ` + articleId

	var results []map[string]interface{}
	if err := initializers.DB.Raw(query).Scan(&results).Error; err != nil {
		// Handle the database query error with a 500 status code
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}

	if len(results) == 0 {
		// Article not found
		c.JSON(404, gin.H{"message": "Article not found"})
		return
	}

	relationData := make([]*map[string]interface{}, len(results))
	for i, result := range results {
		user := map[string]interface{}{
			"fname":    result["fname"],
			"lname":    result["lname"],
			"username": result["username"],
			"uemail":   result["uemail"],
			"userId":   result["userId"],
			"upicture": result["upicture"],
			"updateAt": result["updateAt"],
		}

		userArticle := map[string]interface{}{
			"id":        result["userArticleId"],
			"userId":    result["userId"],
			"articleId": result["articleId"],
		}

		article := map[string]interface{}{
			"id":          result["articleId"],
			"title":       result["title"],
			"content":     result["content"],
			"author":      result["author"],
			"publishedAt": result["publishedAt"],
			"updatedAt":   result["updatedAt"],
			"category":    result["category"],
			"tags":        result["tags"],
			"image":       result["image"],
			"viewsCount":  result["viewsCount"],
			"likesCount":  result["likesCount"],
		}

		relationData[i] = &map[string]interface{}{
			"user":        user,
			"userArticle": userArticle,
			"article":     article,
		}
	}

	c.JSON(200, gin.H{"relationData": relationData})
}
