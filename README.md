# articleCyberTestWithGolang
Similar with the articleCyberTest but instead of using node js will use golang instead

ถึงพี่ตุลา ผมได้ลองใช้ framwork gin กับ gorm ตามที่พี่แนะนำมาครับ

*********Installation*****************
articleCyberTest/backend command : go get -d ./...
articleCyberTest/frontend command : yarn install

*การเปลี่ยนจาก js มา go ใช้database เดิมได้ไม่ส่งผลกระทบต่อ หน้าบ้านในเรื่อง decode ต่างๆสามารถ import database ตัวเดิมได้เลย แต่จะ เพิ่มของการ softdelete ตามลักษณะ ของ framework gorm*

import database dbname="article" สามารถ เอา database ผมไป import ได้ครับ จะอยู่ใน articleCyberTest/article.sql

*********Run*****************
articleCyberTest/backend command : CompileDaemon -command="./backend"  เป็นการrun แบบ save and run ไม่ต้องexit แล้วrun ใหม่(เหมือนตัว nodemon ใน js แต่เป็นของ Go)
articleCyberTest/frontend command : yarn dev
xampp: run Apache and MySQL

Front end on web (ถึงจะเปลี่ยนเป็น go จะไม่ส่งผลต่อผู้ใช้งานเก่าครับ)
login page ถ้าไม่สมัครสามารถใช้
email : mergeofficial@hotmail.com
password  : 1234Ss

************************************จากโจทย์******************************************
1. แยก Enviroment = 
- backend/initializers เป็นตัว 1.ตั้งค่าให้กับ middleware cors การ allow method PUT POST GET DELETE และอื่นๆ 2.พวกตัว load ขอมูลของ file env มาเรียกใช้งานผ่านหน้าอื่นร่วมกับ os. 3.การเชื่อมต่อกับ Database
-backend/controller เป็นตัวจัดเก็บ ctr ของการใช้งาน routes ต่างๆ  เป็นส่วนที่ทำงานตามความต้องการของการเรียกใช้ ข้อมูลผ่าน route และ res กลับไปเป็น json, cookie และอื่นๆ 
-backend/Routes เป็นตัวรับ จัดการ URL endpoints ตาม method Get,Post,Put,Delete
-backend/models ด้วย ภาษา go ผมเปลี่ยนตามลักษณะการใช้งานของแต่ละ schemes มีการ extend ของ การupdate ตาม id เลยต้องเพิ่มการ extend แบบ oop มาจะได้ไม่ต้องเขียนโครงซ้ำ กับ ตอน create
-backend/utils มี function ของ การ validation user และ Aritcle input, Verify JWT การเข้าใชเงาน that specfic end point 
-backend/.env เป็นตัวจัดเก็บ ตัวแปร  variables สำหรับ  environment, ที่สำคัญมันจะไม่สามารถมองเห็นได้ , ขั้นตอน deploy เราต้อง ไป set env เองใน hosting เช่น jwt authenticity , DB_HOST DB_PASSWORD 


///////////////////////////////////////////////////////////////////////////

2.ทำ CRUD = method คือตาม CRUD:post get put delete 
ในหน้า main ผมแยกไป 3 ส่วนเช่นเคยแต่แบบ go เป็นเป็นการ group routes (ไม่ได่ใช้ app.use) มีความต่างเพราะต้องสร้างตัว package ชื่อ routes

2.1 routes.SetupArticleRoutes(router.Group("/v1/api/article")) // router Group สำหรับ article
2.2 routes.SetupUserRoutes(router.Group("/v1/api/users")) // router Group สำหรับ users
2.3 routes.SetupAuthRoutes(router.Group("/v1/api/auth")) // router Group สำหรับ auth

อธิบาย path endpoint CRUD จากด้านบน
2.1 router Group สำหรับ article
ประกอบด้วย
		2.1.1 articleRoutes.GET("/search", controllers.GetSearchRelationArticleUser)  // สำหรับ หน้า home ใช้ในการ search realation data และ limit & pagination
		2.1.2 articleRoutes.GET("/view/:id", controllers.GetArticleById) // สำหรับ หน้า ดูข้อมูลของ article & user ของ specific article id
		2.1.3 articleRoutes.POST("/addView/:id", controllers.IncrementArticleView) // เป็นตัว เพิ่มยอดการเข้าดู
		2.1.4 articleRoutes.POST("/createArticle/:id", util.VerifyToken(), util.ValidateArticle, controllers.CreateArticle) // มีการ ตรวจสอบ token จากผู้ใช้งานที่ต้อง login เข้ามาก่อนถึงจะ สร้าง article ได้ + การ ValidateArticle การตรวจสอบ input
		2.1.5 articleRoutes.PUT("/updateArticle/:id", controllers.UpdateArticle) // update article
		2.1.6 articleRoutes.GET("/table", controllers.GetAllArticle) // เป็นข้อมูล แบบตารางตั้งหมด เฉพราะ article ไม่เกียวกับ user
		2.1.7 articleRoutes.GET("/getOnlyArticleById/:id", controllers.GetOnlyArticleByID) //เป็นข้อมูล แบบตารางแค่ specfic article ไม่เกียวกับ user 
		2.1.8 articleRoutes.DELETE("/deleteArticle/:id", controllers.DeleteArticle) // การลบ แบบ relation ใน ตาราง user_article

2.2 router Group สำหรับ users
ประกอบด้วยหลักๆ คือ
        2.2.1 userRoutes.GET("/", controllers.GetAllUser) // get ข้อมูล user ทั้งหมด
		2.2.2 userRoutes.POST("/register", util.ValidateUser, controllers.RegisterUser) // ทำการ สมัคร แต่มีการ Validate User input การ ตรวจสอบ email ซ้ำ email ที่ซ้ำกัน และ รหัส ชื่อ และอื่นให้ตรงตามเงินไข

