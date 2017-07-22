import Ember from 'ember';

const {Component, inject, get, computed} = Ember;

export default Component.extend({
	player: inject.service('player'),

	tagName: 'button',
	classNames: ['Btn'],

	tracks: computed.reads('channel.tracks'),

	click() {
		this.playFirstTrack();
	},

	playFirstTrack() {
		get(this, 'tracks').then(tracks => {
			const firstTrack = tracks.get('lastObject');
			get(this, 'player').playTrack(firstTrack);
		});
	}
});
