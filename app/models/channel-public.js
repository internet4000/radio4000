import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	channel: DS.belongsTo('channel', {
		inverse: 'channelPublic'
  }),
	followers: DS.hasMany('channel', { inverse: null, async: true })
});
