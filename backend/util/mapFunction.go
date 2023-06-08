// util/relation_data_mapper.go

package util

type user struct {
	Fname    string `json:"fname"`
	Lname    string `json:"lname"`
	Username string `json:"username"`
	Uemail   string `json:"uemail"`
	UserID   int    `json:"userId"`
	Upicture string `json:"upicture"`
	UpdateAt string `json:"updateAt"`
}

type userArticle struct {
	ID        int `json:"id"`
	UserID    int `json:"userId"`
	ArticleID int `json:"articleId"`
}

type article struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Content     string `json:"content"`
	Author      string `json:"author"`
	PublishedAt string `json:"publishedAt"`
	UpdatedAt   string `json:"updatedAt"`
	Category    string `json:"category"`
	Tags        string `json:"tags"`
	Image       string `json:"image"`
	ViewsCount  int    `json:"viewsCount"`
	LikesCount  int    `json:"likesCount"`
}

type RelationData struct {
	User        user        `json:"user"`
	UserArticle userArticle `json:"userArticle"`
	Article     article     `json:"article"`
}

func MapRelationData(row map[string]interface{}) RelationData {
	return RelationData{
		User: user{
			Fname:    row["fname"].(string),
			Lname:    row["lname"].(string),
			Username: row["username"].(string),
			Uemail:   row["uemail"].(string),
			UserID:   row["userId"].(int),
			Upicture: row["upicture"].(string),
			UpdateAt: row["updateAt"].(string),
		},
		UserArticle: userArticle{
			ID:        row["userArticleId"].(int),
			UserID:    row["userId"].(int),
			ArticleID: row["articleId"].(int),
		},
		Article: article{
			ID:          row["articleId"].(int),
			Title:       row["title"].(string),
			Content:     row["content"].(string),
			Author:      row["author"].(string),
			PublishedAt: row["publishedAt"].(string),
			UpdatedAt:   row["updatedAt"].(string),
			Category:    row["category"].(string),
			Tags:        row["tags"].(string),
			Image:       row["image"].(string),
			ViewsCount:  row["viewsCount"].(int),
			LikesCount:  row["likesCount"].(int),
		},
	}
}
