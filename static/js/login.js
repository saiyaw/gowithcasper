phantom.outputEncoding = "GBK";
var casper = new require('casper').create({
	verbose: true,
//	logLevel: "debug",
	viewportSize: {
		width: 1920,
		height: 1200
	}
});
var utils = require('utils');
var fs = require('fs');
var resourceDirectory = "d:/capture/";

fs.removeTree(resourceDirectory);

var user = casper.cli.get(0) || "admin";
var password = casper.cli.get(1) || "admin123";

function saveimage(filename) {
	casper.capture(resourceDirectory + filename + '.png');
}

casper.start('http://10.243.119.113/covidien', function() {
	if (this.exists('#edit-name')) {
		this.sendKeys('#edit-name', user);
	}
	if (this.exists('#edit-pass-clear')) {
		this.sendKeys('#edit-pass-clear', password);
	}
	if (this.exists('#edit-submit')) {
		this.click('#edit-submit');
	}
	saveimage("1_login");
});

casper.then(function() {
	this.wait(1000, function() {
		if (this.getElementAttribute('.home_service', 'class') == "home_service") {
			this.echo('ok');
		} else {
			this.echo('failed');
		}
		saveimage("2_home");
	})

});

casper.run();