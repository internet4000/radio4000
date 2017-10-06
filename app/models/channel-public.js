import { computed } from '@ember/object';
import DS from 'ember-data';

const {hasMany, belongsTo} = DS;

// inverse tells Ember which relationship this matches on the other model

export default DS.Model.extend({
	channel: belongsTo('channel', {
		inverse: 'channelPublic',
		async: true
	}),
	followers: hasMany('channel', {
		inverse: null,
		async: true
	}),
	totalFollowers: computed('followers', function () {
		return this.hasMany('followers').ids().length;
	})
});
