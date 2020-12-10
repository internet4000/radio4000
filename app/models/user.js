import DS from 'ember-data'
// import firebase from 'firebase/app'

const {Model, attr, belongsTo, hasMany} = DS

export default Model.extend({
	created: attr('number', {
		defaultValue() {
			return new Date().getTime()
			// return firebase.database.ServerValue.TIMESTAMP
		}
	}),
	channels: hasMany('channel'),
	settings: belongsTo('user-setting')
})
