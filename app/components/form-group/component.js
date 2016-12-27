import Ember from 'ember';

const {Component, computed, get, set, defineProperty} = Ember;

export default Component.extend({
	classNames: ['Form-group'],
	showValidations: false,

	// model: null,
	// valuePath: '',
	// label,
	// hint,
	// validation: null,
	// value: null,

	init() {
		this._super(...arguments);
		this._setValue();
		// defineProperty(this, 'validation', computed.readOnly(`model.validations.attrs.${valuePath}`));
	},

	_setValue() {
		let valuePath = get(this, 'valuePath');
		defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
	},

	fieldId: computed('valuePath', function () {
		let id = get(this, 'elementId');
		let valuePath = get(this, 'valuePath');
		return `${id}_${valuePath}`;
	}),

	focusOut() {
		this._super(...arguments);
		set(this, 'showValidations', true);
	}
});
