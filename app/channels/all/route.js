import Route from '@ember/routing/route';

export default Route.extend({
	beforeModel() {
		// A temporary redirect until we
		// settle on the all->search rename.
		this.replaceWith('channels.search')
	}
});
