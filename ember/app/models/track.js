/* global moment */
var Track = DS.Model.extend({
	url: DS.attr('string'),
	body: DS.attr('string'),
	published: DS.attr('number'),
	publishedDate: function() {
		var m = moment(this.get('published'));
		return '%@ at %@'.fmt(m.format('MMMM Do, YYYY'), m.format('h:mm:ss a'));
	}.property('published'),
	user: DS.belongsTo('user', { async: true })
});

export default Track;
