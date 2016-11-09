import DS from 'ember-data';

const {Model, attr, belongsTo, hasMany} = DS;

export default Model.extend({
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
