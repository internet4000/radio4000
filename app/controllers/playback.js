import Ember from 'ember';

export default Ember.ObjectController.extend({
	isMinimized: false,
	isPlaying: false,

	actions: {
		play: function() {
			this.set('isPlaying', true);
			this.muchplayer.playVideo();
		},
		pause: function() {
			this.set('isPlaying', false);
			this.muchplayer.pauseVideo();
		}
	},

	// Returns a valid YouTube ID from a URL
	embedURL: function() {

		var self = this;

		if (!window.muchplayer) {
			console.log('no global muchplayer');
		}

		console.log('create a YT.Player instance');
		this.muchplayer = new YT.Player('player', {
			events: {
				'onReady': self.myPlayerReady
			}
		});

		// Get the ID from the URL
		var url = this.get('model.url');
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = url.match(regExp);

		if (match && match[7].length === 11) {
			this.set('id', match[7]);
		} else {
			console.log('wrong youtube url:' + url);
			this.set('id', '');
		}

		return 'http://www.youtube.com/embed/'+ this.get('id') + '?enablejsapi=1&autoplay=1&rel=0&showinfo=0&autohide=1';
	}.property('model.url'),

	myPlayerReady: function() {
		console.log('my player ready');
	}


	// afterYouTubePlayerAPIReady: function() {
	// 	console.log('after yt api ready')

	// 	// we create a YT.Player object from the embed we just inserted

	// }

	/*
	// This creates a url string from the model's key and provider to be used in an iframe embed
	youtubeUrl: function() {
		// if (this.get('model.provider') !== 'youtube') { return false; }

		roughPlayer.loadVideo(this.get('model.key'));

		// var youtubeParameters = '?enablejsapi=1&autoplay=0&rel=0&showinfo=0&autohide=1&origin=http://localhost';
		// return '//www.youtube.com/embed/' + this.get('model.key') + youtubeParameters;
	}.property('model.url'),
	*/

	/*
	soundcloudUrl: function() {
		if (this.get('model.provider') !== 'soundcloud') { return false; }

		console.log('sc loading?');
		// pause if there is a youtube video playing already
		// this.send('pause');

		var soundcloudParameters = '&color=00cc11&auto_play=false&hide_related=true&show_artwork=true&show_comments=false&maxheight=166';
		return 'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/' + this.get('model.key') + soundcloudParameters;
	}.property('model.key')
	*/
});
