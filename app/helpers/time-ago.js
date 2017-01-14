import Ember from 'ember';
import isToday from 'npm:date-fns/is_today';
import addHours from 'npm:date-fns/add_hours';
import distanceInWordsToNow from 'npm:date-fns/distance_in_words_to_now';

// Takes a date (object or number) and returns "time ago"
export function timeAgo([date]) {
	if (isToday(date)) {
		date = addHours(date, 25);
	}
	return `${distanceInWordsToNow(date)} ago`;
}

export default Ember.Helper.helper(timeAgo);

