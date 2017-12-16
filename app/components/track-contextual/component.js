import Component from '@ember/component';

const { get } = Ember;

export default Component.extend({
	classNames: ['Track-contextual', 'ContextualToggle'],

	actions: {
		editTrack() {
			get(this, 'onEdit')()
		},
		handleSelect(event) {
			const el = event.target;
			const value = el.options[el.selectedIndex].value;
			this.send(value);
		}
	}
});
