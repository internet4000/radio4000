import Ember from 'ember';

let userChannel = Ember.Object.extend({
	hello: 'world'
});

export function initialize(container, application) {
	application.register('userChannel:main', userChannel);
	application.inject('controller', 'userChannel', 'userChannel:main');
	application.inject('route', 'userChannel', 'userChannel:main');
}

export default {
	name: 'userChannel',
	after: 'torii',
	initialize: initialize
};
