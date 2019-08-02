import Ember from 'ember';

const {Route,
	inject} = Ember;

export default Route.extend({
	player: inject.service(),
	renderTemplate: function() {
		this.render({
			into: 'application'
		});
	}
});
