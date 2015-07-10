'use strict';
var app = require('app');
var BrowserWindow = require('browser-window');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

function createMainWindow() {
	// see https://github.com/atom/electron/blob/master/docs/api/browser-window.md
	var win = new BrowserWindow({
		width: 800,
		height: 700,
		'min-width': 320,
		'min-height': 400,
		resizable: true,
		toolbar: true,
		frame: true
	});

	// Either load up whatever is in the dist folder
	win.loadUrl('file://' + __dirname + '/index.html');

	// or load the real app, online
	// win.loadUrl('http://radio4000.com');

	win.on('closed', onClosed);

	return win;
}

function onClosed() {
	// deref the window
	// for multiple windows store them in an array
	mainWindow = null;
}

// prevent window being GC'd
var mainWindow;

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', function() {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', function() {
	mainWindow = createMainWindow();
});
