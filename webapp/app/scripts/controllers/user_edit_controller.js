App.UserEditController = Ember.ObjectController.extend({
  needs: 'user',
  actions: {
    save: function(){
      self = this
      this.get('buffer').forEach(function(attr){
        self.get('controllers.user.model').set(attr.key, attr.value);
      });
      this.transitionToRoute('user',this.get('model'));
    }
  }
});

