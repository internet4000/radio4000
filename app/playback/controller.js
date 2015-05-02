import Ember from 'ember';

export default Ember.Controller.extend({
	isMaximized: false,
	isShuffled: false,
	historyWasUpdated: false,

	// channel gets set by the track route
	channel: null,

	// tracks from the current channel
	tracks: Ember.computed('channel.tracks.[]', function() {
		return this.get('channel.tracks');
	}),

	// gets the index of the current track
	getCurrentTrackIndex: Ember.computed('tracks', 'model', function() {
		return this.get('tracks').indexOf(this.get('model'));
	}),

	// all listened tracks
	// history: [],
	history: Ember.A([]),

	// all tracks not in the history array
	// there is probably a computed macro to handle this.
	unplayed: Ember.computed('history.[]', 'tracks.[]', function () {
		const history = this.get('history');
		const tracks = this.get('tracks');

		if (!tracks) { return; }

		return tracks.filter((track) => {
			return !history.contains(track);
		});
	}),

	// unplayed: Ember.computed.filter('tracks', function(track, index) {
	// 	return !this.get('history').contains(track);
	// }),

	updateHistory: Ember.observer('model', function() {
		let history = this.get('history');
		let historyWasUpdated = this.get('historyWasUpdated');

		console.log('updateHistory: model changed');

		if (historyWasUpdated) { return; }

		history.pushObject(this.get('model'));
		this.set('historyWasUpdated', true);
	}),

	// Clears history every time the channel changes
	clearHistory: Ember.observer('channel', function() {
		console.log('clearHistory: channel observer');
		this.get('history').clear();
	}),

	// generates a ytid if the model doesn't have one already
	// @todo: this should be removed when all tracks have an ytid
	validateTrack: Ember.observer('model.ytid', function() {
		console.log('validateTrack');

		if (!this.get('model.ytid')) {
			this.get('model').updateProvider();
		}
	}),

	// resetRemote: Ember.on('init', function() {
	// 	let channel = this.get('session.currentUser.channels.firstObject');
	// }),

	// // TODO: this should only be active if the user enabled "remote control" setting
	// // (which doesn't exist yet)
	// updateFromRemote: Ember.observer('session.currentUser.channels.firstObject.listeningToTrack', function() {

	// 	if (!this.get('session.currentUser')) {
	// 		Ember.warn('updated without user');
	// 		return;
	// 	}

	// 	const channel = this.get('session.currentUser.channels.firstObject');
	// 	const track = channel.get('listeningToTrack');

	// 	Ember.debug(channel);
	// 	Ember.debug(track);

	// 	if (!track) {
	// 		Ember.warn('updated without track');
	// 		return;
	// 	}

	// 	console.log('remotely changed track');
	// 	this.set('channel', channel);
	// 	this.set('model', track);
	// }),

	// gets a random track
	getRandomTrack() {
		let random = Math.floor(Math.random() * this.get('tracks.length'));
		return this.get('tracks').objectAt(random);
	},

	actions: {

		// use this to play a track, if you don't want the url to change
		playTrack(track) {
			if (!track) { return false; }
			this.set('model', track);
		},

		prev() {
			const isShuffled = this.get('isShuffled');
			const history = this.get('history');
			const tracks = this.get('tracks');
			const model = this.get('model');
			let newTrack;

			// without shuffle
			if (!isShuffled) {
				// play prev in tracks
				newTrack = tracks.objectAt(tracks.indexOf(model) + 1);

				if (newTrack) {
					return this.send('playTrack', newTrack);
				} else {
					// or play last
					return this.send('playLast');
				}
			}

			// with shuffle
			if (isShuffled) {
				// play prev in history
				newTrack = history.objectAt(history.indexOf(model) - 1);

				if (newTrack) {
					return this.send('playTrack', newTrack);
				} else {
					// or play prev in tracks
					newTrack = tracks.objectAt(tracks.indexOf(model) + 1);
				}

				if (newTrack) {
					return this.send('playTrack', newTrack);
				} else {
					// or reset
					// Ember.debug('resetting');
					this.clearHistory();
					return this.set('model', null);
				}
			}
		},

		next() {
			let unplayed = this.get('unplayed');
			let len = unplayed.get('length');
			let isShuffled = this.get('isShuffled');
			let tracks = this.get('tracks');
			let model = this.get('model');
			let newTrack;

			console.log(model, 'playback: current model');

			// define which track is the next track
			if (isShuffled) {
				// go to a random item from the unplayed items
				newTrack = unplayed.objectAt(Math.floor(Math.random() * len));
				this.get('history').pushObject(newTrack);
			} else if (model) {
				// or go to next
				newTrack = tracks.objectAt(tracks.indexOf(model) - 1);
			} else {
				// or go to first
				newTrack = unplayed.get('lastObject');
			}

			// play the new track
			if (!newTrack) {
				this.clearHistory();
				return this.send('playFirst');
			} else {
				console.log(newTrack, 'playback: newTrack');
				this.send('playTrack', newTrack);
			}
		},

		playPrev() {},

		// first is last because we have newest on top
		playFirst() {
			let firstTrack = this.get('tracks.lastObject');
			// this.get('history').pushObject(firstTrack);
			this.send('playTrack', firstTrack);
			// Ember.debug('Playing first track');
		},

		playLast() {
			// last is first because we have newest on top
			let lastTrack = this.get('tracks.firstObject');
			this.send('playTrack', lastTrack);
			// this.get('history').pushObject(lastTrack);
			// Ember.debug('Playing last track');
		},

		// Toggles 'fullscreen mode'
		toggle() {
			this.toggleProperty('isMaximized');
		},

		ytPlaying() {
			// Ember.debug('on playing from controller');
		},
		ytPaused() {
			// Ember.debug('on paused from controller');
		},
		ytEnded() {
			// Ember.debug('on ended from controller');
			this.send('next');
		},
		ytError(error) {
			// Ember.debug('on yt error from controller');
			console.log(error);

			// dont do anything on 'invalid parameter'
			if (error === 2) { return; }

			// otherwise play next
			this.send('next');
		}
	}
});
