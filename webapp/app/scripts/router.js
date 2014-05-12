App.Router.map(function () {

  this.resource('sounds', function(){
    this.resource('sound', { path: '/:sound_id' }, function(){
      // this.route('add');
      // this.route('edit');
    });
  });

  this.resource('styleguide');

});
