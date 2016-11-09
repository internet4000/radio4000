import Ember from 'ember';
import createTrackMixin from 'radio4000/mixins/create-track';

const {Controller, get} = Ember;

export default Controller.extend(createTrackMixin, {
	queryParams: ['isEmbed', 'isInverted'],
	isEmbed: false,
	isInverted: false,
	showAddTrack: false,
	newUrl: null,

	actions: {
		saveTrack(trackProperties) {
			const channel = get(this, 'session.currentUser.channels.firstObject');
			return this.createTrack(trackProperties, channel).then(() => {
				this.setProperties({
					showAddTrack: false,
					newUrl: null
				});
			});
		}
	}
});
