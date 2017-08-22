import Ember from 'ember';

const {Controller, get} = Ember;

export default Controller.extend({
	actions: {
		cancel() {
			get(this, 'model').rollbackAttributes();
			this.transitionToRoute('channel.tracks');
		}
	}
});
