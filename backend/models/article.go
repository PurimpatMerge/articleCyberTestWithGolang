package models

import (
	"time"

	"gorm.io/gorm"
)

type Article struct {
	gorm.Model
	Title       string    `json:"title" gorm:"column:title"`
	Content     string    `json:"content" gorm:"column:content"`
	Author      string    `json:"author" gorm:"column:author"`
	Category    string    `json:"category" gorm:"column:category"`
	Tags        string    `json:"tags" gorm:"column:tags"`
	Image       string    `json:"image" gorm:"column:image"`
	ViewsCount  string    `json:"viewsCount" gorm:"column:viewsCount"`
	LikesCount  string    `json:"likesCount" gorm:"column:likesCount"`
	CreatedAt   time.Time `json:"createdAt" gorm:"column:created_at"`
	UpdatedAt   time.Time `json:"updatedAt" gorm:"column:updatedAt"`
	PublishedAt time.Time `json:"publishedAt" gorm:"column:publishedAt"`
}
type ExtendedArticle struct {
	Article
	ID uint `gorm:"primaryKey" json:"id"`
}

func NewArticle(title, content, author string) *Article {
	return &Article{
		Title:   title,
		Content: content,
		Author:  author,
	}
}

func (a *Article) TableName() string {
	return "articles"
}
