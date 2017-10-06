import { debug } from '@ember/debug';
import Mixin from '@ember/object/mixin';
import { isEqual } from '@ember/utils';

export default Mixin.create({
	afterModel(model) {
		const session = this.get('session');
		const userChannel = session.get('currentUser.channels.firstObject');
		if (!userChannel || !isEqual(model.id, userChannel.id)) {
			debug('user does not own the channel --> login');
			this.transitionTo('auth.login');
		}
		this._super(...arguments);
	}
});
