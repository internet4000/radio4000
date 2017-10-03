import Ember from 'ember';
import {task} from 'ember-concurrency';

const {Mixin, debug, get} = Ember;

// Creates and saves a new track on a channel.

export default Mixin.create({
	createTrack: task(function * (props, channel) {
		const messages = get(this, 'flashMessages');

		if (!props || !channel) {
			debug('Could not add track. Track properties or channel is missing?');
			return;
		}

		const track = this.store.createRecord('track', {
			url: props.url,
			title: props.title,
			body: props.body,
			ytid: props.ytid,
			channel
		});

		try {
			yield track.save();
		} catch (err) {
			Ember.debug(err);
			messages.warning('Could not create your track.');
		}

		try {
			const tracks = yield channel.get('tracks');
			tracks.addObject(track);
			yield channel.save();
			messages.success('Your track was created', {timeout: 5000});
		} catch (err) {
			Ember.debug(err);
			messages.warning('Could not save the track to your radio');
		}

		return track;
	}).drop()
});
