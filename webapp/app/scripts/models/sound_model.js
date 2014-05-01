/*global Ember*/
Webapp.Sound = DS.Model.extend({
    title: DS.attr('string'),

    url: DS.attr('string'),

    type: DS.attr('string')
});

// probably should be mixed-in...
Webapp.Sound.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});