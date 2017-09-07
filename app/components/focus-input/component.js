import Ember from 'ember';

const {TextField, get} = Ember;

export default TextField.extend({
	// props
	autoFocus: false,
	autoSelect: false,

	// http://emberjs.com/guides/cookbook/user_interface_and_interaction/focusing_a_textfield_after_its_been_inserted/
	didInsertElement() {
		this._super(...arguments);

		if (get(this, 'autoFocus')) {
			this.element.focus();

			if (get(this, 'autoSelect')) {
				this.element.select();
			}
		}
	},

	click() {
		if (get(this, 'autoSelect')) {
			this.element.select();
		}
	}
});
