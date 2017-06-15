/* global document */
import Ember from 'ember';

const {debug, inject} = Ember;

export default Ember.Service.extend({

	// Give it a track model and it'll play it
	playTrack(model) {
		if (!model) {
			debug('playTrack() was called without a track.');
			return false;
		}

		document.querySelector('radio4000-player').trackId = model.get('id');

		this.set('isPlaying', true);
		model.get('channel').then(channel => {
			const trackTitle = model.get('title');
			const channelTitle = channel.get('title');
			this.updateMetaTitle(trackTitle, channelTitle);
			this.updatePlaylist(channel);
			// radio4000-player-vue
		});
	},

	// This caches the current playlist and sets it if it really did change (through the model)
	// also sets the old one as inactive, and new as… active!
	updatePlaylist(newPlaylist) {
		const currentPlaylist = this.get('playlist');

		if (currentPlaylist && Ember.isEqual(currentPlaylist.get('id'), newPlaylist.get('id'))) {
			return;
		}

		if (currentPlaylist) {
			currentPlaylist.set('isInPlayer', false);
		}

		newPlaylist.set('isInPlayer', true);
		newPlaylist.get('tracks').then(tracks => {
			this.set('playlist', newPlaylist);
			this.get('playerRandom').setNewRandomPool(tracks);
		});
	},

	updateMetaTitle(trackTitle, channelTitle) {
		if (!document) {
			throw new Error('no document');
		}
		document.title = `${trackTitle} on ${channelTitle}`;
	}
});
