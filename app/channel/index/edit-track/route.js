import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		this.store.find('track', params.id);
	},
	actions: {
		saveTrack() {
			console.log('save track');
			// const track = this.get('track');

			// // todo: this shouldn't be necessary
			// track.updateProvider();

			// this.send('cancelEdit');
			// track.save().then(() => {
			// 	Ember.debug('Saved track');
			// });
		},

		deleteTrack() {
			console.log('delete track');
			// let track = this.get('track');
			// // let channel = this.get('track.channel');

			// track.get('channel').then((channel) => {
			// 	// // first remove from parent
			// 	channel.get('tracks').then((tracks) => {
			// 		tracks.removeObject(track);
			// 		channel.save();

			// 		this.send('cancelEdit');

			// 		// then itself
			// 		track.destroyRecord();
			// 	});
			// });
		}
	}
});

// close 'add track' on esc key
// keyDown(event) {
// 	if (event.keyCode === 27) {
// 		this.send('cancelEdit');
// 	}
// },
