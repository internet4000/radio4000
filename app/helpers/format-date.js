import Ember from 'ember';
import moment from 'moment';

export function formatDate(params) {
	// Sometimes params is the number we want, other times it's an array?!
	// Must be something with the way ember test consumes the helper.
	let date;
	if (typeof params === 'number') {
		date = params;
	} else {
		date = Number(params[0]);
	}
	return moment(date).fromNow();
}

export default Ember.Helper.helper(formatDate);

// return window.moment(params).format('MMM Do YY');
// return window.moment(params).subtract(1, 'days').fromNow();
