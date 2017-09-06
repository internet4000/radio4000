import Ember from 'ember';

const {Route} = Ember;

export default Route.extend({
	model() {
		console.log('track.edit.model', this.modelFor('channel.tracks.track'))
		return this.modelFor('channel.tracks.track');
	}
});
