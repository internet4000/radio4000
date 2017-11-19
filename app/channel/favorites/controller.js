import Controller from '@ember/controller';

export default Controller.extend({
	queryParams: {
		sortKey: 'sort',
		sortDirection: 'direction'
	},
	sortKey: 'updated'
});
