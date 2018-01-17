import Ember from 'ember';
const {
	Component,
	inject,
	get
} = Ember;

export default Component.extend({
	player: inject.service(),

	tagName: 'button',
	classNames: ['Btn'],
	attributeBindings: ['title'],
	title: 'Play a random Radio4000 channel [⌨ r]',

	click() {
		get(this, 'player.playRandomChannel').perform();
	}
});
