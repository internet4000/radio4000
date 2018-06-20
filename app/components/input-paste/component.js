import Ember from 'ember'
import FocusInput from 'radio4000/components/focus-input/component'

const {run, debug} = Ember

export default FocusInput.extend({
	didInsertElement() {
		this._super()
		this.capturePaste()
	},

	capturePaste() {
		const component = this
		const element = this.element
		const $input = this.$()

		// use jQuery's 'paste' event
		this.$().on('paste', function() {
			// without run loop, the pasted value isn't available yet
			run.schedule('afterRender', function() {
				// don't submit if field is invalid
				if (element.validity.typeMismatch) {
					debug('input not valid')
					return
				}

				// actions up!
				component.sendAction('onPaste', $input.val())
			})
		})
	}
})
