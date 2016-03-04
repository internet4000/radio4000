import Ember from 'ember';
import moment from 'moment';

export function formatDate(params) {
	// moment needs a number, not a string
	const date = Number(params[0]);
	return moment(date).fromNow();
}

export default Ember.Helper.helper(formatDate);

// return window.moment(params).format('MMM Do YY');
// return window.moment(params).subtract(1, 'days').fromNow();
