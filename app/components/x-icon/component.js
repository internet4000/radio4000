import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'svg',

	// this creates a class name like "icon-iconName" (iconName comes from the variable "i")
	classNameBindings: ['className'],

	className: function() {
		return 'icon-' + this.get('i');
	}.property('i'),

	url: function() {
		return 'images/icons/sprite.svg#icon-' + this.get('i');
	}.property('i')
});
