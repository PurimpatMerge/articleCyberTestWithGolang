package initializers

import (
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	var err error
	dbHost := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbDatabase := os.Getenv("DB_DATABASE")

	// Build the connection string
	dsn := dbUser + ":@tcp(" + dbHost + ")/" + dbDatabase + "?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}

	// Test the connection
	sqlDB, err := DB.DB()
	if err != nil {
		panic("Failed to get database connection")
	}
	err = sqlDB.Ping()
	if err != nil {
		panic("Failed to ping database")
	}

	log.Println("Connected to the database")
}
