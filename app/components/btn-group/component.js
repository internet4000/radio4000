/*global $*/
import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'menu',
	classNames: ['BtnGroup'],

	attachButtonHandlers: Ember.on('didInsertElement', function() {
		this.$().on('click', '.Btn', (event) => {
			let $clicked = $(event.currentTarget);

			$clicked
				.addClass('is-active');

			this.$('.Btn').not($clicked)
				.removeClass('is-active');
		});
	})
});
