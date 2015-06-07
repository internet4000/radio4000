import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'ul',
	classNames: ['List'],
	classNameBindings: ['showCover:List--cover'],
	showCover: false

	// In the future it could provide sorting, filtering etc.
});
