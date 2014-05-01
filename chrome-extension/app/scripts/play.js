/* jshint unused:false */
/*global $:false */

'use strict';

/**
 * Play
 *
 * @author Stefan Sinnwell <steve@kopfwelt.com>
 * @copyright Copyright (c) 2014, KOPFWELT GmbH
 */
var Play = function() {

	this.init();

};

Play.prototype = {

	sounds: [],

	init: function() {
		this.inject();
		this.fetch();
		this._listen();
	},

	inject: function() {
		chrome.windows.getCurrent(function(currentWindow) {
			chrome.tabs.query({
				active: true,
				windowId: currentWindow.id
			}, function(activeTabs) {
				chrome.tabs.executeScript(activeTabs[0].id, {
					file: 'scripts/crawler.js',
					allFrames: true
				});
			});
		});
	},

	fetch: function() {
		chrome.extension.onRequest.addListener(this.onFetch.bind(this));
	},

	onFetch: function(sounds) {
		this.sounds = sounds;
		this.notify();
	},

	notify: function() {
		var count = this.sounds.length + '';
		chrome.browserAction.setBadgeText({
			text: count
		});
	},

	save: function() {
		// for (var i = 0; i < visiblesounds.length; ++i) {
		//   if (document.getElementById('check' + i).checked) {
		//     chrome.downloads.download({url: visiblesounds[i]},
		//                                            function(id) {
		//     });
		//   }
		// }

		var playlistData;

		for (var i = 0; i < this.sounds.length; i++) {
			
			playlistData = {
				'Playlist': {
					'id': 1
				},
				'Sound': {
					'key': this.sounds[i].key,
					'type': this.sounds[i].type
				}
			};


			$.ajax({
				type: 'put',
				dataType: 'json',
				data: playlistData,
				url: 'http://play.kopfwelt.com/playlists/add.json',
				// error: function() {
				// 	// window.close();
				// },
				// success: function(response){
				// 	// console.log(response);
				// }
			});

			// window.close();
		}
	},

	_listen: function() {
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if (request.action === 'save') {
				this.save();
			}
		}.bind(this));
	}

};

var play = new Play();
play.fetch();