import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
   user: belongsTo('user'),
   remoteActive: attr('boolean'),
   trackForRemote: belongsTo('track', { async: true })
});
