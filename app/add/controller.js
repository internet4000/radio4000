import Ember from 'ember';
import createTrackMixin from 'radio4000/mixins/create-track';

const {Controller, get} = Ember;

export default Controller.extend(createTrackMixin, {
	queryParams: ['url'],
	url: null,

	actions: {
		goBack() {
			const userChannel = get(this, 'model');
			this.transitionToRoute('channel', userChannel);
		},
		saveTrack(trackProperties) {
			const channel = get(this, 'session.currentUser.channels.firstObject');
			this.createTrack(trackProperties, channel).then(() => {
				// Reset the query param
				this.set('url', null);
				// this.transitionToRoute('channel', channel);
			});
		}
	}
});
