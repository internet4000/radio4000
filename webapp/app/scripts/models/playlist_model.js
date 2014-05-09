/*global Ember*/
Webapp.Playlist = DS.Model.extend({
    title: DS.attr('string'),
    sounds: DS.hasMany('sound')
});

// probably should be mixed-in...
Webapp.Playlist.reopen({
  attributes: function(){
    var model = this;

    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({
      	model: model,
      	key: key,
      	valueBinding: 'model.' + key
      });
    });
  }.property()
});
