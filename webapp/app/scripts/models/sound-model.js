/*global Ember*/
App.Sound = DS.Model.extend({
	key: DS.attr('string'),
	provider: DS.attr('string'),
	title: DS.attr('string')
});
