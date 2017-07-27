import Ember from 'ember';
import {task, timeout} from 'ember-concurrency';
import stringContains from 'radio4000/utils/string-contains';

const {get, isBlank} = Ember;

export default Ember.TextField.extend({
	classNames: ['ListSearch'],
	type: 'search',
	items: [],

	input() {
		const value = get(this, 'value');
		get(this, 'search').perform(value);
	},

	search: task(function * (query) {
		let results = null;
		const items = get(this, 'items');

		if (!isBlank(query)) {
			results = items.filter(item => {
				let title = get(item, 'title');
				let body = get(item, 'body');
				return stringContains(title, query) || stringContains(body, query);
			});
		}

		if (get(this, 'afterSearching')) {
			get(this, 'afterSearching')(results);
		}

		// Pause here for DEBOUNCE_MS milliseconds. Because this
		// task is `restartable`, if the user starts typing again,
		// the current search will be canceled at this point and
		// start over from the beginning. This is the
		// ember-concurrency way of debouncing a task.
		yield timeout(100);

		return results;
	}).keepLatest()
});

