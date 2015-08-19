export function initialize(/* container, application */) {
	// application.inject('route', 'foo', 'service:foo');
}

// this adds the ember router into our player service
// which means we can use transitionTo etc. in there.

export default {
	name: 'player-route',
	initialize(_, app) {
		app.inject('service:player', 'router', 'router:main');
	}
};
