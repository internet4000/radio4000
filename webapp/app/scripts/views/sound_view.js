App.SoundView = Ember.View.extend({
	// templateName: function() {

	//   return this.get('provider');
	// }.property().cacheable(),
	srcChanged: function() {
		this.get('sound').rerender();
	}.observes('src'),

	didInsertElement: function() {
		this.youtube();
	},

	youtube: function(){}
});
