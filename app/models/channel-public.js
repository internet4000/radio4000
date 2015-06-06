import DS from 'ember-data';

const { hasMany, belongsTo } = DS;

// inverse tells Ember which relationship this matches on the other model

export default DS.Model.extend({
	followers: hasMany('channel', {
		inverse: null,
		async: true
	}),
	channel: belongsTo('channel', {
		inverse: 'channelPublic',
		async: true
	})
});
