Webapp.SoundEditController = Ember.ObjectController.extend({
  needs: 'sound',
  actions: {
    save: function(){
      self = this
      this.get('buffer').forEach(function(attr){
        self.get('controllers.sound.model').set(attr.key, attr.value);
      });
      this.transitionToRoute('sound',this.get('model'));
    }
  }
});

