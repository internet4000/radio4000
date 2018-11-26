import TextField from '@ember/component/text-field'
import {get} from '@ember/object'
import {on} from '@ember/object/evented'
import {keyUp} from 'ember-keyboard'

// http://emberjs.com/guides/cookbook/user_interface_and_interaction/focusing_a_textfield_after_its_been_inserted/

export default TextField.extend({
	// props
	autoFocus: false,
	autoSelect: false,

	didInsertElement() {
		this._super(...arguments)

		// ember-keyboard captures all keyboard events on TextField class,
		// so they don't bubble up. We want to allow bubbling but only for "Escape",
		// which closes modals.
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
	},

	allowEscapeKeyOnly: on(keyUp(), function(event, emberKeyboardEvent) {
		if (event.key !== 'Escape') {
			emberKeyboardEvent.stopPropagation()
		}
	})
})
