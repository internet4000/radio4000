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
		return `icon-${this.get('i')}`;
	}),

	url: computed('i', function () {
		return `assets/images/icons/sprite.svg#icon-${this.get('i')}`;
	})
});
