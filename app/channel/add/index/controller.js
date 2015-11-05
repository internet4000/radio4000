import Ember from 'ember';
import createTrackMixin from 'radio4000/mixins/create-track';

export default Ember.Controller.extend(createTrackMixin, {
	queryParams: ['url'],
	url: null,

	actions: {
		saveTrack(trackProperties) {
			// Reset the query param.
			this.set('url', null);

			// Save via our mixin.
			this.createTrack(trackProperties, this.get('model'));

			// Transition out.
			this.send('backToChannel');
		},

		// used by the modal
		backToChannel() {
			this.transitionToRoute('channel.index', this.get('session.currentUser.channels.firstObject'));
		}
	}
});
