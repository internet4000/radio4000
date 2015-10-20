import Ember from 'ember';

const {Component, inject, run} = Ember;

// Pass it a track to play it.
// Pass it a channel to play latest track.
// Set shuffle to true it will play random and enable shuffle on the player.
// It will load all tracks async (use isLoading in templates)

export default Component.extend({
	player: inject.service(),
	tagName: 'button',
	classNames: ['Btn'],
	classNameBindings: ['isLoading'],
	shuffle: false,

	click() {
		const track = this.get('track');
		const channel = this.get('channel');

		if (track) {
			return this.get('player').play(track);
		} else if (channel) {
			return this.playChannel(channel);
		}
	},

	playChannel(channel) {
		const player = this.get('player');

		this.loadTracks(channel).then(tracks => {
			run.scheduleOnce('afterRender', this, function () {
				// Either play shuffle
				if (this.get('shuffle')) {
					player.playShuffleFromTracks(tracks);
					return;
				}

				// Or latest track.
				player.play(tracks.get('lastObject'));
				// Enable shuffle automatically for any next clicks.
				this.set('shuffle', true);
			});
		});
	},

	loadTracks(channel) {
		this.set('isLoading', true);
		return channel.get('tracks').then(tracks => {
			this.set('isLoading', false);
			return tracks;
		});
	}
});
