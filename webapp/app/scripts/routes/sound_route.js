Webapp.SoundRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('sound', params.sound_id);
  }
});

