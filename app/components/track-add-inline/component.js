import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'form',
	classNames: ['Form', 'Form--addTrack'],

	submit(event) {
		event.preventDefault();
		this.get('onSubmit')();
	},

	actions: {
		didPasteUrl(url) {
			this.get('onSubmit')(url);
		}
	}
});
