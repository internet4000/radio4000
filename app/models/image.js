import DS from 'ember-data';
import firebase from 'firebase';

const {Model, attr, belongsTo} = DS;

export default Model.extend({
	channel: belongsTo('channel'),
	src: attr('string'),
	created: attr('number', {
		defaultValue() {
			return firebase.database.ServerValue.TIMESTAMP;
		}
	})
});
