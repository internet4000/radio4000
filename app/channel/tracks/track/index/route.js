import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
	player: service(),
	afterModel(track) {
		get(this, 'player').playTrack(track);
	}
});
