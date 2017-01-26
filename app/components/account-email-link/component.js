import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['ProviderAccount'],
	actions: {
		link(email, password) {
			this.get('link')(email, password);
		}
}
});
