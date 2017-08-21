import Ember from 'ember';

const {Controller,
			 inject,
			 get,
			 set,
			 debug,
			 computed} = Ember;

export default Controller.extend({
	applicationController: inject.controller('application'),

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
