import Ember from 'ember';

const {debug, Mixin} = Ember;

export default Mixin.create({
	afterModel(model) {
		const userChannel = this.get('session.currentUser.channels.firstObject.id');
		const userOwnsTheChannel = model.get('id') === userChannel.get('id');
		if (!userOwnsTheChannel) {
			debug('user does not own the channel --> login');
			this.transitionTo('login');
		}
		this._super(...arguments);
	}
});
