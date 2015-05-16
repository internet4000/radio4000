import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	email: DS.attr('string'),
	provider: DS.attr('string'),
	created: DS.attr('number', {
		defaultValue() { return new Date().getTime(); }
	}),
	channels: DS.hasMany('channel', {
		async: true
	}),
	settings: DS.belongsTo('user-setting', {
		async: true
	})
});
