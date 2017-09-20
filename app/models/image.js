import DS from 'ember-data';

const {Model, attr, belongsTo} = DS;

export default Model.extend({
	created: attr('timestamp', {
		defaultValue() {
			return new Date()
		}
	}),
	src: attr('string'),
	channel: belongsTo('channel')
});
