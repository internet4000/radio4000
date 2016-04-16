import Ember from 'ember';
import DS from 'ember-data';

const {hasMany, belongsTo} = DS;
const {computed} = Ember;

// inverse tells Ember which relationship this matches on the other model

export default DS.Model.extend({
	followers: hasMany('channel', {
		inverse: null,
		async: true
	}),
	channel: belongsTo('channel', {
		inverse: 'channelPublic',
		async: true
	}),
	totalFollowers: computed('tracks', function () {
		return this.hasMany('followers').ids().length;
	})
});
