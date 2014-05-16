import AuthController from "play/controllers/auth";

export default {
	name: "auth",
	after: "store",

	initialize: function(container, application) {

		// The object to be injected
		var auth = AuthController;

		// Register the object
		application.register('auth:main', auth, {  instantiate: false, singleton: true });

		// Inject it
		// container.typeInjection('controller', 'auth', 'auth:main');
		// container.typeInjection('route', 'auth', 'auth:main');
		// container.typeInjection('component', 'auth', 'auth:main');
	}
};
