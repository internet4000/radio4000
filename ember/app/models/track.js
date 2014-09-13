import DS from 'ember-data';

export default DS.Model.extend({
	key: DS.attr('string'),
	provider: DS.attr('string'),
	url: DS.attr('string'),
	title: DS.attr('string'),
	body: DS.attr('string'),
	created: DS.attr('number'),

	createdDate: function() {
		var m = window.moment(this.get('created'));
		return '%@ at %@'.fmt(m.format('MMMM Do, YYYY'), m.format('h:mm:ss a'));
	}.property('created'),

	playlist: DS.belongsTo('playlist')
});
