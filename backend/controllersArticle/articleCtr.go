package controllersArticle

import (
	"log"
	"strconv"
	"strings"
	"time"

	"CyberTestWithGolang/articleCyberTestWithGolang/backend/initializers"
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/models"
	"CyberTestWithGolang/articleCyberTestWithGolang/backend/util"

	"github.com/gin-gonic/gin"
)

// get all the Home page data (relation)
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

// get the specfic read more (relation)
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

	relationData, err := util.GetRelationData(results)
	if err != nil {
		// Handle the error when getting relation data
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}

	c.JSON(200, gin.H{"relationData": relationData})
}

// view counter
func IncrementArticleView(c *gin.Context) {
	articleId := c.Param("id")

	updateViewsQuery := `
		UPDATE articles SET viewsCount = IFNULL(viewsCount, 0) + 1 WHERE id = ?`
	if err := initializers.DB.Exec(updateViewsQuery, articleId).Error; err != nil {
		// Handle the database query error with a 500 status code
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}

	affectedRows := initializers.DB.RowsAffected
	if affectedRows == 0 {
		// Article not found
		c.JSON(404, gin.H{"error": "Article not found"})
		return
	}

	c.JSON(200, gin.H{"message": "Article view count incremented successfully."})
}

// create (relation)
func CreateArticle(c *gin.Context) {
	userId := c.Param("id") // Extract the userId from the URL params

	var body struct {
		Title    string   `json:"title"`
		Content  string   `json:"content"`
		Author   string   `json:"author"`
		Category string   `json:"category"`
		Tags     []string `json:"tags"`
		Image    string   `json:"image"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		// Handle the error if the JSON binding fails
		c.JSON(400, gin.H{"error": "Invalid request payload"})
		return
	}

	now := time.Now() // Current timestamp

	article := models.Article{
		Title:       body.Title,
		Content:     body.Content,
		Author:      body.Author,
		Category:    body.Category,
		Tags:        strings.Join(body.Tags, ", "),
		Image:       body.Image,
		ViewsCount:  "0",
		LikesCount:  "0",
		CreatedAt:   now,
		UpdatedAt:   now,
		PublishedAt: now,
	}

	err := initializers.DB.Create(&article).Error
	if err != nil {
		// Handle the database error
		log.Printf("Error creating article: %s", err.Error())
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}

	// Create user_articles entry
	userArticle := models.UserArticle{
		UserID:    userId,
		ArticleID: article.ID,
	}

	err = initializers.DB.Create(&userArticle).Error
	if err != nil {
		// Handle the database error
		log.Printf("Error creating user_article entry: %s", err.Error())
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}

	// Log the userId, article, and userArticle data
	log.Printf("userId: %s, article: %+v, userArticle: %+v", userId, article, userArticle)

	// Return the response
	c.JSON(201, gin.H{"message": "Article created successfully"})
}

// update
func UpdateArticle(c *gin.Context) {
	articleID := c.Param("id") // Extract the articleID from the URL params

	var body struct {
		Title       string    `json:"title"`
		Content     string    `json:"content"`
		Author      string    `json:"author"`
		Category    string    `json:"category"`
		Tags        []string  `json:"tags"`
		Image       string    `json:"image"`
		ViewsCount  string    `json:"viewsCount"`
		LikesCount  string    `json:"likesCount"`
		PublishedAt time.Time `json:"publishedAt"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		// Handle the error if the JSON binding fails
		c.JSON(400, gin.H{"error": "Invalid request payload"})
		return
	}

	// Build the update object with only the changed fields
	updateObj := make(map[string]interface{})
	if body.Title != "" {
		updateObj["title"] = body.Title
	}
	if body.Content != "" {
		updateObj["content"] = body.Content
	}
	if body.Author != "" {
		updateObj["author"] = body.Author
	}
	if body.Category != "" {
		updateObj["category"] = body.Category
	}
	if len(body.Tags) > 0 {
		updateObj["tags"] = strings.Join(body.Tags, ", ")
	}
	if body.Image != "" {
		updateObj["image"] = body.Image
	}
	if body.ViewsCount != "" {
		updateObj["viewsCount"] = body.ViewsCount
	}
	if body.LikesCount != "" {
		updateObj["likesCount"] = body.LikesCount
	}
	if !body.PublishedAt.IsZero() {
		updateObj["publishedAt"] = body.PublishedAt
	}
	updateObj["updatedAt"] = time.Now()

	// Perform the update operation in the database
	result := initializers.DB.Model(&models.ExtendedArticle{}).Where("id = ?", articleID).Updates(updateObj)
	if result.Error != nil {
		// Handle the database error
		log.Printf("Error updating article: %s", result.Error.Error())
		c.JSON(500, gin.H{"error": "Internal Server Error"})
		return
	}
	if result.RowsAffected == 0 {
		// No rows were affected, indicating the article doesn't exist
		c.JSON(404, gin.H{"error": "Article not found"})
		return
	}

	// Return the updated article
	updatedArticle := models.ExtendedArticle{}
	result.First(&updatedArticle, articleID)
	c.JSON(200, gin.H{"message": "Article updated successfully", "article": updatedArticle})
}
