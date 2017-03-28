import Ember from 'ember';

export function eq([a, b]) {
	return a === b;
}

export default Ember.Helper.helper(eq);
