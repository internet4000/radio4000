/* global moment */
var Playlist = DS.Model.extend({
	title: DS.attr('string'),
	body: DS.attr('string'),

	user: DS.belongsTo('user'),
	tracks: DS.hasMany('track', { async: true }),

	created: DS.attr('number'),
	createdDate: function() {
		return moment(this.get('created')).format('MMMM Do, YYYY');
	}.property('created'),
});

export default Playlist;
