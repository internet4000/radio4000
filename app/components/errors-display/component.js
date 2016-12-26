import Ember from 'ember';

const {computed, get, defineProperty} = Ember;

export default Ember.Component.extend({
	classNames: ['ErrorsDisplay'],
	classNameBindings: ['showErrorClass:has-error', 'isValid:has-success'],
	model: null,
	valuePath: '',
	showValidations: true,
	didValidate: false,

	// These two are set on init.
	validation: null,
	value: null,

	notValidating: computed.not('validation.isValidating').readOnly(),
	hasContent: computed.notEmpty('value').readOnly(),
	hasWarnings: computed.notEmpty('validation.warnings').readOnly(),
	isValid: computed.and('hasContent', 'validation.isTruelyValid').readOnly(),
	shouldDisplayValidations: computed.or('showValidations', 'didValidate', 'hasContent').readOnly(),

	showErrorClass: computed.and('notValidating', 'showErrorMessage', 'hasContent', 'validation').readOnly(),
	showErrorMessage: computed.and('shouldDisplayValidations', 'validation.isInvalid').readOnly(),
	showWarningMessage: computed.and('shouldDisplayValidations', 'hasWarnings', 'isValid').readOnly(),

	init() {
		this._super(...arguments);
		let valuePath = get(this, 'valuePath');

		defineProperty(this, 'validation', computed.readOnly(`model.validations.attrs.${valuePath}`));
		defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
	},

	focusOut() {
		this._super(...arguments);
		this.set('showValidations', true);
	}
});

