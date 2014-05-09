/*global Ember*/
Webapp.Sound = DS.Model.extend({
    key: DS.attr('string'),
    provider: DS.attr('string')
});

// probably should be mixed-in...
Webapp.Sound.reopen({

  // Not sure what this does
  attributes: function(){
    var model = this;

    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({
        model: model,
        key: key,
        valueBinding: 'model.' + key
      });
    });
  }.property(),

  // Creates a url to the sound embed, depending on the provider and bound to the 'key' property
  src: function() {
    var src = '';

    if (this.get('provider') === 'youtube') {
      src = '//www.youtube.com/embed/' + this.get('key');
    } else if (this.get('provider') === 'soundcloud') {
      src = 'https://w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/' + this.get('key');
    }

    return src;

  }.property('key')
});
