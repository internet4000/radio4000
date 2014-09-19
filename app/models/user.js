import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	email: DS.attr('string'),
	created: DS.attr('number'),
	playlist: DS.belongsTo('playlist'),
	// playlists: DS.hasMany('playlist', { async: true }),
	// hasPlaylist: DS.attr('boolean', { defaultValue: false }),
	favouritePlaylists: DS.hasMany('playlist')
});
