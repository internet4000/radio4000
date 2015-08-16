import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
	queryParams: ['url'],
	url: null,

	// bookmarklet
	// http://guides.emberjs.com/v1.10.0/routing/query-params/#toc_map-a-controller-s-property-to-a-different-query-param-key
	bookmarklet: computed('session.currentUser.channels.firstObject', function() {
		let slug = this.get('session.currentUser.channels.firstObject.slug');
		return `javascript:(function() {
						location.href='
						http://localhost:4000/${slug}/add
						?url=' + encodeURIComponent(location.href) +
						'&title=' + encodeURIComponent(document.title)
		;})();`;
	}),

	actions: {
		saveTrack(track) {

			// reset the query param
			this.set('url', '');

			// transition out
			this.send('backToChannel');

			// leave it to the channel route to actually save the track
			return true;
		},

		// used by 'ESC' key in the view
		backToChannel() {
			this.transitionToRoute('channel.index', this.get('session.currentUser.channels.firstObject'));
		}
	}
});
