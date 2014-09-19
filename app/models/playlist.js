import DS from 'ember-data';

export default DS.Model.extend({
	created: DS.attr('number'),
	title: DS.attr('string'),
	slug: DS.attr('string'),
	// autoSlug: function() {
	// 	return this.get('slug').replace(/\s+/g, '-').toLowerCase();
	// },
	body: DS.attr('string'),
	user: DS.belongsTo('user', { inverse: 'playlist' }),
	tracks: DS.hasMany('track', { async: true })
});
