import Ember from 'ember';
import createTrackMixin from 'radio4000/mixins/create-track';

const {Controller, get} = Ember;

export default Controller.extend(createTrackMixin, {
	queryParams: ['url'],
	url: null,

	actions: {
		saveTrack(trackProperties) {
			this.set('url', null);
			const userChannel = get(this, 'model');
			return this.get('createTrack').perform(trackProperties, userChannel);
		},
		goBack() {
			const userChannel = get(this, 'model');
			this.transitionToRoute('channel', userChannel);
		}
	}
});
