import DS from 'ember-data';

export default DS.Model.extend({
	created: DS.attr('number'),
	title: DS.attr('string'),
	slug: DS.attr('string'),
	body: DS.attr('string'),
	user: DS.belongsTo('user'),
	tracks: DS.hasMany('track', { async: true })
});
