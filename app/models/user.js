import DS from 'ember-data';

const {belongsTo, attr, hasMany, Model} = DS;

export default Model.extend({
	name: attr('string'),
	email: attr('string'),
	provider: attr('string'),
	created: attr('number', {
		defaultValue() {
			return new Date().getTime();
		}
	}),
	// @TODO: we should store like this instead,
	// but first we should convert all old data to the new format.
	// created: attr('date', {
	// 	defaultValue: function () {
	// 		return new Date();
	// 	}
	// }),
	channels: hasMany('channel', {
		async: true
	}),
	settings: belongsTo('user-setting', {
		async: true
	})
});
