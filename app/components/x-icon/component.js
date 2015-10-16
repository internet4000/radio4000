/**
 * {{x-icon i='play'}}
 **/

import Ember from 'ember';

const {computed} = Ember;

export default Ember.Component.extend({
	tagName: 'svg',

	// this creates a class name like "icon-iconName" (iconName comes from the variable "i")
	classNameBindings: ['className'],

	className: computed('i', function () {
		let iconName = this.get('i');
		return `icon-${iconName}`;
	}),

	url: computed('i', function () {
		let iconName = this.get('i');
		return `images/icons/sprite.svg#icon-${iconName}`;
	})
});
