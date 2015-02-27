import Ember from 'ember';
import youtube from 'radio4000/utils/youtube';

export default Ember.Controller.extend({
	formError: false,

	// Check if the track is valid before saving
	isValid: function() {
		this.set('formError', false);

		var isValid = true;
		['url', 'title'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
				this.set('formError', 'Please enter a valid YouTube URL and a title.');
			}
		}, this);
		return isValid;
	},

	actions: {
		addTrack: function() {
			if (!this.isValid()) { return false; }

			// Set extra properties
			var track = this.get('model').setProperties({
				channel: this.modelFor('channel'),
				created: new Date().getTime()
			});

			// leave it to the router to actually save the track
			this.send('saveTrack', track);
		},

		// This gets called when you paste something into the input-url component
		// it takes a URL and turns it into a YouTube ID which we use to query the API for a title
		autoTitle: function(url) {
			var apikey = 'AIzaSyCk5FiiPiyHON7PMLfLulM9GFmSYt6W5v4';
			var id = youtube(url);

			console.log(url);
			console.log(id);

			if (!id) {
				Ember.debug('errrrror');
			}

			Ember.$.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+id+'&key='+apikey+'&fields=items(id,snippet(title))&part=snippet').then(function(response) {
				this.set('model.title', response.items[0].snippet.title);
			}.bind(this));
		}
	}
});
