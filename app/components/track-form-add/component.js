import Ember from 'ember';
import TrackFormComponent from 'radio4000/components/track-form/component';
import {TrackValidations} from 'radio4000/models/track';

const {get, set} = Ember;

export default TrackFormComponent.extend({
	// By passing a `newUrl` property to this component,
	// we'll here set it to `track.url` (needed for ?add=queryParams)
	init() {
		// Create a track object that we later turn it to real track model
		const url = get(this, 'newUrl');
		const track = Ember.Object.create(TrackValidations, {url});
		console.log(track.get('url'));
		set(this, 'track', track);
		this._super(...arguments);
	}
});
