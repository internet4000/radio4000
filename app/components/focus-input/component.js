import Ember from 'ember'

const { TextField, get } = Ember

// http://emberjs.com/guides/cookbook/user_interface_and_interaction/focusing_a_textfield_after_its_been_inserted/

export default TextField.extend({
	// props
	autoFocus: false,
	autoSelect: false,

	didInsertElement() {
		this._super(...arguments)

		// ember-keyboard prevents key-events when a TextField is focused.
		// This reverses it so the parent modal can close on "Escape."
		this.set('keyboard.isPropagationEnabled', true)

		if (get(this, 'autoFocus')) {
			this.element.focus()

			if (get(this, 'autoSelect')) {
				this.element.select()
			}
		}
	},

	click() {
		if (get(this, 'autoSelect')) {
			this.element.select()
		}
	}
})
