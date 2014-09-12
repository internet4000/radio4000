/* global moment */
import DS from "ember-data";

var Playlist = DS.Model.extend({
	title: DS.attr('string'),
	body: DS.attr('string'),
	slug: DS.attr('string'),
	image: DS.attr('string'),

	created: DS.attr('number'),
	createdDate: function() {
		return moment(this.get('created')).format('MMMM Do, YYYY');
	}.property('created'),

	isOwner: function() {
		return this.get('user.id');
	}.property('user'),

	tracks: DS.hasMany('track', { async: true }),
	user: DS.belongsTo('user')
});

export default Playlist;
