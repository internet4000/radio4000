import Ember from 'ember';

const {on, $} = Ember;

export default Ember.Component.extend({
	classNames: ['BtnGroup'],

	attachButtonHandlers: on('didInsertElement', function () {
		const $buttons = this.$().find('.Btn');

		$buttons.on('click', event => {
			const $clicked = $(event.currentTarget);
			const $notClicked = $buttons.not($clicked);

			$clicked.addClass('is-active');
			$notClicked.removeClass('is-active');
		});
	})
});
