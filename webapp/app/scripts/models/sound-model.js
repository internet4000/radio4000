/*global Ember*/
App.Sound = DS.Model.extend({
	key: DS.attr('string'),
	provider: DS.attr('string')
});

App.Sound.reopen({

	// // Not sure what this does
	// attributes: function(){
	// 	var model = this;

	// 	return Ember.keys(this.get('data')).map(function(key){
	// 		return Ember.Object.create({
	// 			model: model,
	// 			key: key,
	// 			valueBinding: 'model.' + key
	// 		});
	// 	});
	// }.property(),

	// Creates a url to the sound embed, depending on the provider and bound to the 'key' property
	src: function() {
		var src = '';

		if (this.get('provider') === 'youtube') {
			var youtubeParameters = '?enablejsapi=1&autoplay=1';
			src = '//www.youtube.com/embed/' + this.get('key') + youtubeParameters;

		} else if (this.get('provider') === 'soundcloud') {
			var soundcloudParameters = '&color=00cc11&auto_play=true&hide_related=true&show_artwork=true&show_comments=false&maxheight=166';
			src = 'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/' + this.get('key') + soundcloudParameters;
		}

		return src;

	}.property('key')
});
