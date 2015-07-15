import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	// todo: this is repeated for channel/[add,edit,delete]
	beforeModel(transition) {
		const authed = this.get('session.isAuthenticated');
		if (!authed) {
			debug('not authed - transitioning to log in');
			transition.abort();
			this.transitionTo('login');
		}

		const userChannel = this.get('session.currentUser.channels.firstObject');
		if (!userChannel) {
			debug('no channel - transitioning to log in');
			transition.abort();
			this.transitionTo('login');
		}

		const canEdit = userChannel.get('id') === this.modelFor('channel').get('id');
		if (!canEdit) {
			debug('cant edit - transitioning to log in');
			this.transitionTo('login');
		}
	},

	// Create a new track for the channel
	model() {
		debug('add model');
		return this.store.createRecord('track', {
			channel: this.modelFor('channel')
		});
	},

	actions: {
		//  this action is triggered from the add.js controller/template
		saveTrack() {
			const channel = this.modelFor('channel');
			const track = this.modelFor('channel.add');

			track.updateProvider();

			track.save().then(function() {
				// And add it to the tracks property of the channel
				Ember.RSVP.Promise.cast(channel.get('tracks')).then(function(tracks) {
					tracks.addObject(track);
					channel.save().then(function() {
						debug('Success: Track saved to channel');
					});
				});
			});

			// Go back!
			debug('back to channel');
			this.transitionTo('channel', channel);
		}
	},

	// clear any unsaved changes
	deactivate() {
		this.get('currentModel').rollbackAttributes();
	}
});
