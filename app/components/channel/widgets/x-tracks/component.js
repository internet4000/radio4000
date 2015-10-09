import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['Widget'],
	smallList: false,
	// reverse the array of tracks
	reverse: false,

	trackToShowArray: [1, 2, 3],
	trackToShowIndex: 2,

	lastTracks: Ember.computed('tracks', 'trackToShowIndex', function () {
		let tracks;
		let index = this.get('trackToShowIndex');
		let array = this.get('trackToShowArray');

		if (this.get('reverse') === true) {
			tracks = this.get('tracks').toArray().reverse().slice(0, array[index]);
		} else {
			tracks = this.get('tracks').slice(0, array[index]);
		}

		return tracks;
	}),

	actions: {
		toggleNumber() {
			let index = this.get('trackToShowIndex');
			let array = this.get('trackToShowArray');
			if (index < array.length - 1) {
				this.set('trackToShowIndex', index + 1);
			} else {
				this.set('trackToShowIndex', 0);
			}
		}
	}
});
