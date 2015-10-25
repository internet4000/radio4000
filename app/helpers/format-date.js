import Ember from 'ember';

export default Ember.Helper.helper(function (params) {
	// moment needs a number, not a string
	const date = Number(params[0]);
	// return window.moment(params).format('MMM Do YY');
	// return window.moment(params).subtract(1, 'days').fromNow();
	return window.moment(date).fromNow();
});
