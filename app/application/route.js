import Ember from 'ember';

const { debug } = Ember;

export default Ember.Route.extend({
	beforeModel: function() {

		// refresh (fetch) any cached user session
		return this.get('session').fetch().then(() => {
			// debug('got a session');
		}, () => {
			// debug('no session');
		});
	},

	recordInitialHistoryLength: Ember.on('init', function() {
    this.set('initialHistoryLength', window.history.length);
  }),

	actions: {
		logout() {
			this.get('session').close().then(() => {
				this.transitionTo('application');
			});
		},

		goBack() {
			let history = window.history;
			let wouldExit = history.length > this.get('initialHistoryLength');

			console.log(history.state.path);

			if (history.state.path === '/') {
				debug('already at root');
				// this.transitionTo('application');
			} else if (wouldExit) {
				debug('window back');
        history.back();
      } else {
				debug('to application');
        this.transitionTo('application');
      }
		}
	}
});
