import Ember from 'ember';

const {Component, computed, get, set, defineProperty} = Ember;

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
		defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
	},

	focusOut() {
		this._super(...arguments);
		set(this, 'showValidations', true);
	}

	// Use this to group labels and nested inputs. But we don't nest inputs yet.
	// fieldId: computed('valuePath', function () {
	// 	let id = get(this, 'elementId');
	// 	let valuePath = get(this, 'valuePath');
	// 	return `${id}_${valuePath}`;
	// }),
});

