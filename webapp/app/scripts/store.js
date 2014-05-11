// App.ApplicationAdapter = DS.FixtureAdapter;

// Use Ember's REST adapter and specify the host
DS.RESTAdapter.reopen({
  host: 'http://play.kopfwelt.com'
});

// If things aren't the the Ember default, we have to specify differences here
App.ApplicationAdapter = DS.RESTAdapter.extend({
    buildURL: function(record, suffix){
       return this._super(record, suffix) + ".json";
    }
});
