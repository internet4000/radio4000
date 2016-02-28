/* jshint undef: false */

var BrowserWindow = require('browser-window');
var app = require('app');
var mainWindow = null;

app.on('window-all-closed', function onWindowAllClosed() {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('ready', function onReady() {
	mainWindow = new BrowserWindow({
		'width': 1000,
		'height': 700,
		'min-width': 320,
		'min-height': 400,
		'resizable': true,
		'toolbar': true,
		'frame': true
	});

	delete mainWindow.module;

	if (process.env.EMBER_ENV === 'test') {
		mainWindow.loadUrl('file://' + __dirname + '/index.html');
	} else {
		mainWindow.loadUrl('file://' + __dirname + '/dist/index.html');
	}

	mainWindow.on('closed', function onClosed() {
		mainWindow = null;
	});
});

/* jshint undef: true */
