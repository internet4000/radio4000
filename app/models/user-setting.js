import DS from 'ember-data';

const {attr, belongsTo, hasMany} = DS;

export default DS.Model.extend({
	isRemoteActive: attr('boolean'),

	user: belongsTo('user'),
	trackForRemote: belongsTo('track', {
		async: true
	}),
	playedChannels: hasMany('channel', {
		async: true
	})
});
