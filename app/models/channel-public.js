import DS from 'ember-data';

export default DS.Model.extend({
	followers: DS.hasMany('channel', { inverse: null, async: true }),
	channel: DS.belongsTo('channel', {
		// tell Ember which relationship this matches on the other side
		// e.g. on the channel model.
		inverse: 'channelPublic',
		async: true
	})
});
