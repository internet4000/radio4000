/*global Ember*/
Webapp.Sound = DS.Model.extend({
    key: DS.attr('string'),
    provider: DS.attr('string')
});

// probably should be mixed-in...
Webapp.Sound.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property(),

  src: function() {
    var src = ""
    if(this.get('provider') === 'youtube') {
      src = '//www.youtube.com/embed/' + this.get('key');
    }else if(this.get('provider') === 'soundcloud') {
      src = 'https://w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/' + this.get('key');
    }
    return src;
  }.property('key')
});