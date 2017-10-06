import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
	classNames: ['Widget'],
	smallList: false,

	// reverse the array of tracks
	reverse: false,

	trackToShowArray: [1, 2, 3],
	trackToShowIndex: 2,

	lastTracks: computed('tracks', 'trackToShowIndex', function () {
		const index = this.get('trackToShowIndex');
		const array = this.get('trackToShowArray');
		const tracks = this.get('tracks');

		if (this.get('reverse') === true) {
			return tracks.toArray().reverse().slice(0, array[index]);
		}

		return tracks.slice(0, array[index]);
	}),

	actions: {
		toggleNumber() {
			const index = this.get('trackToShowIndex');
			const array = this.get('trackToShowArray');
			if (index < array.length - 1) {
				this.set('trackToShowIndex', index + 1);
			} else {
				this.set('trackToShowIndex', 0);
			}
		}
	}
});
