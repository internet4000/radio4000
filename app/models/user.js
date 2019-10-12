import DS from 'ember-data';
// import { inject as service } from '@ember/service';
import firebase from 'firebase/app'

const {Model, attr, belongsTo, hasMany} = DS;

export default Model.extend({
	// firebaseApp: service(),

	created: attr('number', {
		defaultValue() {
			// return new Date().getTime()
			return firebase.database.ServerValue.TIMESTAMP
		}
	}),
	channels: hasMany('channel'),
	settings: belongsTo('user-setting')
});
