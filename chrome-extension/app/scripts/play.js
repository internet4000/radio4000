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
	},

	inject: function() {
		chrome.windows.getCurrent(function (currentWindow) {
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
		chrome.browserAction.setBadgeText({text: count});
	},

	save: function() {
		// for (var i = 0; i < visiblesounds.length; ++i) {
		//   if (document.getElementById('check' + i).checked) {
		//     chrome.downloads.download({url: visiblesounds[i]},
		//                                            function(id) {
		//     });
		//   }
		// }

		var playlistData = {
			'Playlist': {
				'id': 1
			},
			'Sound': {
				'title': 'Aubrey Plaza flips off reporter',
				'key': 'NOrOgeHJeVE',
				'type': 'youtube'
			}
		};
		// $.ajax({
		// 	type: 'put',
		// 	dataType: 'json',
		// 	data: playlistData,
		// 	url: 'http://plist.com/playlists/add.json',
		// 	error: function() {
		// 		window.close();
		// 	},
		// 	success: function(response){
		// 		console.log(response);
		// 		window.close();
		// 	}
		// });
	}

};

var play = new Play();
play.fetch();