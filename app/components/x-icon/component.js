/**
 * {{x-icon i='play'}}
 **/


import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'svg',

	// this creates a class name like "icon-iconName" (iconName comes from the variable "i")
	classNameBindings: ['className'],

	className: Ember.computed('i', function() {
		let iconName = this.get('i');
		return `icon-${iconName}`;
	}),

	url: Ember.computed('i', function() {
		let iconName = this.get('i');
		return `images/icons/sprite.svg#icon-${iconName}`;
	})
});
