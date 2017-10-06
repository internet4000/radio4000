import { inject as service } from '@ember/service';
import { not } from '@ember/object/computed';
import Component from '@ember/component';
import { get } from '@ember/object';
import { on } from '@ember/object/evented';
import { getRandomIndex } from 'radio4000/utils/random-helpers';
import { EKMixin, keyUp } from 'ember-keyboard';

export default Component.extend(EKMixin, {
	store: service(),
	player: service(),
	tagNames: ['button'],
	classNames: ['Btn'],
	isVisible: not('keyboardActivated'),

	bindKeyboard: on(keyUp('KeyW'), function () {
		this.playRandomChannel();
	}),

	click() {
		this.playRandomChannel();
	},

	playRandomChannel() {
		const store = this.get('store');
		store.findAll('channel').then(data => {
			const channel = data.objectAt(getRandomIndex(data.content));
			channel.get('tracks').then(tracks => {
				if (tracks.length < 2) {
					this.playRandomChannel();
				} else {
					get(this, 'player').playTrack(tracks.get('lastObject'));
				}
			});
		});
	}
});
