var youtube = function(url) {
	var youTubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
	var id = url.replace(youTubeRegexp, '$1');

	function contains(str, substr) {
		return (str.indexOf(substr) > -1);
	}

	if (contains(id, ';')) {
		var pieces = id.split(';');

		if (contains(pieces[1], '%')) {

			 // links like this:
			 // "http://www.youtube.com/attribution_link?a=pxa6goHqzaA&amp;u=%2Fwatch%3Fv%3DdPdgx30w9sU%26feature%3Dshare"
			 // have the real query string URI encoded behind a ';'.
			 // at this point, `id is 'pxa6goHqzaA;u=%2Fwatch%3Fv%3DdPdgx30w9sU%26feature%3Dshare'
			 var uriComponent = decodeURIComponent(id.split(';')[1]);
			 id = ('http://youtube.com' + uriComponent)
						.replace(youTubeRegexp, '$1');
		} else {

			 // https://www.youtube.com/watch?v=VbNF9X1waSc&amp;feature=youtu.be
			 // `id` looks like 'VbNF9X1waSc;feature=youtu.be' currently.
			 // strip the ';feature=youtu.be'
			 id = pieces[0];
		}

	} else if (contains(id, '#')) {

		// id might look like '93LvTKF_jW0#t=1'
		// and we want '93LvTKF_jW0'
		id = id.split('#')[0];
	}

	return id;
}

// 1. get all tracks and generate and add a ytid if it's not there already
var tracks = [];

// create an array of tracks
for (var prop in db.tracks) {
	var track = db.tracks[prop];
	tracks.push(track);
};

var tracksWithoutID = tracks.filter(function(item) {
	return !item.ytid;
});

tracksWithoutID.forEach(function(track) {
	var id = youtube(track.url);
	track.ytid = id;
});

tracks.forEach(function(track) {
	console.log(track.ytid);
});
