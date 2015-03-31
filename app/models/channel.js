import Ember from 'ember';
import DS from 'ember-data';

/*
 Channel model:
 There is no reference to the 'channel owner' because we want the user to be as anonymous as possible
 */

export default DS.Model.extend({
	title: DS.attr('string'),
	slug: DS.attr('string'),
	body: DS.attr('string'),
	isFeatured: DS.attr('boolean'),
	created: DS.attr('string', {
       defaultValue: function() { return new Date(); }
   }),

	// dates
	lastUpdated: Ember.computed('tracks.@each.created', function() {
		return this.get('tracks.lastObject.created');
	}),
	// createdDate: Ember.computed('created', function() {
	// 	return moment(this.get('created')).fromNow();
	// }),
	lastUpdatedFormatted: Ember.computed('tracks.@each.created', function() {
		var date = this.get('tracks.lastObject.created');
		return window.moment(date).fromNow();
	}),

	// Set the latest image as the cover image
	coverImage: Ember.computed('images.[]', function() {
		return this.get('images.firstObject');
	}),

	// relationships
	images: DS.hasMany('image', { async: true }),
	tracks: DS.hasMany('track', { async: true }),
	favoriteChannels: DS.hasMany('channel', { inverse: null, async: true }),
	channelPublic: DS.belongsTo('channelPublic', { async: true }) 	// 'public' because not only owner can edit it
});
