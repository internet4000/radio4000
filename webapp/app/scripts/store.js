// Webapp.ApplicationAdapter = DS.FixtureAdapter;

DS.RESTAdapter.reopen({
  host: 'http://plist.com'
});

Webapp.ApplicationAdapter = DS.RESTAdapter.extend({
    buildURL: function(record, suffix){
       return this._super(record, suffix) + ".json";
    }
});