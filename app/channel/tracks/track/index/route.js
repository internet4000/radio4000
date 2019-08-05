import Ember from 'ember';

const {Route} = Ember;

export default Route.extend({
	renderTemplate: function() {
		this.render({
			into: 'application'
		})
	}
});
