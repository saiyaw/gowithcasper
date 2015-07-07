phantom.outputEncoding = "GBK";
var casper = new require('casper').create({
	verbose: true
});
var utils = require('utils');
var fs = require('fs');
var resourceDirectory = "capture/";

// fs.removeTree(resourceDirectory);

var user = casper.cli.get("user") || "saiyan.wang@hotmail.com";
var password = casper.cli.get("password") || "wang123456";

var login_url = casper.cli.get("login") || "http://lbtoo.com/";
var home_url = casper.cli.get("home") || "http://lbtoo.com/resume/search2";

function saveimage(filename) {
	casper.capture(resourceDirectory + filename + '.png');
}

casper.start(login_url, function() {
	if (this.exists('input.GlzDengLuName')) {
		this.sendKeys('input.GlzDengLuName', user);
	} else {
		saveimage("Failed_enter_user");
	}

	if (this.exists('input.GlzDengLuName.GlzDengLuName1')) {
		this.sendKeys('input.GlzDengLuName.GlzDengLuName1', password);
	} else {
		saveimage("Failed_enter_password");
	}

	if (this.exists('#login_bt')) {
		this.click('#login_bt');
	} else {
		saveimage("Failed_submit_login");
	}
});

casper.then(function() {
	this.wait(1000, function() {
		if (this.getCurrentUrl() == home_url) {
			this.echo("ok");
		} else {
			this.echo('failed');
			saveimage("Failed_login");
		}
	})

});

casper.run();