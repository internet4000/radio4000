import Ember from 'ember';

const {Component, inject, get} = Ember;

export default Component.extend({
	player: inject.service('player'),

	tagName: 'button',
	classNames: ['Btn'],
	showText: true,

	click() {
		this.playFirstTrack();
	},

	playFirstTrack() {
		get(this, 'channel.tracks').then(tracks => {
			const firstTrack = tracks.get('lastObject');
			get(this, 'player').playTrack(firstTrack);
		});
	}
});
