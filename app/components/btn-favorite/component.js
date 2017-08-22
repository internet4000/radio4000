import Ember from 'ember';
import AsyncButton from 'ember-async-button/components/async-button';

const {Component, computed, get} = Ember;

export default AsyncButton.extend({
	attributeBindings: ['title'],
	classNames: ['Btn'],

	// async button
	action: 'toggleFavorite',

	toggleFavorite() {
		return get(this, 'channel.toggleFavorite').perform();
	},

	pending: 'Loading',

	// display text in template or only icon
	showText: true,

	title: computed('channel.isFavorite', {
		get() {
			if (!get(this, 'channel.isFavorite')) {
				return 'Save this radio to your favorites';
			}
			return 'Remove this radio from your favorites';
		}
	})
});
