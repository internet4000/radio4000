import Ember from 'ember';

const {inject, Mixin, set} = Ember;

export default Mixin.create({
	uiStates: inject.service(),
	activate() {
		this.super(...arguments);
		set(this, 'uiStates.isMinimal', true);
	},
	deactivate() {
		this.super(...arguments);
		set(this, 'uiStates.isMinimal', false);
	}
});
