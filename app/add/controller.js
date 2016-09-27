import Ember from 'ember';
import createTrackMixin from 'radio4000/mixins/create-track';

const {Controller, get} = Ember;

export default Controller.extend(createTrackMixin, {
	queryParams: ['url'],
	url: null,

	actions: {
		saveTrack(trackProperties) {
			const channel = get(this, 'session.currentUser.channels.firstObject');
			return this.createTrack(trackProperties, channel);
		},
		goBack() {
			const userChannel = get(this, 'model');
			this.transitionToRoute('channel', userChannel);
		}
	}
});
