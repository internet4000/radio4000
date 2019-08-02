import Ember from 'ember';

const {Route,
	get,
	inject} = Ember;

export default Route.extend({
	player: inject.service(),
	renderTemplate: function() {
		this.render({
			into: 'application'
		});
	}
});
