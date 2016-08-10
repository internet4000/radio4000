import Ember from 'ember';
import createTrackMixin from 'radio4000/mixins/create-track';

const {Controller, get, inject} = Ember;

export default Controller.extend(createTrackMixin, {
	player: inject.service(),
	uiStates: inject.service(),
	queryParams: ['isEmbed', 'isInverted'],
	isEmbed: false,
	isInverted: false,
	showAddTrack: false,
	newUrl: null,

	actions: {
		saveTrack(trackProperties) {
			const channel = get(this, 'session.currentUser.channels.firstObject');
			this.createTrack(trackProperties, channel).then(() => {
				this.set('showAddTrack', false);
			});
		}
	}
});
