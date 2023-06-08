// util/relation_data_mapper.go

package util

type RelationData struct {
	User        map[string]interface{}
	UserArticle map[string]interface{}
	Article     map[string]interface{}
}

func GetRelationData(results []map[string]interface{}) ([]*RelationData, error) {
	relationData := make([]*RelationData, len(results))
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

		relationData[i] = &RelationData{
			User:        user,
			UserArticle: userArticle,
			Article:     article,
		}
	}

	return relationData, nil
}
