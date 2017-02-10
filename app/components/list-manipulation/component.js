import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	items: null,
	manipulatedItems: computed('items', function() {
		return this.get('items').reverseObjects();
	})

});
