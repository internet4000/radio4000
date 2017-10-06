/*
 Use like this in your templates:

 {{x-icon i="play"}}
 */

import Component from '@ember/component';

import { computed } from '@ember/object';

export default Component.extend({
	tagName: 'svg',

	// this creates a class name like "icon-iconName" (iconName comes from the variable "i")
	classNameBindings: ['className'],

	className: computed('i', function () {
		return `icon-${this.get('i')}`;
	}),

	url: computed('i', function () {
		return `/assets/images/sprite.svg#icon-${this.get('i')}`;
	})
});
