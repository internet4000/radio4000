import Ember from 'ember';
import {task} from 'ember-concurrency';
import firebase from 'firebase';

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
			const timestamp = firebase.database.ServerValue.TIMESTAMP;
			tracks.addObject(track);
			channel.set('updated', timestamp);
			yield channel.save();
			messages.success('Your track was created', {timeout: 5000});
		} catch (err) {
			Ember.debug(err);
			messages.warning('Could not save the track to your radio');
		}

		// To avoid 'updated' being NaN due to a value of {.sv: "timestamp"}
		// we need to request an update from Firebase for the channel.
		channel.reload();

		// And we need to do a similar track for the track.
		track.set('created', new Date().getTime());

		return track;
	}).drop()
});
