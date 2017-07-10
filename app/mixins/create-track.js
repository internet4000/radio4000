import Ember from 'ember';
import {task} from 'ember-concurrency';
import firebase from 'firebase';

const {Mixin, debug, get} = Ember;

// Creates and saves a new track on a channel.

export default Mixin.create({
	createTrack: task(function * (props, channel) {
		const flashMessages = get(this, 'flashMessages');

		if (!props || !channel) {
			debug('No track properties or  no channel.');
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
		} catch (e) {
			Ember.debug(e);
			flashMessages.warning('Could not create your track.');
		}

		try {
			const tracks = yield channel.get('tracks');
			const timestamp = firebase.database.ServerValue.TIMESTAMP;
			tracks.addObject(track);
			channel.set('updated', timestamp);
			yield channel.save();
			get(this, 'flashMessages').info('Your track was created', {timeout: 5000});
		} catch (e) {
			Ember.debug(e);
			flashMessages.warning('Could not save the track to your radio');
		}

		// To avoid 'updated' being NaN due to a value of {.sv: "timestamp"}
		// we need to request an update from Firebase.
		channel.reload();

		return track;
	}).drop()
});
