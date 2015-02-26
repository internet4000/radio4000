import Ember from 'ember';
import youtube from 'radio4000/utils/youtube';

export default Ember.Controller.extend({
	needs: ['channel'],
	channel: Ember.computed.alias('controllers.channel.model'),
	isExpanded: false,
	formError: false,

	// Check if the track is valid before saving
	isValid: function() {
		this.set('formError', false);

		var isValid = true;
		['trackUrl', 'trackTitle'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
				this.set('formError', 'Please enter a valid YouTube URL and a title.');
			}
		}, this);
		return isValid;
	},

	actions: {
		expand: function() {
			this.set('isExpanded', true);
		},
		cancel: function() {
			// leaving the route also sets isexpanded to false
			this.transitionToRoute('channel', this.get('channel'));
		},
		addTrack: function() {
			if (!this.isValid()) { return false; }

			var title = this.get('trackTitle');
			if (Ember.isEmpty(title)) {
				this.set('trackTitle', 'Untitled');
			}

			// Create a new child track
			var track = this.get('model').setProperties({
				url: this.get('trackUrl'),
				title: this.get('trackTitle'),
				body: this.get('trackBody'),
				channel: this.get('channel'),
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
		// it takes a URL and turns it into a YouTube ID which we use to query the API for a title
		autoTitle: function(url) {
			var apikey = 'AIzaSyCk5FiiPiyHON7PMLfLulM9GFmSYt6W5v4';
			var id = youtube(url);

			if (!id) {
				Ember.debug('errrrror');
			}

			Ember.$.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+id+'&key='+apikey+'&fields=items(id,snippet(title))&part=snippet').then(function(response) {
				this.set('trackTitle', response.items[0].snippet.title);
			}.bind(this));
		}
	}
});
