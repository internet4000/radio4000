import DS from 'ember-data';

const {Model, attr, belongsTo} = DS;

export default Model.extend({
	channel: belongsTo('channel'),
	src: attr('string')
});
