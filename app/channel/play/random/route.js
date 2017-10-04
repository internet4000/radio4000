import Ember from 'ember';
import {getRandomIndex} from 'radio4000/utils/random-helpers';

const {Route, inject, get} = Ember;

export default Route.extend({
	player: inject.service('player'),

	afterModel(model) {

		const tracks = model.get('tracks');

		if(tracks) {
			const randomIndex = getRandomIndex(tracks);
			const randomTrack = tracks.objectAt(randomIndex);
			get(this, 'player').playTrack(randomTrack);
		}

		this.transitionTo('channel');
	}
});
