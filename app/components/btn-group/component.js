/*global $*/
import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'menu',
	classNames: ['BtnGroup'],

	buttonHandlers: Ember.on('didInsertElement', function() {
		var self = this;

		this.$('.Btn').on('click', function() {
			var $clicked = $(this);

			$clicked.addClass('is-active');
			self.$('.Btn').not($clicked).removeClass('is-active');
		});
	})
});
