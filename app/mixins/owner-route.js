import Ember from 'ember';

const {debug, Mixin} = Ember;

export default Mixin.create({
	afterModel(model) {
		const userChannelId = this.get('session.currentUser.channels.firstObject.id');
		const userOwnsTheChannel = model.get('id') === userChannelId;

		if (!userOwnsTheChannel) {
			debug('user does not own the channel --> login');
			this.transitionTo('login');
		}

		this._super(...arguments);
	}
});
