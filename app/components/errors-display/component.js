import {
  not,
  notEmpty,
  and,
  or,
  readOnly,
  alias
} from '@ember/object/computed';
import Component from '@ember/component';
import { defineProperty, get } from '@ember/object';

export default Component.extend({
	classNames: ['ErrorsDisplay'],
	classNameBindings: ['showErrorClass:has-error', 'isValid:has-success'],

	model: null,
	valuePath: '',
	showValidations: false,
	didValidate: false,

	// These two are set on init.
	validation: null,
	value: null,

	notValidating: not('validation.isValidating').readOnly(),
	hasContent: notEmpty('value').readOnly(),
	hasWarnings: notEmpty('validation.warnings').readOnly(),
	isValid: and('hasContent', 'validation.isTruelyValid').readOnly(),
	shouldDisplayValidations: or('showValidations', 'didValidate', 'hasContent').readOnly(),

	showErrorClass: and('notValidating', 'showErrorMessage', 'hasContent', 'validation').readOnly(),
	showErrorMessage: and('shouldDisplayValidations', 'validation.isInvalid').readOnly(),
	showWarningMessage: and('shouldDisplayValidations', 'hasWarnings', 'isValid').readOnly(),

	init() {
		this._super(...arguments);
		let valuePath = get(this, 'valuePath');
		defineProperty(this, 'validation', readOnly(`model.validations.attrs.${valuePath}`));
		defineProperty(this, 'value', alias(`model.${valuePath}`));
	}
});
