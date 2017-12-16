import Component from '@ember/component';

export default Component.extend({
	classNames: ['Track-contextual', 'ContextualToggle'],

	optionValues: {
		'edit': () => {
			this.send('editTrack')
		}
	},

	actions: {
		editTrack() {
			console.log('edit track!')
		},
		handleSelect(event) {
			const el = event.target;
			const value = el.options[el.selectedIndex].value;
			this.get('optionValues')[value]();
		}
	}
});
