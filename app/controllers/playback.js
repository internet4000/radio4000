/*global YT*/
import Ember from 'ember';

export default Ember.ObjectController.extend({
	isMaximized: false,
	isPlaying: false,

	actions: {
		// play: function() {
		// 	this.set('isPlaying', true);
		// 	this.muchplayer.playVideo();
		// },
		// pause: function() {
		// 	this.set('isPlaying', false);
		// 	this.muchplayer.pauseVideo();
		// },
		toggle: function() {
			this.toggleProperty('isMaximized');
		}
	},

	// createYTPlayer: function() {
	// 	var self = this;
	// 	console.log('create a YT.Player instance');
	// 	this.muchplayer = new YT.Player('player', {
	// 		events: {
	// 			'onReady': self.onPlayerReady,
	// 			'onStateChange': self.onPlayerStateChange,
	// 			'onError': self.onPlayerError
	// 		}
	// 	});
	// }.observes('embedURL'),

	onPlayerReady: function() {
		Ember.debug('onPlayerReady');
	},
	onPlayerStateChange: function() {
		Ember.debug('onPlayerStateChange');
	},
	onPlayerError: function() {
		Ember.debug('onPlayerError');
	}
});
