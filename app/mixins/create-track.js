import Ember from 'ember';

const {Mixin, debug, warn, get} = Ember;

// Creates and saves a new track on a channel.

export default Mixin.create({
	createTrack(trackProperties, channel) {
		const flashMessages = get(this, 'flashMessages');
		if (!trackProperties || !channel) {
			warn('No track properties or  no channel.');
			return;
		}
		const track = this.store.createRecord('track', trackProperties);
		track.set('channel', channel);
		track.updateProvider();
		track.save().then(() => {
			channel.set('updated', new Date().getTime());
			// Add it to the tracks relationship on the channel and save it.
			channel.get('tracks').then(tracks => {
				tracks.addObject(track);
				channel.save().then(() => {
					debug('Saved new track.');
					flashMessages.info('The track was saved');
				}, error => {
					warn('Could not save track on the channel.', error);
					flashMessages.warning('Hm, something went astray…');
				});
			});
		}, error => {
			warn('Could not save the track.', error);
		});
	}
});
