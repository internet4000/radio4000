import Ember from 'ember';

export default Ember.Route.extend({

});

// return this.store.peekAll('channel');

// var playlist = this.modelFor('playlist'); // parent route
// var last5query = playlist.ref() // <-- already possible
//   .child('tracks')
//     .orderByKey()
//     .limitToLast(5);

// return this.store.find('track', { ref: last5query }); // <-- not yet possible
