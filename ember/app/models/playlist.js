/* global moment */
import DS from 'ember-data';

export default DS.Model.extend({
	created: DS.attr('number'),
	title: DS.attr('string'),
	body: DS.attr('string'),
	uid: DS.attr('string')

	// slug: DS.attr('string'),
	// image: DS.attr('string'),
	// // user: DS.belongsTo('user', { async: true }),

	// async so it gets loaded with parent record?
	,tracks: DS.hasMany('track', { async: true })

	// createdDate: function() {
	// 	return moment(this.get('created')).format('MMMM Do, YYYY');
	// }.property('created')
});
