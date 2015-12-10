import Ember from 'ember';

const {Service, inject} = Ember;

export default Service.extend({
	player: inject.service(),
	session: inject.service(),
	store: inject.service(),

	// a track from the player ended (no user action, it played all the track)
	trackEnded(channel) {
		this.didPlayChannel(channel);
	},
	// the track has been inserted in the player (not, or not yet finished)
	setTrackHasPlayed(track) {
		track.set('usedInCurrentPlayer', true);
	},
	// the tracks has been played till the end
	setTrackHasFinished(track) {
		track.set('finishedInCurrentPlayer', true);
	},

	// Clears the History of played channels
	clearPlayerHistory() {

	},

	// Clears the History of played channels
	clearChannelHistory() {
		let settings = this.get('session.currentUser.settings');
		settings.get('playedChannels').then(playedChannels => {
			playedChannels.set([]);
			settings.save();
		});
	},
	// the user played this channel entirely
	didPlayChannel() {
		let currentChannelModel = this.get('player.model.channel');
		let settings = this.get('session.currentUser.settings');
		// add the channel to the current user settings
		currentChannelModel.then(channel => {
			settings.then(settings => {
				settings.get('playedChannels').then(history => {
					history.addObject(channel);
					settings.save().then(() => {
						Ember.debug('playlist was added to currentUser played');
					});
				});
			});
		});
	},
	// @TODO the user finished this channel entirely (all tracks were naturally finished)
});
