import config from '../../config/environment';
import Ember from 'ember';
import youtube from 'radio4000/utils/youtube';

export default Ember.Controller.extend({

	// bookmarklet
	// javascript:location.href='http://localhost:4000/c/200ok/add?url='+encodeURIComponent(location.href)
	// http://guides.emberjs.com/v1.10.0/routing/query-params/#toc_map-a-controller-s-property-to-a-different-query-param-key
	queryParams: ['url'],
	url: null,

	// Check if the track is valid before saving
	isValid: Ember.computed('model.url', 'model.title', function() {
		if (this.get('model.url') && this.get('model.title')) {
			return true;
		} else {
			return false;
		}
	}),

	urlDidChange: Ember.observer('url', function() {
		Ember.run.debounce(() => {
			let tempUrl = this.get('url');
			this.send('autoTitle', tempUrl );
		}, 300)
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

			Ember.run.later( () => {
				this.set('justAdded', true);
			}, 250);

			Ember.run.later(() => {
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
			var id = youtube(url);

			if (!id) {
				Ember.warn('autoTitle couldnt create an id from: ' + url);
				return;
			}
			var endpoint = 'https://www.googleapis.com/youtube/v3/videos?id='+id+'&key='+config.youtubeApiKey+'&fields=items(id,snippet(title))&part=snippet';

			Ember.$.getJSON(endpoint).then((response) => {
				this.set('model.title', response.items[0].snippet.title);
			});
		},

		// used by 'ESC' key in the view
		cancelEdit() {
			this.transitionToRoute('channel.index', this.get('session.currentUser.channels.firstObject'));
		}
	}
});
