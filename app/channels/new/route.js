import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	beforeModel() {
		let channels = this.get('session.currentUser.channels');

		// if not authed, go back to login
		if (!this.get('session.isAuthenticated')) {
			debug('not authed --> login');
			return this.transitionTo('login');
		}

		// else check if the user has a channel already
		return channels.then((channels) => {
			let channel = channels.get('firstObject');

			if (channel) {
				debug('transition to ' + channel.get('title'));
				return this.transitionTo('channel', channel);
			}
		});

		// return this.get('session').fetch().then(() => {
		// 	debug('fetch from new');
		// });
		// channels.get('firstObject').then(() => {
		// 	debug('got uc');
		// }, () => {
		// 	debug('no uc');
		// });

		 // else if (userChannel) {
		// 	debug('aready have channel --> channel');
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
	},
	deactivate() {
		// remove minimal ui style
		this.controllerFor('application').set('isMinimalUi', false);

		// reset document title
		document.title = 'Radio4000';
	}
});
