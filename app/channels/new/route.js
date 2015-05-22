import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel() {
		let channels = this.get('session.currentUser.channels');

		// if not authed, go back to login
		if (!this.get('session.isAuthenticated')) {
			Ember.debug('not authed --> login');
			return this.transitionTo('login');
		}

		// else check if the user has a channel already
		return channels.then((channels) => {
			let channel = channels.get('firstObject');

			if (channel) {
				Ember.debug('transition to ' + channel.get('title'));
				return this.transitionTo('channel', channel);
			}
		});

		// return this.get('session').fetch().then(() => {
		// 	Ember.debug('fetch from new');
		// });
		// channels.get('firstObject').then(() => {
		// 	Ember.debug('got uc');
		// }, () => {
		// 	Ember.debug('no uc');
		// });

		 // else if (userChannel) {
		// 	Ember.debug('aready have channel --> channel');
		//

		// 	userChannel.then()

		//
		// }
	},
	model() {
		// return this.store.createRecord('channel');
	},
	afterModel() {
		document.title = 'New - Radio4000';
	},
	renderTemplate() {
		// don't render into channels outlet - this avoids the tabs we have on channels.hbs
		this.render({
			into: 'application'
		});
	},

	activate() {
		// set minimal ui style
		this.controllerFor('application').set('isMinimalUi', true);
		this.controllerFor('application').set('isMinimalUiAnimation', true);
	},
	deactivate() {
		// remove minimal ui style
		this.controllerFor('application').setProperties({
			isMinimalUi: false,
			isMinimalUiAnimation: false
		});

		// reset document title
		document.title = 'Radio4000';
	}
});
