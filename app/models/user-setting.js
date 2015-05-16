import DS from 'ember-data';

export default DS.Model.extend({
   user: DS.belongsTo('user'),
   remoteActive: DS.attr('boolean'),
   trackForRemote: DS.belongsTo('track')
});
