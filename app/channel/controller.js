import Ember from 'ember';

const {get, computed} = Ember;

export default Ember.Controller.extend({
	player: Ember.inject.service(),

	isWelcomed: computed('model.tracks.firstObject', 'model.images.firstObject', 'model.favoriteChannels.firstObject', 'model.canEdit', function () {
		const canEdit = this.get('model.canEdit');
		// No need to check for more if you can't edit.
		if (!canEdit) {
			return false;
		}
		const hasTrack = this.get('model.tracks.firstObject');
		const hasImage = this.get('model.images.firstObject');
		const hasFavorite = this.get('model.favoriteChannels.firstObject');
		return canEdit && hasTrack && hasImage && hasFavorite;
	})
});
