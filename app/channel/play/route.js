import Ember from 'ember';

const {Route, inject, get} = Ember;

export default Route.extend({
	player: inject.service('player'),

	afterModel(model) {

		const tracks = model.get('tracks');

		if(tracks) {
			const firstTrack = tracks.get('lastObject');
			get(this, 'player').playTrack(firstTrack);
		}

		this.transitionTo('channel');
	}
});
