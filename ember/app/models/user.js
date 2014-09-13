import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	created: DS.attr('number'),
	playlist: DS.belongsTo('playlist'),
	hasPlaylist: DS.attr('boolean', {defaultValue: false})
	// playlists: DS.hasMany('playlist', { async: true })
});
