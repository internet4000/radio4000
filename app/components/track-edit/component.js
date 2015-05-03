import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		saveTrack() {
			this.sendAction('saveTrack', this.get('model'));
		},
		cancelEdit() {
			this.sendAction('cancelEdit', this.get('model'));
		},
		deleteTrack() {
			this.sendAction('deleteTrack', this.get('model'));
		}
	}
});
