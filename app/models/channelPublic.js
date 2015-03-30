import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	channelPrivate: DS.hasMany('channel', { async: true }),
	followers: DS.hasMany('channel', { inverse: null, async: true })
});
