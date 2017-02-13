import Ember from 'ember';

const {debug, Mixin, isEqual} = Ember;

export default Mixin.create({
	afterModel(model) {
		const session = this.get('session');
		const userChannel = session.get('currentUser.channels.firstObject');
		if (!userChannel || !isEqual(model.id, userChannel.id)) {
			debug('user does not own the channel --> login');
			this.transitionTo('login');
		}
		this._super(...arguments);
	}
});
