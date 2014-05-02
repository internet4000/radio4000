// Webapp.ApplicationAdapter = DS.FixtureAdapter;

DS.RESTAdapter.reopen({
  host: 'http://play.kopfwelt.com'
});

Webapp.ApplicationAdapter = DS.RESTAdapter.extend({
    buildURL: function(record, suffix){
       return this._super(record, suffix) + ".json";
    }
});