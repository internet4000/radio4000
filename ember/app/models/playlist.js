/* global moment */
import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	body: DS.attr('string'),
	slug: DS.attr('string'),
	image: DS.attr('string'),
	created: DS.attr('number'),

	user: DS.attr('string'),
	// user: DS.belongsTo('user', { async: true })

	// async so it gets loaded with parent record?
	// tracks: DS.hasMany('track', { async: true }),

	createdDate: function() {
		return moment(this.get('created')).format('MMMM Do, YYYY');
	}.property('created')

	// isOwner: function() {
	// 	return this.get('user.id');
	// }.property('user')
});
