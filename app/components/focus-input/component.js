import TextField from '@ember/component/text-field'
import {get} from '@ember/object'

// http://emberjs.com/guides/cookbook/user_interface_and_interaction/focusing_a_textfield_after_its_been_inserted/

export default TextField.extend({
	// props
	autoFocus: false,
	autoSelect: false,

	didInsertElement() {
		this._super(...arguments)

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
