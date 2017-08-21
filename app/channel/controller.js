import Ember from 'ember';
import {task} from 'ember-concurrency';

const {get, computed} = Ember;

function toggleObject(context, obj, condition) {
	if (condition) {
		context.removeObject(obj);
	} else {
		context.addObject(obj);
	}
}

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
	}),

	isFavorite: computed('model', 'session.currentUser.channels.firstObject.favoriteChannels.[]', function () {
		const channel = this.get('model');
		const favorites = this.get('session.currentUser.channels.firstObject.favoriteChannels');

		// guard because this functions runs before userChannel is defined
		if (!favorites) {
			return false;
		}

		// true if this channel is a favorite of the user's favorites
		return favorites.includes(channel);
	}),

	toggleFavorite: task(function * () {
		const isFavorite = get(this, 'isFavorite');

		const userChannel = get(this, 'session.currentUser.channels.firstObject');
		if (!userChannel) {
			this.transitionToRoute('auth.login');
			return;
		}

		// Toggle the channel on the userChannel's favoriteChannels.
		const favoriteChannels = yield userChannel.get('favoriteChannels');
		const channel = get(this, 'model');

		toggleObject(favoriteChannels, channel, isFavorite);
		yield userChannel.save();

		// Toggle the userChannel from this channel's public followers.
		const channelPublic = yield channel.get('channelPublic');
		const followers = yield channelPublic.get('followers');
		toggleObject(followers, userChannel, isFavorite);
		yield channelPublic.save();
	}).drop()
});
