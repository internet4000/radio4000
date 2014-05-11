App.SoundRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('sound', params.sound_id);
  },

  // renderTemplate: function() {
  //   var controller = this.controllerFor('sound');

  //   // Render the `favoritePost` template into
  //   // the outlet `posts`, and display the `favoritePost`
  //   // controller.
  //   this.render('youtube', {
  //     outlet: 'sound',
  //     controller: controller
  //   });
  // }
});

