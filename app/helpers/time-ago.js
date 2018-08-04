import Ember from 'ember';
import addHours from 'date-fns/add_hours';
import differenceInHours from 'date-fns/difference_in_hours';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

// Accepts a Date object or Number timestamp
// Returns a string like "x days ago" or "x months ago"
// but never a value below "1 day" for a little delayed privacy.

export function timeAgo([date]) {
	const diff = differenceInHours(new Date(), date);
	if (diff < 24) {
		date = addHours(date, 25);
	}
	return `${distanceInWordsToNow(date)} ago`;
}

export default Ember.Helper.helper(timeAgo);
