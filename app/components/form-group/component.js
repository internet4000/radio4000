import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { defineProperty, set, get } from '@ember/object';
import { run } from '@ember/runloop';

export default Component.extend({
	classNames: ['Form-group'],

	// model: object with validations mixin,
	// valuePath: '', // this is the property name on the model
	// label: '',
	// hint: '',
	// value: null, // will be set in init()
	// showValidations: false,

	init() {
		this._super(...arguments);
		let valuePath = get(this, 'valuePath');
		defineProperty(this, 'value', alias(`model.${valuePath}`));
	},

	childInputHasFocus() {
		let focusedElement = document.activeElement;
		let input = this.$('input');
		if (!input || !input[0]) {
			return;
		}
		return input[0].id === focusedElement.id;
	},

	focusOut() {
		this._super(...arguments);

		// If the nested input has autofocus this event will trigger.
		// and we don't want it to, since focus wasn't left by the user.
		run.schedule('afterRender', this, function () {
			if (this.childInputHasFocus()) {
				return;
			}
			set(this, 'showValidations', true);
		});
	}

	// Use this to group labels and nested inputs. But we don't nest inputs yet.
	// fieldId: computed('valuePath', function () {
	// 	let id = get(this, 'elementId');
	// 	let valuePath = get(this, 'valuePath');
	// 	return `${id}_${valuePath}`;
	// }),
});

