// Copy/paste from
// https://github.com/rmmmp/emberfire-utils/blob/master/addon/transforms/timestamp.js

import Transform from 'ember-data/transforms/date'
import firebase from 'firebase'

export default Transform.extend({
	serialize() {
		return firebase.database.ServerValue.TIMESTAMP
	}
})
