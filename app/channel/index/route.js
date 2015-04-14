import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		var model = Ember.A([]);

		this.modelFor('channel').get('tracks').then((tracks) => {
			model.addObjects(tracks);
		});

		return model;
	}
});
