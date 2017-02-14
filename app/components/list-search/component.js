import Ember from 'ember';
import {task, timeout} from 'ember-concurrency';
import stringContains from 'radio4000/utils/string-contains';

const {get, isBlank} = Ember;

export default Ember.Component.extend({
	tagName: 'form',
	classNames: ['Search'],

	// list: [],
	// query: '',

	search: task(function * (query) {
		const list = get(this, 'list');
		let results;

		if (isBlank(query)) {
			results = null;
			if (this.attrs.afterSearching) {
				this.attrs.afterSearching(results);
			}
			return results;
		}

		// Pause here for DEBOUNCE_MS milliseconds. Because this
		// task is `restartable`, if the user starts typing again,
		// the current search will be canceled at this point and
		// start over from the beginning. This is the
		// ember-concurrency way of debouncing a task.
		yield timeout(250);

		results = list.filter(item => {
			let title = get(item, 'title');
			let body = get(item, 'body');
			return stringContains(title, query) || stringContains(body, query);
		});

		if (this.attrs.afterSearching) {
			this.attrs.afterSearching(results);
		}

		return results;
	}).restartable()
});
