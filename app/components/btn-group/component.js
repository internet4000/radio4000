/*global $*/
import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'menu',
	classNames: ['BtnGroup'],

	buttonHandlers: function() {
		var self = this;

		self.$('.Btn').on('click', function() {
			var $clicked = $(this);

			$clicked.addClass('is-active');
			self.$('.Btn').not($clicked).removeClass('is-active');
		});
	}.on('didInsertElement')
});
