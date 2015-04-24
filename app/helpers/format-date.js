import Ember from 'ember';

export function formatDate(params/*, hash*/) {

	// moment needs a number, not a string
	let date = Number(params[0]);

	// return window.moment(params).format('MMM Do YY');
	// return window.moment(params).subtract(1, 'days').fromNow();
	return window.moment(date).fromNow();
}

export default Ember.HTMLBars.makeBoundHelper(formatDate);
