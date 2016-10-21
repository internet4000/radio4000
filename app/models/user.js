import DS from 'ember-data';

const {belongsTo, attr, hasMany, Model} = DS;

export default Model.extend({
	provider: attr('string'),
	created: attr('number', {
		defaultValue() {
			return new Date().getTime();
		}
	}),
	channels: hasMany('channel', {
		async: true
	}),
	settings: belongsTo('user-setting', {
		async: true
	})
});
