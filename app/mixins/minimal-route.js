import Ember from 'ember';

const {Mixin, set} = Ember;

export default Mixin.create({
	activate() {
		set(this, 'uiStates.isMinimal', true);
	},
	deactivate() {
		set(this, 'uiStates.isMinimal', false);
	}
});
