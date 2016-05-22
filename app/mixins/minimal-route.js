import Ember from 'ember';

const {inject, Mixin, set} = Ember;

export default Mixin.create({
	uiStates: inject.service(),
	activate() {
		set(this, 'uiStates.isMinimal', true);
	},
	deactivate() {
		set(this, 'uiStates.isMinimal', false);
	}
});
