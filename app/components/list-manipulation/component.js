import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	items: null,
	mItems: computed('items', function() {
		return this.get('items').slice().reverseObjects();
	})
});
