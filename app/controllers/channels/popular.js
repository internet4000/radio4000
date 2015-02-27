import Ember from 'ember';

export default Ember.ArrayController.extend({
	max: 10,

	// what we use in our template
	filteredContent: function() {
		return this.get('random');
	}.property('random.[]'),

	// five random radios
	random: function() {
		var content = this.get('content');
		var randomContent = [];

		for (var i = this.get('max'); i >= 1; i--) {
			var random = Math.floor(Math.random() * content.get('length'));
			if (!randomContent.contains(random)) {
				randomContent.pushObject(content.objectAt(random));
			}
		}

		return  randomContent;
	}.property('content.[]'),

	// five newest radios
	newest: function() {
		return this.get('content').slice(0,this.get('max'));
	}.property('content.[]')
});
