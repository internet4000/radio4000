import Ember from 'ember';

export default Ember.ObjectController.extend({
	isPlaying: false,
	isMinimized: false,
	provider: null,

	actions: {
		play: function() {
			this.set('isPlaying', true);
			// roughPlayer.playVideo();
		},
		pause: function() {
			this.set('isPlaying', false);
			// roughPlayer.stopVideo();
		},
		togglePlayer: function() {
			this.toggleProperty('isMinimized');
		}
	},

	// @TODO don't know how to sync youtube play and this event
	onExternalPlay: function() {
		console.log('external play!');
		this.set('isPlaying', true);
	},

	// // This creates a url string from the model's key and provider to be used in an iframe embed
	// youtubeUrl: function() {
	// 	if (this.get('model.provider') !== 'youtube') { return false; }

	// 	// ytPlayer = new YT.Player('YouTube2', playerOptions);
	// 	// console.log(roughPlayer);
	// 	// console.log(ytPlayer);
	// 	// if (!ytPlayer) {
	// 	// 	ytPlayer = new YT.Player('ytplayer', playerOptions);
	// 	// 	roughPlayer.loadVideo(this.get('model.key'));
	// 	// }

	// 	console.log('if you go directly on a youtube sound it will not work. you need to wait for the player to load the first dummy video');
	// 	roughPlayer.loadVideo(this.get('model.key'));

	// 	// var youtubeParameters = '?enablejsapi=1&autoplay=0&rel=0&showinfo=0&autohide=1&origin=http://localhost';
	// 	// return '//www.youtube.com/embed/' + this.get('model.key') + youtubeParameters;
	// }.property('model.key'),

	// soundcloudUrl: function() {
	// 	if (this.get('model.provider') !== 'soundcloud') { return false; }

	// 	console.log('sc loading?');
	// 	// pause if there is a youtube video playing already
	// 	// this.send('pause');

	// 	var soundcloudParameters = '&color=00cc11&auto_play=false&hide_related=true&show_artwork=true&show_comments=false&maxheight=166';
	// 	return 'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/' + this.get('model.key') + soundcloudParameters;
	// }.property('model.key')
});
