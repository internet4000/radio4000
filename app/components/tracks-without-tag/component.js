import Component from '@ember/component';
import {get, computed} from '@ember/object';

export default Component.extend({
	tracksWithoutTag: computed('tracks', function() {
		return get(this, 'tracks').filter(i => {
			const t = get(i, 'tags')
			if (!t) return true
		})
	})
});
