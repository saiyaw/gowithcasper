package controllers

import (
	"bufio"
	"log"
	"os"
	"os/exec"
	"strconv"
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

func checkError(err error) {
	if err != nil {
		log.Fatalf("Error: %s", err)
	}
}

func exeCommand(start int, end int, wg *sync.WaitGroup) {
	wd, _ := os.Getwd()
	cmdstr := wd + "/static/js/download.js --start=" + strconv.Itoa(start) + " --end=" + strconv.Itoa(end)
	beego.Debug(cmdstr)
	cmd := exec.Command("casperjs", cmdstr)
	stdout, err := cmd.StdoutPipe()
	checkError(err)
	scanner_out := bufio.NewScanner(stdout)
	go func() {
		for scanner_out.Scan() {
			beego.Debug(scanner_out.Text())
		}
	}()
	stderr, err := cmd.StderrPipe()
	checkError(err)
	scanner_err := bufio.NewScanner(stderr)
	go func() {
		for scanner_err.Scan() {
			beego.Debug(scanner_err.Text())
		}
	}()

	err = cmd.Start()
	checkError(err)

	defer cmd.Wait()

	// 	go io.Copy(os.Stdout, stdout)
	// 	go io.Copy(os.Stderr, stderr)
	wg.Done()
}

func (c *MainController) PostDownloadCommand() {
	wg := new(sync.WaitGroup)
	num := 8

	wg.Add(num)

	start := 1

	for i := 0; i < num; i++ {
		end := start + 100
		go exeCommand(start, end, wg)
		start = end
	}

	wg.Wait()

	c.Ctx.WriteString("ok")
}
