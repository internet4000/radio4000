import Ember from 'ember';

export default Ember.ArrayController.extend({
	// steal the edit property from the playlist
	needs: ['playlist', 'playback', 'track'],
	canEdit: Ember.computed.alias('controllers.playlist.canEdit'),
	playback: Ember.computed.alias('controllers.playback'),
	track: Ember.computed.alias('controllers.track'),

	isAdding: false,


	// Sort by newest on top
	sortProperties: ['created'],
	sortAscending: false,

	// Check if the track is valid before saving
	trackIsValid: function() {
		var isValid = true;
		['trackUrl'].forEach(function(field) {
			if (this.get(field) === '') {
				isValid = false;
			}
		}, this);
		Ember.debug(isValid);
		return isValid;
	},

	// Get the ID from a YouTube URL
	// @todo if it's not passed a youtube url it fails…
	getYouTubeID: function(url) {
		return url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/)[1];
	},

	trackIndex: function() {
		var index = this.get('model').indexOf(this.get('playback.model'));
		Ember.debug('trackIndex return: ' + index);
		return index;
	}.property('model.[]', 'playback.model'),

	actions: {
		playTrack: function(track) {
			if (!track) {
				Ember.debug('no track?!');
				return false;
			}
			Ember.debug('playing track: ' + track.get('title'));
		 	this.transitionToRoute('track', track);
		},
		playLatest: function(track) {
			Ember.debug('playing latest track');
			this.send('playTrack', this.get('model.lastObject'));
			
		},
		prev: function(model) {
			Ember.debug('prev');
			if (this.get('trackIndex') === (this.get('model.length') - 1)) {
				Ember.debug('at newest track already, playing last');
				this.send('playTrack', this.get('model').objectAt(0));
				return false;
			}

			var prevTrack = this.get('model').objectAt((this.get('trackIndex') + 1));
			this.send('playTrack', prevTrack);
		},
		next: function(model) {
			Ember.debug('next');
			
			if (this.get('trackIndex') <= 0) {
				Ember.debug('last or no track, playing first');
				this.send('playTrack', this.get('model.lastObject'));
				return false;
			}

			var prevTrack = this.get('model').objectAt((this.get('trackIndex') - 1));
			this.send('playTrack', prevTrack);
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
		},
		sortBy: function(property) {
			this.set('sortProperties', [property]);
			this.set('sortAscending', !this.get('sortAscending'));
		},
		addTrack: function() {
			this.set('isAdding', true);
		},
		cancel: function() {
			this.set('isAdding', false);
		},
		publishTrack: function(playlist, track) {
			if (!this.trackIsValid()) {
				Ember.debug('invalid track - wont publish');
				return;
			}

			// get the youtube ID somehow
			// this.get('trackUrl').youtubeIdFromUrl();

			// Get the parent playlist
			playlist = this.get('controllers.playlist').get('model');

			// Create a new child track
			track = this.get('store').createRecord('track', {
				url: this.get('trackUrl'),
				title: this.get('trackTitle'),
				body: this.get('trackBody'),
				created: new Date().getTime()
			});

			// Close the edit box
			this.send('cancel');

			// Save the track
			track.save().then(function() {
				// And add it to the tracks property of the playlist
				Ember.RSVP.Promise.cast(playlist.get('tracks')).then(function(tracks) {
					tracks.addObject(track);
					playlist.save().then(function() {
						Ember.debug('Success: Track saved to playlist');
					}, function() {
						Ember.debug('Error: Track NOT saved to playlist');
					});
				});
			});

			// Reset the fields
			this.setProperties({
				trackUrl: '',
				trackTitle: '',
				trackBody: ''
			});
		}
	}
});
