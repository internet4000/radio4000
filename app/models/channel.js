import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	slug: DS.attr('string'),
	created: DS.attr('number'),
	body: DS.attr('string'),

	lastUpdated: function() {
		return this.get('tracks.lastObject.created');
	}.property('tracks.@each.created'),

	lastUpdatedFormatted: function() {
		return this.get('tracks.lastObject.createdDate');
	}.property('tracks.@each.createdDate'),

	// relationships
	images: DS.hasMany('image', { async: true }),
	tracks: DS.hasMany('track', { async: true }),
	favoriteChannels: DS.hasMany('channel', { inverse: null, async: true })
});
