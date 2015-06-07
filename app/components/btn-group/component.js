/*global $*/
import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'menu',
	classNames: ['BtnGroup'],

	attachButtonHandlers: Ember.on('didInsertElement', function() {
		this.$('Btn').on('click', (event) => {
			let $clicked = $(event.currentTarget);
			let $notClicked = this.$('.Btn').not($clicked);

			$clicked.addClass('is-active');
			$notClicked.removeClass('is-active');
		});
	})
});
