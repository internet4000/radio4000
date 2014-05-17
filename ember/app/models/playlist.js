/* global moment */
var Playlist = DS.Model.extend({
	title: DS.attr('string'),
	body: DS.attr('string'),

	created: DS.attr('number'),
	createdDate: function() {
		return moment(this.get('created')).format('MMMM Do, YYYY');
	}.property('created'),

	user: DS.belongsTo('user', { async: true }),
	tracks: DS.hasMany('track', { async: true })
});

export default Playlist;
