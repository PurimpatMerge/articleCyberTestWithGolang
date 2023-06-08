package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FName     string    `json:"fname" gorm:"column:fname"`
	LName     string    `json:"lname" gorm:"column:lname"`
	Username  string    `json:"username" gorm:"column:username"`
	UEmail    string    `json:"uemail" gorm:"column:uemail"`
	UPassword string    `json:"upassword" gorm:"column:upassword"`
	UPicture  string    `json:"upicture" gorm:"column:upicture"`
	UpdatedAt time.Time `json:"updatedAt" gorm:"column:updatedAt"`
}

func NewUser(fname, lname, username, uemail, upassword, upicture string) *User {
	return &User{
		FName:     fname,
		LName:     lname,
		Username:  username,
		UEmail:    uemail,
		UPassword: upassword,
		UPicture:  upicture,
		UpdatedAt: time.Now(),
	}
}

func (u *User) TableName() string {
	return "users"
}
