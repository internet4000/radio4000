import Ember from 'ember';

export default Ember.Component.extend({
	cachedQuery: '',

	// Wrap our results in an array we can use in our template
	results: Ember.A(),

	// Updates our results with YouTube videos from a query string
	findAll: Ember.observer('query', function() {
		let query = this.get('query');
		let url = encodeURIComponent(query);
		let endpoint = `http://gdata.youtube.com/feeds/api/videos?q=${url}&format=5&max-results=5&v=2&alt=jsonc`;

		// guard being called too early
		if (!query) {
			return;
		}

		// don't query short (useless) strings
		// and clear any previous results
		if (query.length < 4) {
			this.get('results').clear();
			return;
		}

		// don't query the same string twice
		if (query === this.get('cachedQuery')) {
			this.get('results').clear();
			return false;
		}

		// query!
		Ember.$.getJSON(endpoint).then((response) => {
			let tracks = response.data.items.map((item) => {
				return Ember.Object.create({
					url: item.player.default,
					title: item.title,
					ytid: item.id
				});
			});

			// Clear previous tracks
			this.get('results').clear();
			this.get('results').pushObjects(tracks);
		});
	}),

	actions: {
		add(item) {
			let $input = this.$().parents('form').find('input').eq(0);

			this.set('cachedQuery', item.get('title'));
			this.get('results').clear();
			this.sendAction('action', item);

			// this is a bit dirty, but puts focus back on the form
			// after selecting a search result, so the user can tap "enter" immediately to submit
			$input.focus();
		}
	}
});
