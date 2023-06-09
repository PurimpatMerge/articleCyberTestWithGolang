package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	UserID    uint           `json:"userid" gorm:"primaryKey;column:userid"`
	FName     string         `json:"fname" gorm:"column:fname"`
	LName     string         `json:"lname" gorm:"column:lname"`
	Username  string         `json:"username" gorm:"column:username"`
	UEmail    string         `json:"uemail" gorm:"column:uemail"`
	UPassword string         `json:"upassword" gorm:"column:upassword"`
	UPicture  string         `json:"upicture" gorm:"column:upicture"`
	CreatedAt time.Time      `json:"created_at" gorm:"column:created_at"`
	UpdatedAt time.Time      `json:"updated_at" gorm:"column:updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"column:deleted_at"`
}

func NewUser(fname, lname, username, uemail, upassword, upicture string) *User {
	return &User{
		FName:     fname,
		LName:     lname,
		Username:  username,
		UEmail:    uemail,
		UPassword: upassword,
		UPicture:  upicture,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}

func (u *User) TableName() string {
	return "users"
}
