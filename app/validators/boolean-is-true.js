import BaseValidator from 'ember-cp-validations/validators/base';

const BooleanIsTrue = BaseValidator.extend({
	validate(value) {
		if (value) {
			return true;
		}
		return false;
	}
});

export default BooleanIsTrue;
