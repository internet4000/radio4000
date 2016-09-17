import Ember from 'ember';

const {Mixin, warn, get, RSVP} = Ember;

// Creates and saves a new track on a channel.

export default Mixin.create({
	createTrack(trackProperties, channel) {
		const flashMessages = get(this, 'flashMessages');

		if (!trackProperties || !channel) {
			warn('No track properties or  no channel.');
			return;
		}

		return new RSVP.Promise((resolve, reject) => {
			const track = this.store.createRecord('track', trackProperties);
			track.set('channel', channel);
			track.updateYouTubeId().save().then(() => {
				channel.set('updated', new Date().getTime());
				// Add it to the tracks relationship on the channel and save it.
				channel.get('tracks').then(tracks => {
					tracks.addObject(track);
					channel.save().then(() => {
						get(this, 'flashMessages').info('Your track was created', {timeout: 5000});
						resolve(track);
					}, err => {
						warn('Could not save track on the channel.', err);
						flashMessages.warning('Hm, something went astray…');
						reject(err);
					});
				});
			}, err => {
				warn('Could not save the track.', err);
				reject(err);
			});
		});
	}
});
