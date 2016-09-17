import Ember from 'ember';
import config from '../config/environment';

// Returns {boolean} if a single {string} matches the current environment.
export function isEnvironment(params) {
	// Because Ember sends params as an array in tempaltes, but not in tests.
	let env;
	if (typeof params === 'string') {
		env = params;
	} else {
		env = params[0];
	}
	return config.environment === env;
}

export default Ember.Helper.helper(isEnvironment);
