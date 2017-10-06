import { helper } from '@ember/component/helper';
import addHours from 'npm:date-fns/add_hours';
import differenceInHours from 'npm:date-fns/difference_in_hours';
import distanceInWordsToNow from 'npm:date-fns/distance_in_words_to_now';

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

export default helper(timeAgo);

