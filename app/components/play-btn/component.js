import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
	player: service('player'),

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
