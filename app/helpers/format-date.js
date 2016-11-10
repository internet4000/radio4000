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

	const oneWeekAgo = moment().subtract('week', 1);
	const updated = moment(date);
	const updatedDaysAgo = oneWeekAgo.diff(updated, 'days');

	if (updatedDaysAgo < 7) {
		return 'a week ago';
	}
	return updated.fromNow();
}

export default Ember.Helper.helper(formatDate);

