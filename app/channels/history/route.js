import Ember from 'ember';

const {inject, RSVP} = Ember;

export default Ember.Route.extend({
	playerHistory: inject.service(),
	model() {
		return RSVP.hash({
			userSettings: this.get('session.currentUser.settings')
		});
	},

	/*findLastTrackFromChannel(channel) {
		const ref = new Firebase(`https://radio4000-dev.firebaseio.com/channels/${channel.get('id')}`);
		return new Ember.RSVP.Promise((resolve, reject) => {
			ref.child('tracks').orderByKey().limitToLast(1).on('value', snapshot => {
				const id = Object.keys(snapshot.val())[0];
				this.store.findRecord('track', id).then(track => {
					resolve(track);
				}).catch(error => {
					reject(error);
				});
			});
		});
	},*/

	actions: {
		clearChannelHistory() {
			this.get('playerHistory').clearChannelHistory();
		}/*,
		lastUpdated(channel) {
			this.findLastTrackFromChannel(channel).then(track => {
				console.log(track.get('title'));
			});
		}*/
	}
});
