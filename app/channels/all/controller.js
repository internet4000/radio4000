import Ember from 'ember';

const {Controller, computed} = Ember;

export default Controller.extend({
	queryParams: ['search'],
	search: '',
	sortKey: 'created',
	sortDirection: 'desc',

	// Only show channels that have tracks.
	channels: computed.filter('model', m => m.get('totalTracks'))
});
