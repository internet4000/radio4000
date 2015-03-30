import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	email: DS.attr('string'),
	provider: DS.attr('string'),
	created: DS.attr('string', {
       defaultValue: function() { return new Date(); }
   }),
	channels: DS.hasMany('channel', {
		async: true
	})
});
