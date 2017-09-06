import Ember from 'ember';

const {TextField, get} = Ember;

export default TextField.extend({
	// User param
	select: false,

	// http://emberjs.com/guides/cookbook/user_interface_and_interaction/focusing_a_textfield_after_its_been_inserted/
	didInsertElement() {
		this._super(...arguments);
		this.element.focus();

		if (get(this, 'select')) {
			this.element.select();
		}
	},

	click() {
		this.$().select();
	}
});
