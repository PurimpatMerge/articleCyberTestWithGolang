package models

type UserArticle struct {
	ID        uint   `gorm:"primaryKey"`
	UserID    string `gorm:"column:userId"`
	ArticleID uint   `gorm:"column:articleId"`
}
