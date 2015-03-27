import Ember from 'ember';
import youtube from 'radio4000/utils/youtube';

export default Ember.Controller.extend({
	formError: false,
	// queryParams: ['bookmarkletUrl'],

	// bookmarklet: function() {
	//     var bookmarkletUrl = this.get('bookmarkletUrl');

	//     if (bookmarkletUrl) {
	//       console.log(bookmarkletUrl);
	//     } else {
	//       console.log("no bookmarkletUrl");
	//     }
	//   }.property('category', 'model'),

	// Check if the track is valid before saving
	isValid() {
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

		addTrack() {
			if (!this.isValid()) { return false; }

			// leave it to the router to actually save the track
			this.send('saveTrack');
		},

		// This gets called when you paste something into the input-url component
		// it takes a URL and turns it into a YouTube ID which we use to query the API for a title
		autoTitle(url) {
			var apikey = 'AIzaSyCk5FiiPiyHON7PMLfLulM9GFmSYt6W5v4';
			var id = youtube(url);

			if (!id) { Ember.debug('errrrror'); return; }

			Ember.$.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+id+'&key='+apikey+'&fields=items(id,snippet(title))&part=snippet').then(function(response) {
				var ytTitle = response.items[0].snippet.title;
				this.set('model.title', ytTitle);
			}.bind(this));
		}
	}
});
