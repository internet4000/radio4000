import Ember from 'ember';

const {Route,
			 get,
			 inject} = Ember;

export default Route.extend({
	player: inject.service(),
	afterModel(track) {
		console.log(track)
		get(this, 'player').playTrack(track);
	}
});
