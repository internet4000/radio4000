// channel template
`<p><button {{action 'claim'}}>claim</button></p>`

// channel controller actions
```claim: function() {
	var user = this.get('session.user');
	var model = this.get('model');

	user.get('channels').then(function(channels) {
		channels.addObject(model);
		user.save().then(function() {
			Ember.debug('Success: channel removed from user');
		});
	}.bind(this));

	model.set('user', user);
	model.save().then(function() {
		Ember.debug('Success: channel removed from user');
	});
},```