2.3 router Group สำหรับ auth
เป็นตัว login ด้วยการ create jwt ผ่าน header ที่มีการ allow จาก initializer ด้วย middleware ที่กำหนด และส่งค่าเป็นเก็บใน cookie local storage 

///////////////////////////////////////////////////////////////////////////

3.แสดงข้อมูล = อันนี้ตัวอย่างที่แสดงแบบ Relation
จาก database จะมี 3 table 1.users 2.user_article 3.article โดย user_article จะจัดเก็บ usersId กับ articleId ไว้จะมีการแสดงได้ดัง page {Home} front-end โดย route ที่สามารถใช้ทำคือ 
1.articleRoutes.GET("/search", controllers.GetSearchRelationArticleUser) 2.articleRoutes.GET("/view/:id", controllers.GetArticleById)

///////////////////////////////////////////////////////////////////////////

4.แสดงรูป สามารถดูได้ที่ front end เลยครับ วิธีจัดเก็บรูปของผมจะใช้ api ของ cloudinary ในการจัดเก็บรูป บน cloud ทำการ save path ในdatabase และ เรียกใช้ ผ่าน link src

///////////////////////////////////////////////////////////////////////////

5.แสดงจำนวนผู้ชม articleRoutes.POST("/addView/:id", controllers.IncrementArticleView); ในหน้า front end ถ้ากด read more  จะเรียกใช้ axios path จะทำให้+ view ได้ และ แสดงจำนวน view ขอแต่ละอันเลยครับ

///////////////////////////////////////////////////////////////////////////

6.แสดงจำนวน pagination (เพิ่ม limit)
 จาก articleRoutes.GET("/search", controllers.GetSearchRelationArticleUser) 

 อธิบายการทำงาน เฉพราะ pagination
    //  เช่น search?search=s&page=1&limit=4 
    pageStr := c.Query("page")  // รับค่าที่ส่งมา ผ่าน Query page 
	limitStr := c.Query("limit")  // รับค่าที่ส่งมา ผ่าน Query limit 

	page, err := strconv.Atoi(pageStr) // check err if not nil or 0 จะ set ค่าเริ่มต้นเป็น 1
	if err != nil || page <= 0 {
		page = 1
	}

	limit, err := strconv.Atoi(limitStr) // check err if not nil or 0 จะ set ค่าเริ่มต้นเป็น 10
	if err != nil || limit <= 0 {
		limit = 10
	}

    ในกรณี search?search=&page=1&limit=4  จะได้ page 1 ที่ มี limit 4 ทำให้ page and limit ไม่เข้าเงื่อนไข set ค่าเริ่มต้น จาก โค้ด ด้านบน

    offset := (page - 1) * limit // ทำการ คำนวนหาค่า offset ใน sql ตามโคร้งสร้างแบบ array เราจะได้ 0 = (1-1)*4

    หลังจากนั้นก็ query 	Offset(offset).Limit(limit) จะทำให้ ได้ข้อมูล ก้อนแรกมา คือไอดีที่ 1-4

    แค่เรา ต้องคืนจำนวน data ตั้งหมดว่ามีกี่ object Select("COUNT(*)"). เพื่อให้ ไปทำ front end ในการ ออกแบบ เลขหน้าได้ถูกต้อง กับ ตัว page and limit 


///////////////////////////////////////////////////////////////////////////

7.HTTP STATUS status มีการเพิ่ม เรื่อง internal server 500 มาเพื่อบอกถึงก็ขอผิดพลาดจากการ map function ของ relation data

///////////////////////////////////////////////////////////////////////////

8.Response json
ทุกอย่าง res.json หมดครับ เนื่องด้วยใช้ gin.JSON res และหน้าบ้านไม่ได้รับผลกระทบอะไร

///////////////////////////////////////////////////////////////////////////

อธิบายสิ่งที่ทำ จากที่เป็นใน code นั้นผมได้มีการ เปลี่ยนจาก js มา เป็น go แต่ ทุกอย่างสามารถใช้งานได้เหมือนเดิมใน frontend รวมไปถึง jwt verfiy ,validation และ การ res




////////// start from 0
ติดตั้งตัว go dev download
dir ของเรา code จะอยู่ใน dir ของ path user/go/

1.สร้าง folder backend open git bash terminal : go mod init golang-crud-gin 
2.ติดตั้งตัว save compile เหมือนกับตัว nodemon แต่เป็นของ Go : go get github.com/githubnemo/CompileDaemon // มันจะมาอยู่ใน  File go.mod เป็นเหมือนตัว package json
3.ทำการinstall ตัว  go.mod: go install github.com/githubnemo/CompileDaemon // เหมือนๆกับ npm install
4.ติดตั้ง ตัว godotenv  เพื่อให้งานต่อ การใช้งานง่ายขึ้นของ ตัว variable :go get github.com/joho/godotenv
5.ติดตั้ง $ go get -u github.com/gin-gonic/gin // framwork ของ gin
6.ติดตั้งตัวของ gorm เป็นlibary สำหรับ golang :go get -u gorm.io/gorm
7.ติดตั้ง: go get -u gorm.io/driver/mysql //สำหรับ mySql 

////////////////////////
สร้าง file main.go

วิธี run แบบ nodemon go :  CompileDaemon -command="./backend" //ถ้าหาไม่เจอ ไปแก้ moduleให้ตรงกับ dir เช่นของผม CyberTestWithGolang/articleCyberTestWithGolang/backend





