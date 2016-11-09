import Ember from 'ember';
import {task} from 'ember-concurrency';

const {Mixin, debug, get} = Ember;

// Creates and saves a new track on a channel.

export default Mixin.create({
	createTrack: task(function * (props, channel) {
		if (!props || !channel) {
			debug('No track properties or  no channel.');
			return;
		}

		const flashMessages = get(this, 'flashMessages');
		const track = this.store.createRecord('track', props);
		track.set('channel', channel);

		try {
			yield track.updateYouTubeId().save();
			const tracks = yield channel.get('tracks');
			tracks.addObject(track);
			channel.set('updated', new Date().getTime());
			yield channel.save();
			get(this, 'flashMessages').info('Your track was created', {timeout: 5000});
		} catch (e) {
			flashMessages.warning('Hm, something went astray…');
		}
		return track;
	}).drop()
});
