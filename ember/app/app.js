import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var Utility = Ember.Object.extend({

	/**
	 * Return a user from the store. If the user doesn't exist, create a new user
	 *
	 * @param {String} username
	 * @return {Promise}
	 */

	getUserByUsername: function(user) {
		var store = this.get('store');
		// console.log(user);

		return this.get('store').find('user', user.id).then(function() {
			// User already exists so just return it
			Ember.debug('user already exists');
			return user;

		}, function() {
			Ember.debug('A user could not be found, so create a new one');

			// HACK: `find()` creates an entry in store.typeMapFor().idToRecord which prevents `createRecord()` from working
			delete store.typeMapFor(store.modelFor('user')).idToRecord[user.displayName];

			var newUser = store.createRecord('user', {
				id: user.id,
				name: user.displayName,
				created: new Date().getTime()
			});

			// Save the user
			newUser.save();

			return newUser;
		});
	}
});

var App = Ember.Application.extend({
	modulePrefix: 'play', // TODO: loaded via config
	Resolver: Resolver,

	ready: function () {
		// Util
		this.register('utility:main', Utility, { singleton: true, instantiate: true });
		['controller', 'route', 'component', 'adapter', 'transform', 'model', 'serializer'].forEach(function(type) {
			this.inject(type, 'util', 'utility:main');
		}, this);

		// Store
		['component', 'utility:main'].forEach(function(type) {
			this.inject(type, 'store', 'store:main');
		}, this);

		// // Auth
		// this.register('auth:main', AuthController);
		// this.inject('route', 'auth', 'auth:main');
		// this.inject('controller', 'auth', 'auth:main');
	}
});

// Change the class used on active elements by Ember
Ember.LinkView.reopen({
	activeClass: 'is-active'
});

loadInitializers(App, 'play');


/**
 * Helpers
 */

Ember.Handlebars.helper('breaklines', function(value) {
	var escaped = Ember.Handlebars.Utils.escapeExpression(value);
	escaped = escaped.replace(/(\r\n|\n|\r)/gm, '<br>');
	return new Ember.Handlebars.SafeString(escaped);
});

Ember.Handlebars.helper('markdown', function(value) {
	return new Ember.Handlebars.SafeString(window.markdown.toHTML(value));
});

export default App;
