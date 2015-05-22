import DS from 'ember-data';

const { attr, hasMany, belongsTo } = DS;

export default DS.Model.extend({
	name: attr('string'),
	email: attr('string'),
	provider: attr('string'),
	created: attr('number', {
		defaultValue() { return new Date().getTime(); }
	}),
	channels: hasMany('channel', {
		async: true
	}),
	settings: belongsTo('user-setting', {
		async: true
	})
});
