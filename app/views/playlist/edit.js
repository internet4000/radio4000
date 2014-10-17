import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		this._super();
		// autofocus on the url field
		this.$('input:first');
	}
});
