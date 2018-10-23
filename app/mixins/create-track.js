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

		// 1. Create the track.
		const track = this.store.createRecord('track', {
			url: props.url,
			title: props.title,
			body: props.body,
			ytid: props.ytid,
			discogsUrl: props.discogsUrl
		});

		// 2. Add it to the channel's tracks.
		const tracks = yield channel.get('tracks');
		tracks.addObject(track);

		// 3. Save track.
		try {
			yield track.save();
			debug('saved track')
		} catch (err) {
			debug(err)
			messages.warning('Could not create your track.')
		}

		// 4. Save channel.
		try {
			yield channel.save();
			debug('saved track on channel')
			messages.success('Your track was created', {timeout: 5000});
		} catch (err) {
			debug(err)
			messages.warning('Could not save the track to your radio')
		}

		return track;
	}).drop()
});
