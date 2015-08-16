import Ember from 'ember';

export default Ember.Component.extend({
	track: null,

	actions: {
		submit() {
			this.sendAction('submit', this.get('track'));
		},
		cancel() {
			this.sendAction('cancel');
		},
		deleteTrack() {
			this.sendAction('deleteTrack', this.get('track'));
		}
	}
});
