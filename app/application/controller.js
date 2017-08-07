import Ember from 'ember';
import createTrackMixin from 'radio4000/mixins/create-track';

const {Controller, get} = Ember;

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
