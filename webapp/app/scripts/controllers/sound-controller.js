App.SoundController = Ember.ObjectController.extend({

	// This is called a 'computed property'
	// and it creates an embed source from the model's key and provider
	embedSource: function() {
		var src = '',

			key = this.get('model.key'),
			provider = this.get('model.provider');

			youtubeParameters = '?enablejsapi=1&autoplay=1',
			soundcloudParameters = '&color=00cc11&auto_play=true&hide_related=true&show_artwork=true&show_comments=false&maxheight=166';

		if (provider === 'youtube') {
			src = '//www.youtube.com/embed/' + key + youtubeParameters;
		}

		else if (provider === 'soundcloud') {
			src = 'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/' + key + soundcloudParameters;
		}

		return src;
	}.property('model.key')
});
