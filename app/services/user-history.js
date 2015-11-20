import Ember from 'ember';

const {Service, inject} = Ember;

export default Service.extend({
	session: inject.service(),
	store: inject.service(),

	// a track from the player ended (no user action, it played all the track)
	trackEnded(channel) {
		this.didPlayChannel(channel);
	},

	clearHistory() {
		let settings = this.get('session.currentUser.settings');
		settings.get('playedChannels').then(playedChannels => {
			playedChannels.set([]);
			settings.save();
		});
	},

	didPlayChannel(channel) {
		let settings = this.get('session.currentUser.settings');

		channel.then(channel => {
			settings.then(settings => {
				settings.get('playedChannels').then(history => {
					history.addObject(channel);
					settings.save().then(() => {
						Ember.debug('playlist was added to currentUser played');
					});
				});
			});
		});
	}
});
