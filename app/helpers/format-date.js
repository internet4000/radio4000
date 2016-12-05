import Ember from 'ember';
import distanceInWordsToNow from 'npm:date-fns/distance_in_words_to_now';
// import addHours from 'npm:date-fns/add_hours';

export function formatDate(params) {
	let date;

	// Sometimes `params` is the number we want, other times it's an array?!
	// Must be something with the way ember tests consume the helper.
	if (typeof params === 'number') {
		date = params;
	} else {
		date = Number(params[0]);
	}

	return `${distanceInWordsToNow(date)} ago`;
}

export default Ember.Helper.helper(formatDate);
