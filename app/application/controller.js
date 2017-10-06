import Controller from '@ember/controller';
import { get } from '@ember/object';
import createTrackMixin from 'radio4000/mixins/create-track';

export default Controller.extend(createTrackMixin, {
	newUrl: null,
	showAddTrack: false,

	actions: {
		saveTrack(props) {
			const channel = get(this, 'session.currentUser.channels.firstObject');
			return this.get('createTrack').perform(props, channel).then(() => {
				this.setProperties({
					showAddTrack: false,
					newUrl: null
				});
			});
		}
	}
});
