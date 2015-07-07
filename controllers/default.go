package controllers

import (
	"os"
	"os/exec"
	"sync"

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

func exeCommand(start string, end string, wg *sync.WaitGroup) {
	wd, _ := os.Getwd()
	cmd := wd + "/static/js/download.js --start=" + start + " --end=" + end
	beego.Debug(cmd)
	scrapeCmd := exec.Command("casperjs", cmd)
	scrape, err := scrapeCmd.Output()
	beego.Debug(scrape)
	if err != nil {
		panic(err)
	}
	wg.Done()
}

func (c *MainController) PostDownloadCommand() {
	wg := new(sync.WaitGroup)
	wg.Add(8)
	go exeCommand("101", "200", wg)
	go exeCommand("201", "300", wg)
	go exeCommand("301", "400", wg)
	go exeCommand("401", "500", wg)
	go exeCommand("501", "600", wg)
	go exeCommand("601", "700", wg)
	go exeCommand("701", "800", wg)
	go exeCommand("801", "900", wg)

	wg.Wait()

	c.Ctx.WriteString("ok")
}
