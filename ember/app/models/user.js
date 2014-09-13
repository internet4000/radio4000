import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	// authId: DS.attr('string'),
	created: DS.attr('number')

	// @todo this breaks the matrix
	// ,playlists: DS.hasMany('playlist', { async: true })

	// // @todo turn into a computed value
	// hasPlaylist: DS.attr('boolean', {defaultValue: false}),
});
