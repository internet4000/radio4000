import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['url'],
	url: null,

	actions: {
		saveTrack() {
			// reset the query param
			this.set('url', '');
			// transition out
			this.send('backToChannel');
			// leave it to the channel route to actually save the track
			return true;
		},

		// used by 'ESC' key in the view
		backToChannel() {
			this.transitionToRoute('channel.index', this.get('session.currentUser.channels.firstObject'));
		}
	}
});
