import Controller from '@ember/controller';

export default Controller.extend({
	// Alias the properties for shorter params.
	queryParams: {
		sortKey: 'sort',
		sortDirection: 'direction'
	},

	// Default sorting.
	sortKey: 'updated',
	sortDirection: 'desc'
})
