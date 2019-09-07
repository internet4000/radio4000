import Component from '@ember/component';
import {get, computed} from '@ember/object';

export default Component.extend({
	tracksWithoutTag: computed('tracks', function() {
		const tracks = get(this, 'tracks')

		if (!tracks) return []

		return tracks.filter(i => {
			const t = get(i, 'tags')
			if (!t) return true
			return false
		})
	})
});
