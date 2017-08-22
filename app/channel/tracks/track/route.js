import Ember from 'ember';

const {Route} = Ember;

export default Route.extend({
	model(params) {
		return this.store.query('track', {
			orderBy: 'id',
			equalTo: params.track_id
		});
	},
	afterModel(model) {
		console.log('model', model)
	}
});
