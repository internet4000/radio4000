import Ember from 'ember';

export default Ember.Route.extend({
	// todo: this is repeated for channel/[add,edit,delete]
	beforeModel(transition) {
		const authed = this.get('session.isAuthenticated');
		if (!authed) {
			transition.abort();
			this.transitionTo('signin');
		}

		const userChannel = this.get('session.currentUser.channels.firstObject');
		if (!userChannel) {
			transition.abort();
			this.transitionTo('signin');
		}

		const canEdit = userChannel.get('id') === this.modelFor('channel').get('id');
		if (!canEdit) {
			transition.abort();
			this.transitionTo('signin');
		}
	},

	// Create a new track for the channel
	model() {
		Ember.debug('add model');
		return this.store.createRecord('track', {
			channel: this.modelFor('channel')
		});
	},

	actions: {
		//  this action is triggered from the add.js controller/template
		saveTrack() {
			var channel = this.modelFor('channel');
			var track = this.modelFor('channel.add');

			track.updateProvider();

			track.save().then(function() {
				// And add it to the tracks property of the channel
				Ember.RSVP.Promise.cast(channel.get('tracks')).then(function(tracks) {
					tracks.addObject(track);
					channel.save().then(function() {
						Ember.debug('Success: Track saved to channel');
					});
				});
			});

			// Go back!
			this.transitionTo('channel', channel);
		}
	},

	// clear any unsaved changes
	deactivate() {
		this.get('currentModel').rollback();
	}
});
