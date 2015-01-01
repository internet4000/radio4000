import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'menu',
	classNames: ['BtnGroup'],

	buttonHandlers: function() {
		var that = this;
		that.$('.Btn').on('click', function() {
			var $clicked = $(this);
			that.$('.Btn').not($clicked).removeClass('is-active');
			$clicked.addClass('is-active');
		});
	}.on('didInsertElement')
});
