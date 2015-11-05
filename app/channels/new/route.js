import Ember from 'ember';
const {debug} = Ember;

export default Ember.Route.extend({
	uiStates: Ember.inject.service(),

	beforeModel() {
		const authed = this.get('session.isAuthenticated');
		const userChannels = this.get('session.currentUser.channels');

		// if not authed, go back to login
		if (!authed) {
			debug('not authed -> login');
			return this.transitionTo('login');
		}

		// else check if the user already has a channel
		return userChannels.then(channels => {
			// as users are only allowed one channel, we only check the first
			let channel = channels.get('firstObject');

			if (channel) {
				debug('already got channel -> transition to ' + channel.get('title'));
				this.transitionTo('channel', channel);
			}
		});
	},

	afterModel() {
		document.title = 'New - Radio4000';
	},

	activate() {
		this.set('uiStates.isMinimal', true);
	},

	// don't render into the channels outlet
	// this avoids the tabs we have on channels.hbs
	renderTemplate() {
		this.render({into: 'application'});
	},

	deactivate() {
		this.set('uiStates.isMinimal', false);
		// Reset title if user creates two channels in the same session.
		this.setProperties({
			'controller.title': '',
			'controller.didCreate': false
		});

		// reset document title
		document.title = 'Radio4000';
	},

	actions: {

		// OK, saving a channel is a bit crazy because it involves
		// creating a channelPublic as well as setting those relationships.
		// Follow the comments and you'll be ok!

		saveChannel(channel) {
			const flashMessages = Ember.get(this, 'flashMessages');
			const user = this.get('session.currentUser');

			channel.save().then(channel => {
				// now the channel is saved
				debug('saved channel');

				// set relationship on user (who created the channel)
				user.get('channels').then(userChannels => {
					userChannels.addObject(channel);

					user.save().then(() => {
						debug('Saved channel on user.');

						// create public channel
						this.store.createRecord('channelPublic', {
							channel
						}).save()

							.then(channelPublic => {
								// now the channelPublic is saved, has an ID and can be used
								debug('saved channelPublic');

								// set relationships
								channel.setProperties({
									channelPublic
								});

								// save it again because of new relationships
								channel.save().then(channel => {
									// Redirect to the new channel and
									debug('redirect to the new channel');
									this.transitionTo('channel', channel);
									flashMessages.warning('Voilà! You now have a Radio4000 📻', {
										timeout: 10000
									});
									return channel;
								}, error => {
									return new Error('Could not create a new channel with its relationships.');
								})

							.then(() => {
								// Clean up controller
								this.controller.setProperties({
									isSaving: false
								});
							});
						});
					});
				});
			});
		}
	}
});
