import Ember from 'ember';
import DS from 'ember-data';

const {attr, hasMany, belongsTo} = DS;

/*
 Channel model:

 There is no reference to the 'channel owner' because we want the user to be as anonymous as possible

 There is also a channelPublic model, which can be edited by anyone
 */

export default DS.Model.extend({
	title: attr('string'),
	slug: attr('string'),
	body: attr('string'),
	isFeatured: attr('boolean'),
	link: attr('string'),

	// time stamps
	created: attr('number', {
		defaultValue() {
			return new Date().getTime();
		}
	}),

	/**
	 * why this is not working?
	 * it should update with a date each time a new track added to tracks
	 * right?
	 **/
	// lastUpdated: Ember.computed('tracks.[]', function () {
	// 	return new Date().getTime();
	// }),

	// Set the latest image as the cover image
	coverImage: Ember.computed('images.[]', function () {
		return this.get('images.lastObject');
	}),

	// relationships
	images: hasMany('image', {async: true}),
	tracks: hasMany('track', {async: true}),
	favoriteChannels: hasMany('channel', {inverse: null, async: true}),
	channelPublic: belongsTo('channelPublic', {async: true})

	// dates
	// createdDate: Ember.computed('created', function () {
	// 	return moment(this.get('created')).fromNow();
	// }),
});
