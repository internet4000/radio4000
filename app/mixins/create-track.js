import Ember from 'ember';

const {Mixin, debug, warn} = Ember;

// Creates and saves a new track on a channel.

export default Mixin.create({
	createTrack(trackProperties, channel) {
		debug('Create new track');

		if (!trackProperties || !channel) {
			warn('No track properties or  no channel.');
			return;
		}

		const track = this.store.createRecord('track', trackProperties);

		// set channel on track and save
		track.set('channel', channel);
		track.updateProvider();
		track.save().then(() => {
			debug('saved track');

			// Add it to the tracks relationship on the channel
			channel.get('tracks').then(tracks => {
				tracks.addObject(track);
				channel.save().then(() => {
					debug('Saved new track.');
				}, error => {
					warn('Could not create track.');
					debug(error);
				});
			});
		}, error => {
			warn('could not save track');
			debug(error);
		});
	}
});
