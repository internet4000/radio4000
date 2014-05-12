App.PlaylistEditController = Ember.ObjectController.extend({
  needs: 'playlist',
  actions: {
    save: function(){
      self = this
      this.get('buffer').forEach(function(attr){
        self.get('controllers.playlist.model').set(attr.key, attr.value);
      });
      this.transitionToRoute('playlist',this.get('model'));
    }
  }
});
