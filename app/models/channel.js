import Ember from 'ember';
import DS from 'ember-data';
import {task} from 'ember-concurrency';
import {validator, buildValidations} from 'ember-cp-validations';
import firebase from 'firebase';
import channelConst from 'radio4000/utils/channel-const';
import toggleObject from 'radio4000/utils/toggle-object';

const {attr, hasMany, belongsTo} = DS;
const {computed, inject, get} = Ember;

const Validations = buildValidations({
	title: [
		validator('presence', {
			presence: true,
			ignoreBlank: true,
			message: 'Field should not be empty'
		}),
		validator('length', {
			min: channelConst.titleMinLength,
			max: channelConst.titleMaxLength
		})
	],
	slug: [
		validator('presence', {
			presence: true,
			ignoreBlank: false
		}),
		validator('length', {
			min: channelConst.titleMinLength,
			max: channelConst.titleMaxLength
		})
	],
	body: [
		validator('length', {
			max: channelConst.descriptionMaxLength
		})
	],
	link: [
		validator('format', {
			type: 'url',
			allowBlank: true,
			message: 'If you leave a link, please do it with https://… in front'
		})
	]
});

/*
	Channel model
	There is no reference to the 'channel owner' because we want the user to be as anonymous as possible.
	There is also a channelPublic model, which can be edited by anyone.
	*/

export default DS.Model.extend(Validations, {
	session: inject.service(),

	created: attr('number', {
		defaultValue() {
			return firebase.database.ServerValue.TIMESTAMP;
		}
	}),
	updated: attr('number'),
	title: attr('string'),
	slug: attr('string'),
	body: attr('string'),
	isFeatured: attr('boolean'),
	link: attr('string'),

	// Set the latest image as the cover image.
	coverImage: computed('images.[]', function () {
		return this.get('images.lastObject');
	}),

	// This property is toggled by the player setChannel.
	isInPlayer: false,

	// Relationships.
	images: hasMany('image', {async: true}),
	tracks: hasMany('track', {async: true}),
	favoriteChannels: hasMany('channel', {inverse: null, async: true}),
	channelPublic: belongsTo('channelPublic', {async: true}),

	// Meta data.
	totalTracks: computed('tracks', function () {
		return this.hasMany('tracks').ids().length;
	}),
	totalFavorites: computed('favoriteChannels', function () {
		return this.hasMany('favoriteChannels').ids().length;
	}),

	// can current logged in user edit the channel
	canEdit: computed('id', 'session.currentUser.channels.firstObject.id', {
		get() {
			const channel = this;
			const userChannel = this.get('session.currentUser.channels.firstObject');

			console.log("channel", channel)
			console.log("userChannel", userChannel)

			// Avoid any property being null because `(null === null)` equals true…
			if (channel === null || userChannel === null || userChannel === undefined) {
				return false;
			}
			return channel.get('id') === userChannel.get('id');
		},
		set() {
			// not allowed
		}
	}),

	isExperienced: computed.and('totalTracks', 'images.firstObject', 'favoriteChannels.firstObject', 'canEdit'),

	// is already a favorite channel of session.currentUser
	isFavorite: computed('model', 'session.currentUser.channels.firstObject.favoriteChannels.[]', function () {
		const channel = this;
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
		const favoriteChannels = yield userChannel.get('favoriteChannels');
		const channel = this;

		toggleObject(favoriteChannels, channel, isFavorite);

		yield userChannel.save();

		// Toggle the userChannel from this channel's public followers.
		const channelPublic = yield channel.get('channelPublic');
		const followers = yield channelPublic.get('followers');

		toggleObject(followers, userChannel, isFavorite);

		return yield channelPublic.save();
	}).drop()
});
