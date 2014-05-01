Webapp.PlaylistsRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('playlist');
  }
});

