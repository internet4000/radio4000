import Ember from 'ember';
import createTrackMixin from 'radio4000/mixins/create-track';
import youtubeUrlToId from 'radio4000/utils/youtube-url-to-id';

const {Controller, get} = Ember;

export default Controller.extend(createTrackMixin, {
	queryParams: ['url', 'title', 'body'],

	// use these to prefill the track's properties
	url: null,
	title: null,
	body: null,

	actions: {
		saveTrack(trackProps) {
			// Reset query params.
			this.setProperties({
				url: null,
				title: null,
				body: null
			})

			// Where to save the track.
			const userChannel = get(this, 'model')

			// Copied tracks don't have a ytid. So we make sure there is one.
			if (!trackProps.get('ytid')) {
				trackProps.ytid = youtubeUrlToId(trackProps.url)
			}

			return this.get('createTrack').perform(trackProps, userChannel)
		},
		goBack() {
			history.back();
		}
	}
});
