/* global document */
import { inject as service } from '@ember/service';

import Route from '@ember/routing/route';
import { debug } from '@ember/debug';
import { get } from '@ember/object';

export default Route.extend({
	uiStates: service(),

	beforeModel() {
		const authed = get(this, 'session.isAuthenticated');
		const userChannels = get(this, 'session.currentUser.channels');

		if (!authed) {
			return this.transitionTo('auth.login');
		}

		// If the user has a channel, go to it
		if (userChannels) {
			return userChannels.then(channels => {
				const channel = get(channels, 'firstObject');
				if (channel) {
					debug(`already got channel -> transition to ${channel.get('title')}`);
					this.transitionTo('channel', channel);
				}
			});
		}
	},

	afterModel() {
		document.title = 'New - Radio4000';
	},

	// Don't render into the channels outlet.
	// This avoids the tabs we have on channels.hbs.
	renderTemplate() {
		this.render({into: 'application'});
	},

	deactivate() {
		this._super(...arguments);

		// Reset title if user creates two channels in the same session.
		this.setProperties({
			'controller.title': '',
			'controller.didCreate': false
		});

		// Reset document title.
		document.title = 'Radio4000';
	}
});
