package routers

import (
	"github.com/astaxie/beego"
	"github.com/saiyawang/gowithcasper/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/login", &controllers.MainController{}, "POST:PostLoginCommand")
	beego.Router("/download", &controllers.MainController{}, "POST:PostDownloadCommand")
}
