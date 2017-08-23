import Ember from 'ember';

const {Component,
			 inject,
			 computed,
			 get} = Ember;

export default Component.extend({
	tagName: ['button'],
	session: inject.service(),
	attributeBindings: ['title', 'disabled'],
	classNames: ['Btn'],
	disabled: computed('channel.toggleFavorite.isRunning', 'hasChannel', function() {
		return !get(this, 'hasChannel') || get(this, 'channel.toggleFavorite.isRunning')
	}),
	hasChannel: computed.reads('session.content.currentUser.channels.firstObject'),

	/* params */
	// channel to be added as favorite to user.session
	channel: null,
	// display text in template or only icon
	showText: true,

	title: computed('channel.isFavorite', {
		get() {
			if(!get(this, 'hasChannel')) {
				return 'You need to login and have a channel to add this one as favorite'
			}
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
