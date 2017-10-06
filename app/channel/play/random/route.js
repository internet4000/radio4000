import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { getRandomIndex } from 'radio4000/utils/random-helpers';

export default Route.extend({
	player: service('player'),

	afterModel(model) {
		const tracks = model.get('tracks');

		if (tracks) {
			const randomIndex = getRandomIndex(tracks.content);
			const randomTrack = tracks.objectAt(randomIndex);
			get(this, 'player').playTrack(randomTrack);
		}

		this.transitionTo('channel');
	}
});
