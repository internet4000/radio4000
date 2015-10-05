import Ember from 'ember';

export default Ember.Mixin.create({

	// Used to determine when the window.history.back() would take
	// us out of the application (e.g. back to google, provided you came from there)
	recordInitialHistoryLength: Ember.on('init', function () {
		this.set('initialHistoryLength', window.history.length);
	}),

	actions: {
		goBack() {
			let history = window.history;
			Ember.debug('attempting to go back');
			Ember.debug(`current history: ${history.length}`);
			Ember.debug(`initial history: ${this.get('initialHistoryLength')}`);

			if (history.length > this.get('initialHistoryLength')) {
				history.back();
			} else {
				this.sendAction('goBack');
			}
		}
	}
});
