var PlaylistsController = Ember.ArrayController.extend({
	needs: ['auth']
	// this.get('controllers.auth');
});

export default PlaylistsController;
