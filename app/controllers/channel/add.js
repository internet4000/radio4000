import Ember from 'ember';
import youtube from 'radio4000/utils/youtube';

export default Ember.Controller.extend({
	formError: false,
	queryParams: ['providerTrackUrl', 'providerTrackTitle'],
	providerTrackUrl: null,
	providerTrackTitle: null,



	// bookmarklet: function() {
	// // knowledge base
	// // http://localhost:4000/c/200ok/add?bookmarklet=https://www.youtube.com/watch?v=doaQC-S8de8
	// // javascript:location.href='http://www.reddit.com/submit?url='
	// // +encodeURIComponent(location.href)
	// // +'&title='
	// // +encodeURIComponent(document.title)

	// //http://guides.emberjs.com/v1.10.0/routing/query-params/

	// 	var bookmarklet = this.get('bookmarklet');
	// 	console.log('bookmarklet tests:');
	// 	console.log(bookmarklet);

	// 	// if (bookmarklet) {
	// 	// 	console.log(bookmarklet);
	// 	// } else {
	// 	// 	console.log("no bookmarklet");
	// 	// }
	// }.property('url', 'model'),

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
