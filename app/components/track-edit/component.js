import TrackFormComponent from 'radio4000/components/track-form/component';

export default TrackFormComponent.extend({
	actions: {
		cancel() {
			this._super();
			this.get('track').rollbackAttributes();
		},
		deleteTrack() {
			this.sendAction('deleteTrack', this.get('track'));
		}
	}
});
