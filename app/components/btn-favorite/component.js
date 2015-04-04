import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: ['value:is-favorite'],
	classNames: ['ToogleFavorite'],
	tagName: 'span',

	favoriteStatus: true,

	click() {
		this.sendAction(); // triggers the action specified on the component markup

		var fav = this.get('favoriteStatus');
		console.log(fav);
	}
});
