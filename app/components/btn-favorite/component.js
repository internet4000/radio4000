import Ember from 'ember';

const {Component,
			 computed,
			 get} = Ember;

export default Component.extend({
	attributeBindings: ['title', 'disabled'],
	classNames: ['Btn'],
	disabled: computed.reads('channel.toggleFavorite.isRunning'),

	/* params */
	// channel to be added as favorite to user.session
	channel: null,
	// display text in template or only icon
	showText: true,

	title: computed('channel.isFavorite', {
		get() {
			if (!get(this, 'channel.isFavorite')) {
				return 'Save this radio to your favorites';
			}
			return 'Remove this radio from your favorites';
		}
	}),

	click() {
		return get(this, 'channel.toggleFavorite').perform();
	}
});
