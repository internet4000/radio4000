import Ember from 'ember';
import AsyncButton from 'ember-async-button/components/async-button';

const {Component, computed, get} = Ember;

export default AsyncButton.extend({
	tagName: 'button',
	classNames: ['Btn'],
	attributeBindings: ['title'],
	title: computed('isFavorite', {
		get() {
			if (!get(this, 'isFavorite')) {
				return 'Save this radio to your favorites';
			}
			return 'Remove this radio from your favorites';
		}
	}),
	actions: {
		toggleFavorite() {
			return get(this, 'toggleFavorite').perform();
		},
		click() {
			return get(this, 'action')();
		}
	}
});
