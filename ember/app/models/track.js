/* global moment */
var Track = DS.Model.extend({
	title: DS.attr('string'),
	url: DS.attr('string'),
	body: DS.attr('string'),
	created: DS.attr('number'),
	createdDate: function() {
		var m = moment(this.get('created'));
		return '%@ at %@'.fmt(m.format('MMMM Do, YYYY'), m.format('h:mm:ss a'));
	}.property('created'),

	playlist: DS.belongsTo('playlist')
});

export default Track;
