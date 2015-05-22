import DS from 'ember-data';
const { hasMany, belongsTo } = DS;

export default DS.Model.extend({
	followers: hasMany('channel', { inverse: null, async: true }),
	channel: belongsTo('channel', {
		// tell Ember which relationship this matches on the other side
		// e.g. on the channel model.
		inverse: 'channelPublic',
		async: true
	})
});
