App.PlaybackController = Ember.ObjectController.extend({
	isPlaying: false,
	isMinimized: false,
	provider: null,

	actions: {
		play: function() {
			ytPlayer.playVideo();
			this.set('isPlaying', true);
			// console.log(this.get('isPlaying'));
		},
		pause: function() {
			ytPlayer.stopVideo();
			this.set('isPlaying', false);
			// console.log(this.get('isPlaying'));
		},
		togglePlayer: function() {
			this.toggleProperty('isMinimized');
		}
	},

	// provider: function() {
	// 	this.set('provider', this.get('model.provider'));
	// 	console.log(this.get('provider'));
	// }.property('model.provider'),

	// This creates a url string from the model's key and provider to be used in an iframe embed
	youtubeUrl: function() {
		if (this.get('model.provider') !== 'youtube') { return false; }

		// console.log(ytPlayer);
		// roughPlayer.loadVideo(this.get('model.provider'));

		var youtubeParameters = '?enablejsapi=1&autoplay=0&rel=0&showinfo=0&autohide=1&origin=http://localhost';
		return '//www.youtube.com/embed/' + this.get('model.key') + youtubeParameters;
	}.property('model.key'),

	soundcloudUrl: function() {
		if (this.get('model.provider') !== 'soundcloud') { return false; }

		var soundcloudParameters = '&color=00cc11&auto_play=false&hide_related=true&show_artwork=true&show_comments=false&maxheight=166';
		return 'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/' + this.get('model.key') + soundcloudParameters;
	}.property('model.key')
});
