package controllers

import (
	"os"
	"os/exec"

	"github.com/astaxie/beego"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	c.TplNames = "index.tpl"
	//	c.Ctx.WriteString("hello....")
}

func (c *MainController) PostLoginCommand() {

	wd, _ := os.Getwd()
	beego.Debug(wd)

	scrapeCmd := exec.Command("casperjs", wd+"/static/js/login.js")
	scrape, err := scrapeCmd.Output()
	if err != nil {
		panic(err)
	}
	c.Ctx.WriteString(string(scrape))
}
