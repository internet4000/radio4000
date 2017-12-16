import Component from '@ember/component';

export default Component.extend({
	classNames: ['Track-contextual', 'ContextualToggle'],
	actions: {
		test(event) {
			console.log('event', event)
			console.log('event.target', event.target)
			console.log('event.target.value', event.target.value)
		}
	}
});
