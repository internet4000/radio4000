App.PlaybackView = Ember.View.extend({
	didInsertElement: function() {
		console.log(ytPlayer);
		this.scheduleAPI();
	},

	scheduleAPI: (function(){
		// scheduleOnce debounces applyMasonry to only run once per
		// runloop. scheduleMasonry is called on didInsertElement, and
		// whenever controller.images changes.
		console.log(ytPlayer);
		Ember.run.scheduleOnce('afterRender', this, this.applyAPI);
	}).observes('controller.model'),

	applyAPI: function(){
		console.log(ytPlayer);
		// ytPlayer = new YT.Player('ytplayer', playerOptions);
	},

	// srcChanged: function() {
	// 	this.get('sound').rerender();
	// }.observes('src'),

	youtube: function(){}
});


// http://emberjs.com/guides/understanding-ember/the-view-layer/
