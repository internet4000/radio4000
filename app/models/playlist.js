import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	slug: DS.attr('string'),
	created: DS.attr('number'),
	body: DS.attr('string'),

	// temporary but it works
	uid: DS.attr('string'),

	// relationships
	tracks: DS.hasMany('track', { async: true }),
	user: DS.belongsTo('user', { inverse: 'playlists', async: true })
});
