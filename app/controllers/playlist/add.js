import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['playlist'],
	isExpanded: false,

	// Check if the track is valid before saving
	isValid: function() {
		var isValid = true;
		// only track url is required!
		['trackUrl'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
			}
		}, this);
		return isValid;
	},

	// Get the ID from a YouTube URL
	// @todo if it's not passed a youtube url it fails…
	getYouTubeID: function(url) {
		return url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/)[1];
	},

	actions: {
		expand: function() {
			this.set('isExpanded', true);
		},
		contract: function() {
			// leaving the route also sets isexpanded to false
			this.transitionTo('playlist', this.get('controllers.playlist').get('model'));
		},

		addTrack: function() {
			if (!this.isValid()) { return false; }

			// Get the parent playlist (where we want to insert the track)
			var playlist = this.get('controllers.playlist').get('model');

			// Create a new child track
			var track = this.get('store').createRecord('track', {
				url: this.get('trackUrl'),
				title: this.get('trackTitle'),
				body: this.get('trackBody'),
				created: new Date().getTime()
			});

			// Close the adding state and reset fields (ready for next track)
			this.toggleProperty('isExpanded');
			this.setProperties({
				trackUrl: '',
				trackTitle: '',
				trackBody: ''
			});

			// leave it to the router to actually save the track
			this.send('saveTrack', track);
		},

		// This gets called when you paste something into the input-url component
		// it sets the track title based on a title from the YouTube API based on track URL
		autoTitle: function(url) {
			var id = this.getYouTubeID(url);
			if (!id) {
				Ember.debug('errrrror');
			}
			var apikey = 'AIzaSyCk5FiiPiyHON7PMLfLulM9GFmSYt6W5v4';
			Ember.$.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+id+'&key='+apikey+'&fields=items(id,snippet(title))&part=snippet').then(function(response) {
				this.set('trackTitle', response.items[0].snippet.title);
			}.bind(this));
		}
	}
});
