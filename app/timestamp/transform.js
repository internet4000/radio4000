import Transform from 'ember-data/transforms/date'
import firebase from 'firebase'

export default Transform.extend({
	// From server to client.
	deserialize(timestamp) {
		return timestamp
	},
	// From client to server.
	// Note, this ALWAYS sets a new timestamp. Do not use it for "created" type dates.
	serialize() {
		return firebase.database.ServerValue.TIMESTAMP
	}
})
