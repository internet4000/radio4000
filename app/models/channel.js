import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	slug: DS.attr('string'),
	created: DS.attr('number'),
	body: DS.attr('string'),

	lastUpdated: function() {
		return this.get('tracks.lastObject.createdDate');
	}.property('tracks.@each.createdDate'),

	// relationships
	images: DS.hasMany('image', { async: true }),
	tracks: DS.hasMany('track', { async: true }),
	user: DS.belongsTo('user', {
		inverse: 'channels',
		async: true
	})
});
