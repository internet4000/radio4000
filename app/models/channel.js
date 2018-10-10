import Ember from 'ember';
import DS from 'ember-data';
import firebase from 'firebase';
import {task} from 'ember-concurrency';
import {and, hash} from 'ember-awesome-macros';
import {validator, buildValidations} from 'ember-cp-validations';
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
	flashMessages: inject.service(),

	created: attr('number', {
		defaultValue() {
			return firebase.database.ServerValue.TIMESTAMP;
		}
	}),
	updated: attr('timestamp'),

	title: attr('string'),
	slug: attr('string'),
	body: attr('string'),
	link: attr('string'),
	isFeatured: attr('boolean'),
	isPremium: attr('boolean'),

	coordinatesLatitude: attr('number'),
	coordinatesLongitude: attr('number'),
	hasCoordinates: and('coordinatesLatitude', 'coordinatesLongitude'),
	coordinates: hash({
		lng: 'coordinatesLongitude',
		lat: 'coordinatesLatitude'
	}),

	// A Cloudinary media ID. Use the "cover-img" helper to generate a full URL.
	image: attr('string'),

	// This property is toggled by the player setChannel.
	isInPlayer: false,

	// Relationships.
	tracks: hasMany('track', {async: true}),
	favoriteChannels: hasMany('channel', {inverse: null, async: true}),
	channelPublic: belongsTo('channelPublic', {async: true}),

	// Meta data.
	totalFavorites: computed('favoriteChannels', function () {
		return this.hasMany('favoriteChannels').ids().length;
	}),

	totalTracks: computed('tracks.[]', function () {
		return this.hasMany('tracks').ids().length;
	}),

	hasFewTracks: computed.lte('totalTracks', 2),

	// can current logged in user edit the channel
	canEdit: computed('id', 'session.currentUser.channels.firstObject.id', {
		get() {
			const channel = this;
			const userChannel = get(this, 'session.currentUser.channels.firstObject');

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

	isExperienced: computed.and('image', 'totalTracks', 'favoriteChannels.firstObject'),

	// Is already a favorite channel of session.currentUser.
	isFavorite: computed('model', 'session.currentUser.channels.firstObject.favoriteChannels.[]', function () {
		const channel = this;
		const favorites = get(this, 'session.currentUser.channels.firstObject.favoriteChannels');

		// Guard because this functions runs before userChannel is defined.
		if (!favorites) {
			return false;
		}

		// True if this channel is a favorite of the user's favorites.
		return favorites.includes(channel);
	}),

	toggleFavorite: task(function * () {
		const isFavorite = get(this, 'isFavorite');
		const userChannel = get(this, 'session.currentUser.channels.firstObject');

		if (!userChannel) {
			get(this, 'flashMessages').warning('To save a radio channel as favorite you should sign up or log in')
			return
		}

		// Toggle this channel on the current user's favorite channels.
		const favoriteChannels = yield userChannel.get('favoriteChannels');
		const channel = this;
		toggleObject(favoriteChannels, channel, isFavorite);
		yield userChannel.save();

		// Toggle the userChannel from this channel's public followers.
		const channelPublic = yield channel.get('channelPublic');
		const followers = yield channelPublic.get('followers');
		toggleObject(followers, userChannel, isFavorite);
		yield channelPublic.save();
	}).drop()
});
