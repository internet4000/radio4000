App.PlaylistRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('playlist', params.playlist_id);
  }
});

