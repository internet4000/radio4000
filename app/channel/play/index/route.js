import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
	player: service('player'),

	afterModel(model) {
		const tracks = model.get('tracks');
		const firstTrack = tracks.get('lastObject');
		if (firstTrack) {
			get(this, 'player').playTrack(firstTrack);
		}
		this.transitionTo('channel');
	}
});
