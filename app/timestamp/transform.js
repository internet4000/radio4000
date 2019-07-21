import Transform from '@ember-data/serializer/transform'
import {inject as service} from '@ember/service'

export default Transform.extend({
	firebaseApp: service(),

	// From server to client.
	deserialize(timestamp) {
		return timestamp
	},

	// From client to server.
	// Note, this ALWAYS sets a new timestamp. Do not use it for "created" type dates.
	serialize() {
		return {'.sv': 'timestamp'}
		// return this.firebaseApp.database.ServerValue.TIMESTAMP
	}
})
