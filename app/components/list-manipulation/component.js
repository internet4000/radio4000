import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	// items: null,
	items: [
		{
			id: 1,
			title: 1,
			get: function () {return this.id}
		},
		{
			id: 2,
			title: 2,
			get: function () {return this.id}
		},
		{
			id: 3,
			title: 3,
			get: function () {return this.id}
		}
	],
	manipulatedItems: computed('items', function() {
		return this.get('items').reverseObjects();
	})

});
