App.Router.map(function () {

  this.resource('sounds', function(){
    this.resource('sound', { path: '/:sound_id' }, function(){
      this.route('play');
    });
  });

  this.resource('styleguide');

  // this.resource('playlists', function(){
  //   this.resource('playlist', { path: '/:playlist_id' }, function(){
  //     this.route('edit');
  //   });
  //   this.route('create');
  // });

  // this.resource('sounds', function(){
  //   this.resource('sound', { path: '/sound/play/:id' }, function(){
  //     this.route('play');
  //   });
  // });

  // this.resource('sound', { path: '/play/:sound_id' }, function(){
  //   this.route('play');
  // });

  // this.resource("sound", function(){
  //   this.route("play", { path: "/play/:sound_id" });
  // });

  // this.resource('sounds', function(){
  //   this.resource('sound', { path: '/play/:sound_id' }, function(){
  //     this.route('play');
  //   });
  // });

  // this.resource('users', function(){
  //   this.resource('user', { path: '/:user_id' }, function(){
  //     this.route('edit');
  //   });
  //   this.route('create');
  // });

});
