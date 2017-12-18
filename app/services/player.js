import Ember from 'ember';
import {task} from 'ember-concurrency';

import {getRandomIndex} from 'radio4000/utils/random-helpers';

const {Service, inject, get, set, debug, computed} = Ember;

export default Service.extend({
	store: inject.service(),
	session: inject.service(),
	originTrack: null,
	currentTrack: null,
	currentChannel: computed.alias('currentTrack.channel'),
	isPlaying: computed.bool('currentTrack'),

	// play a track model
	playTrack(model) {
		if (!model) {
			debug('playTrack() was called without a track.');
			return;
		}
		set(this, 'originTrack', model);
	},

	onTrackChanged(event) {
		// set channels as active/inactive/add-to-history
		if (event.previousTrack.channel !== event.track.channel) {
			this.channelChanged(event.previousTrack.channel, event.track.channel);
		}

		// set previous track as non active
		if (event.previousTrack.id !== undefined) {
			get(this, 'store').findRecord('track', event.previousTrack.id).then(previousTrack => {
				previousTrack.set('liveInCurrentPlayer', false);
			});
		}

		// set new track as played and active
		get(this, 'store').findRecord('track', event.track.id).then(track => {
			set(this, 'currentTrack', track);
			track.setProperties({
				playedInCurrentPlayer: true,
				liveInCurrentPlayer: true
			});
		});
	},

	onTrackEnded(event) {
		get(this, 'store').findRecord('track', event.track.id).then(track => {
			track.set('finishedInCurrentPlayer', true);
		});
	},

	channelChanged(previousChannelId, channelId) {
		// set previous channel as not active
		if (previousChannelId !== undefined) {
			get(this, 'store').findRecord('channel', previousChannelId).then(channel => {
				channel.set('isInPlayer', false);
			});
		}

		// set new channel as active
		get(this, 'store').findRecord('channel', channelId).then(channel => {
			channel.set('isInPlayer', true);
			return channel;
		}).then(channel => this.updateChannelHistory(channel));
	},

	// add a channel to the History of played channels
	updateChannelHistory(channel) {
		const settings = get(this, 'session.currentUser.settings');

		// Break if the user does not have settings (= logged out)
		if (!settings) {
			return;
		}

		return settings.then(settings => {
			settings.get('playedChannels').then(history => {
				history.addObject(channel);
				return settings.save().then(() => {
					debug('playlist was added to currentUser played');
				});
			});
		});
	},

	// Clears the History of played channels
	clearChannelHistory() {
		this.get('session.currentUser.settings').then(settings => {
			settings.set('playedChannels', []);
			settings.save();
		});
	},

	/*
		 Play random channel
	 */
	playRandomChannel: task(function * () {
		const store = get(this, 'store')

		let channels = store.peekAll('channel')

		if (channels.get('length') < 15) {
			channels = yield store.findAll('channel')
		}

		const channel = channels.objectAt(getRandomIndex(channels.content))

		const tracks = yield channel.get('tracks')

		if (tracks.length < 2) {
			get(this, 'playRandomChannel').perform()
		} else {
			this.playTrack(tracks.get('lastObject'))
		}
	}).drop(),

	/*
		 1- build a playlist (like a channel model)
		 2- pass it to the player
		 document.querySelector('radio4000-player').__vue_custom_element__.$children[0].updatePlayerWithPlaylist(playlist)

	 */
	buildPlaylistExport(channelModel, trackIds) {
		// fetch all tracks
		const tracks = trackIds.map(id => {
			return get(this, 'store')
				.peekRecord('track', id)
				.serialize({
					includeId: true
				})
		});

		let cleanedChannel = channelModel.serialize({
			includeId: true
		});

		cleanedChannel.tracks = tracks;
		cleanedChannel.image = get(this, 'store').peekRecord('image', channelModel.get('images.firstObject'))

		return cleanedChannel;
	}

});
