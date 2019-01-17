import Route from '@ember/routing/route';

export default Route.extend({
	beforeModel() {
		// A temporary redirect until we
		// settle on the {search,all}->explore rename.
		this.replaceWith('channels.explore')
	}
});
