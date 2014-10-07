import Ember from 'ember';

export default Ember.ArrayController.extend({
	isAdding: false,

	// steal the edit property from the playlist
	needs: ['playlist', 'playback'],
	canEdit: Ember.computed.alias('controllers.playlist.canEdit'),
	playback: Ember.computed.alias('controllers.playback'),

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

	// playlistLength: function() {
	//  	return this.get('model').length;
	// }.property('model.[],

	// Get the ID from a YouTube URL
	// @todo if it's not passed a youtube url it fails…
	getYouTubeID: function(url) {
		return url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/)[1];
	},

	actions: {
		play: function() {
			// transition to the latest object (the newest)
			this.transitionToRoute('track', this.get('model.lastObject'));
		},
		prev: function() {
			console.log('prev');

			var playlist = this.get('model');
			var playlistLength = playlist.get('length');
			var currentTrack = this.get('playback.model');
			var currentIndex = playlist.indexOf(currentTrack);
			var prevIndex = (currentIndex + 1);

			// test: with a playlist of 11 tracks total, currentIndex can not be 10
			if (currentIndex === (playlistLength-1)) {
				console.log('first track, can not go to rpevious');
				return false;
			}

			console.log('current: ' + currentIndex);
			console.log('prev will be: ' + prevIndex);

			var prevTrack = playlist.objectAt(prevIndex);
			this.transitionToRoute('track', prevTrack);
		},
		next: function() {
			console.log('next');

			var playlist = this.get('model');
			var playlistLength = playlist.get('length');
			var currentTrack = this.get('playback.model');
			var currentIndex = playlist.indexOf(currentTrack);
			var nextIndex = currentIndex - 1;

			if (currentIndex === 0) {
				console.log('last track, can not go to next');
				return false;
			}

			console.log(playlistLength);
			console.log('current: ' + currentIndex);
			console.log('next will be: ' + (currentIndex - 1));

			var nextTrack = playlist.objectAt((currentIndex - 1));
			this.transitionToRoute('track', nextTrack);
		},


		// This gets called when you paste something into the input-url component
		// it sets the track title based on a title from the YouTube API based on track URL
		autoTitle: function(url) {
			var id = this.getYouTubeID(url);
			if (!id) {
				console.log('errrrror');
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
