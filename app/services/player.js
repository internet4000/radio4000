import Ember from 'ember';
import {task} from 'ember-concurrency';

import {getRandomIndex} from 'radio4000/utils/random-helpers';
import {coverImg} from 'radio4000/helpers/cover-img';

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

		// Find a random channel with an optional request.
		if (channels.get('length') < 15) {
			channels = yield store.findAll('channel')
		}
		const channel = channels.objectAt(getRandomIndex(channels.content))

		// If the channel doesn't have many tracks, choose another.
		const tracks = yield channel.get('tracks')
		if (tracks.length < 2) {
			get(this, 'playRandomChannel').perform()
			return
		}

		this.playTrack(tracks.get('lastObject'))
	}).drop(),

	/*
		 An export of a channel, its tracks and image
		 in json format
		 it is almost identic to `channel` model
	 */
	buildPlaylistExport(channelModel, trackIds, query) {
		set(this, 'query', query)
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

		cleanedChannel.tracks = tracks.reverse();

		// Get a full image src to pass.
		const imageModel = channelModel.get('coverImage')
		const src = coverImg([imageModel.get('src')], {size: 56})
		cleanedChannel.image = src

		return cleanedChannel
	},
	loadPlayistInWebComponent(playlist) {
		const vue = document.querySelector('radio4000-player').__vue_custom_element__.$children[0];
		vue.updatePlaylist(playlist);
	}
});
