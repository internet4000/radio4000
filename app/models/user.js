import DS from 'ember-data';
import { inject as service } from '@ember/service';

const {Model, attr, belongsTo, hasMany} = DS;

export default Model.extend({
	firebaseApp: service(),

	created: attr('number', {
		defaultValue() {
			return this.firebaseApp.database.ServerValue.TIMESTAMP;
		}
	}),
	channels: hasMany('channel', {
		async: true
	}),
	settings: belongsTo('user-setting', {
		async: true
	})
});
