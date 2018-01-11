import Ember from 'ember';
import createTrackMixin from 'radio4000/mixins/create-track';

const {Controller, get} = Ember;

export default Controller.extend(createTrackMixin, {
	queryParams: ['url', 'title', 'body'],

	// use these to prefill the track's properties
	url: null,
	title: null,
	body: null,

	actions: {
		saveTrack(trackProperties) {
			this.set('url', null);
			const userChannel = get(this, 'model');
			return this.get('createTrack').perform(trackProperties, userChannel);
		},
		goBack() {
			history.back();
		}
	}
});
