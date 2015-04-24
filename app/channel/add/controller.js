import Ember from 'ember';
import youtube from 'radio4000/utils/youtube';

export default Ember.Controller.extend({
	queryParams: ['providerTrackUrl', 'providerTrackTitle'],
	providerTrackUrl: null,
	providerTrackTitle: null,

	// Check if the track is valid before saving
	isValid: Ember.computed('model.url', 'model.title', function() {
		if (this.get('model.url') && this.get('model.title')) {
			return true;
		} else {
			return false;
		}
	}),

	actions: {
		addFromSearch(item) {
			var title = item.get('title');
			var url = item.get('url');

			// clean the url
			url = url.replace('&feature=youtube_gdata_player', '');

			// update current model with properties from the chosen search
			this.set('model.title', title);
			this.set('model.url', url);

			setTimeout(() => {
				this.set('justAdded', true);
			}, 250);
			setTimeout(() => {
				this.set('justAdded', false);
			}, 500);
		},

		addTrack() {
			if (!this.get('isValid')) { return false; }

			// leave it to the router to actually save the track
			this.send('saveTrack');
		},

		// This gets called when you paste something into the input-url component
		// it takes a URL and turns it into a YouTube ID which we use to query the API for a title
		autoTitle(url) {
			var apikey = 'AIzaSyCk5FiiPiyHON7PMLfLulM9GFmSYt6W5v4';
			var id = youtube(url);
			var endpoint = 'https://www.googleapis.com/youtube/v3/videos?id='+id+'&key='+apikey+'&fields=items(id,snippet(title))&part=snippet';

			if (!id) {
				Ember.warn('autoTitle couldnt create an id from: ' + url);
				return;
			}

			Ember.$.getJSON(endpoint).then(function(response) {
				this.set('model.title', response.items[0].snippet.title);
			}.bind(this));
		},

		// used by 'ESC' key in the view
		cancelEdit() {
			this.transitionToRoute('channel.index', this.get('session.currentUser.channels.firstObject'));
		}
	}
});


// javascript:location.href='http://localhost:4000/c/200ok/add?providerTrackUrl='+encodeURIComponent(location.href)+'&providerTrackTitle='+encodeURIComponent(document.title)
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
