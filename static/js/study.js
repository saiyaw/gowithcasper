phantom.outputEncoding = "GBK";

var casper = new require('casper').create({
	clientScripts: [
		'jquery.js'
	],
	verbose: true,
	//	colorizerType: 'Dummy',
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

function saveimage(filename) {
	casper.capture(resourceDirectory + filename + '.png');
}

casper.start('http://10.243.119.113/covidien', function() {
	this.echo(this.getTitle());
	this.echo('start');
	if (this.exists('#edit-name')) {
		casper.log("find the input box for enter the user name.", "debug");
		casper.echo("find the input box for enter the user name.", "GREEN_BAR");
		this.sendKeys('#edit-name', 'admin');
		saveimage('1_enter_username');
	}
	if (this.exists('#edit-pass-clear')) {
		casper.echo("find the input box for enter the password.", "GREEN_BAR");
		this.sendKeys('#edit-pass-clear', 'admin123');
		this.capture(resourceDirectory + '2_enter_password.png');
	}
	if (this.exists('#edit-submit')) {
		casper.echo('find the sumbit button for login.', "GREEN_BAR");
		this.click('#edit-submit');
		casper.echo('click the login button', 'GREEN_BAR');
	}
	this.wait(2000, function() {
		this.echo('login the site, turn to the home page.', "INFO_BAR");
		this.capture(resourceDirectory + '3_home_page.png');
	});
});

var user_list_page = "http://10.243.119.113/covidien/covidien/admin/users/list";
casper.thenOpen(user_list_page, function() {
	this.echo('then turn to user list page', "INFO");


	casper.echo('an informative message, should be in green', 'INFO');

});

casper.then(function() {
	this.echo('then 2');
	casper.echo("enter the second then...", 'ERROR');

});

casper.then(function() {
	this.echo('then 3');

});

casper.then(function() {
	this.echo('then 4');

});

casper.thenOpen('http://10.243.119.113/covidien/user', function() {
	casper.echo('then open', 'INFO');
	casper.capture(resourceDirectory + '4_user_list.png');
})

casper.run();