import Ember from 'ember';
const {Component, inject, get, on, computed} = Ember;
import {getRandomIndex} from 'radio4000/utils/random-helpers';
import {EKMixin, keyUp} from 'ember-keyboard';

export default Component.extend(EKMixin, {
	store: inject.service(),
	player: inject.service(),
	tagNames: ['button'],
	classNames: ['Btn'],
	attributeBindings: ['title'],
	title: 'Play a random Radio4000 channel',
	isVisible: computed.not('keyboardActivated'),

	bindKeyboard: on(keyUp('KeyR'), function () {
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
