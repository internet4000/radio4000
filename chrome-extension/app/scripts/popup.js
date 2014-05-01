/* jshint unused:false */

'use strict';

/**
 * Play
 *
 * @author Stefan Sinnwell <steve@kopfwelt.com>
 * @copyright Copyright (c) 2014, KOPFWELT GmbH
 */
var Popup = function() {

	this.init();

};

Popup.prototype = {

	init: function() {
		document.getElementById('save').onclick = this.save;
	},

	save: function() {
		chrome.runtime.sendMessage({action: 'save'}, function(response) {});
	}
};


window.onload = function() {
	var popup = new Popup();
};