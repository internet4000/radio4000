import Ember from 'ember';

const { computed, observer, run } = Ember;

export default Ember.Controller.extend({
	search: '',
	queryParams: ['search'],
	isGrid: true,

	// this little pattern makes sets a property
	// maximum every X ms for performance
	watchSearch: observer('search', function() {
		run.throttle(this, this.runSearch, 500);
	}),

	// the property triggers the computed property to, well, compute!
	runSearch() {
		this.set('realSearch', this.get('search'));
	},

	// filters out models where title or body matches the search
	// it watches 'realSearch' instead of 'search' so we can
	// debounce for performance
	channels: computed('realSearch', function() {
		let search = this.get('search');
		let model = this.get('model');

		if (!search) { return model; }

		let stringContains = function(string) {
			if (!string) { return false; }
			return string.toLowerCase().indexOf(search.toLowerCase()) >= 0;
		};

		return model.filter((item) => {
			return stringContains(item.get('title')) || stringContains(item.get('body'));
		});
	}),

	// sorts our filtered model
	sortedChannels: Ember.computed('channels.[]', function() {
		return Ember.ArrayProxy.extend(Ember.SortableMixin).create({
			sortProperties: ['created'],
			sortAscending: false,
			content: this.get('channels')
		});
  }),

	actions: {
		sortBy(property) {
			let items = this.get('sortedChannels');

			items.setProperties({
				sortAscending: !items.get('sortAscending'),
				sortProperties: [property]
			});
		},
		toggleView() {
			this.toggleProperty('isGrid');
		}
	}
});
