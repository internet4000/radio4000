import Ember from 'ember';
import KeyboardShortcutsGlobal from 'radio4000/mixins/keyboard-shortcuts-global';

const {
	Route,
	inject
} = Ember;

export default Route.extend(KeyboardShortcutsGlobal, {
	session: inject.service(),
	player: inject.service(),

	actions: {
		accessDenied(a, b) {
			Ember.debug('torii access denied', a, b)
		}
	}
});
