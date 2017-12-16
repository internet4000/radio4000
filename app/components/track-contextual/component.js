import Component from '@ember/component';

export default Component.extend({
	classNames: ['Track-contextual', 'ContextualToggle'],

	actions: {
		editTrack() {
			console.log('how!')
		},
		handleSelect(event) {
			const el = event.target;
			const value = el.options[el.selectedIndex].value;
			this.send(value)
		}
	}
});
