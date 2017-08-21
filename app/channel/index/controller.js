import Ember from 'ember';

const {Controller, get, set} = Ember;

export default Controller.extend({
	actions: {
		addTrack(url) {
			debug(`Trying to add ${url}`);
			get(this, 'applicationController').setProperties({
				newUrl: url,
				showAddTrack: true
			});
			set(this, 'addTrackUrl', '');
		}
	}
});
