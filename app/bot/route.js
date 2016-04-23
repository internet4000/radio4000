import Ember from 'ember';
import minimalRouteMixin from 'radio4000/mixins/minimal-route';

const {Route, inject} = Ember;

export default Route.extend(minimalRouteMixin, {
	uiStates: inject.service(),
	activate() {
		// on this route we also want the player to be minimized
		this.set('uiStates.player.isMinimal', true);
		this._super();
	}
});
