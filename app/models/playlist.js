import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	slug: DS.attr('string'),
	created: DS.attr('number'),
	body: DS.attr('string'),
	tracks: DS.hasMany('track', { async: true }),
	user: DS.belongsTo('user', { inverse: 'playlists' })
	// ,favoriters: DS.hasMany('user', { inverse: 'favoritePlaylists' })
});
