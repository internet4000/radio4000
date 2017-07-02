import DS from 'ember-data';
import firebase from 'firebase';

const {Model, attr, belongsTo, hasMany} = DS;

export default Model.extend({
	created: attr('number', {
		defaultValue() {
			return firebase.database.ServerValue.TIMESTAMP;
		}
	}),
	channels: hasMany('channel', {
		async: true
	}),
	settings: belongsTo('user-setting', {
		async: true
	})
});
