import youtube from 'radio4000/utils/youtube';

import {module, test} from 'qunit';

module('youtube');

var urlsToTest = [
    'http://youtu.be/81HOHEfuKic', // latest short format
    'http://www.youtube.com/embed/81HOHEfuKic', // iframe
    'https://www.youtube.com/embed/81HOHEfuKic', // iframe (secure)
    'http://www.youtube.com/v/81HOHEfuKic?fs=1&hl=en_US', // object param
    'http://www.youtube.com/v/81HOHEfuKic?fs=1&hl=en_US', // object embed
    'http://www.youtube.com/watch?v=81HOHEfuKic', // watch
    'http://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo', // users
    'http://www.youtube.com/ytscreeningroom?v=NRHVzbJVx8I', // ytscreeningroom
    'http://www.youtube.com/sandalsResorts#p/c/54B8C800269D7C1B/2/PPS-8DMrAn4', // any/thing/goes!
    'http://gdata.youtube.com/feeds/api/videos/81HOHEfuKic', // any/subdomain/too
    'http://www.youtube.com/watch?v=spDj54kf-vY&feature=g-vrec', // more params
    'http://www.youtube.com/watch?v=spDj54kf-vY&feature=youtu.be', // query may have dot
];

// Replace this with your real tests.
test('it works', function(assert) {
  var result = youtube('https://www.youtube.com/watch?v=81HOHEfuKic');
  assert.ok(result);
});


