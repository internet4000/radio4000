import Ember from 'ember';

const {$} = Ember;

export default Ember.Component.extend({
	classNames: ['BtnGroup'],

	didInsertElement() {
		this._super()
		this.attachButtonHandlers()
	},

	attachButtonHandlers() {
		const $buttons = this.$().find('.Btn');

		$buttons.on('click', event => {
			const $clicked = $(event.currentTarget);
			const $notClicked = $buttons.not($clicked);

			$clicked.addClass('is-active');
			$notClicked.removeClass('is-active');
		});
	}
});
