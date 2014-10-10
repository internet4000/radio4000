import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	email: DS.attr('string'),
	provider: DS.attr('string'),
	created: DS.attr('number'),
	playlists: DS.hasMany('playlist', { async: true }),
	favoritePlaylists: DS.hasMany('playlist', { inverse: null, async: true })
});
