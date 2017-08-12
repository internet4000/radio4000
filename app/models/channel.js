import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';
import firebase from 'firebase';
import channelConst from 'radio4000/utils/channel-const';

const {attr, hasMany, belongsTo} = DS;
const {computed} = Ember;

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
	isPremium: attr('boolean'),
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
	})
	// model.hasMany('tracks').ids();
	// model.hasMany('tracks').value() !== null;
	// model.hasMany('tracks').meta().total;
});
