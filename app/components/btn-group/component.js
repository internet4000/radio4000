import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'menu',
	classNames: ['BtnGroup'],

	attachButtonHandlers: Ember.on('didInsertElement', function() {
		let $buttons = this.$().find('.Btn');

		$buttons.on('click', (event) => {
			let $clicked = Ember.$(event.currentTarget);
			let $notClicked = $buttons.not($clicked);

			$clicked.addClass('is-active');
			$notClicked.removeClass('is-active');
		});
	})
});
