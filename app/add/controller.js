import Controller from '@ember/controller';
import { get } from '@ember/object';
import createTrackMixin from 'radio4000/mixins/create-track';

export default Controller.extend(createTrackMixin, {
	queryParams: ['url'],
	url: null,

	actions: {
		saveTrack(trackProperties) {
			this.set('url', null);
			const userChannel = get(this, 'model');
			return this.get('createTrack').perform(trackProperties, userChannel);
		},
		goBack() {
			const userChannel = get(this, 'model');
			this.transitionToRoute('channel', userChannel);
		}
	}
});
