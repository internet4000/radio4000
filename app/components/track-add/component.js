import Ember from 'ember';
import TrackFormComponent from 'radio4000/components/track-form/component';

const {get, set} = Ember;

export default TrackFormComponent.extend({
	// By passing a `newUrl` property to this component,
	// we'll here set it to `track.url` (needed for ?add=queryParams)
	init() {
		// Create a track object that we later turn it to real track model
		const url = get(this, 'newUrl');
		set(this, 'track', {url});
		this._super(...arguments);
	}
});
