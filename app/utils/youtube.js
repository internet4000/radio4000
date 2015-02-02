// Returns a YouTube ID from an URL
// adapted from http://stackoverflow.com/a/5831191/1614967
// and https://github.com/brandly/angular-youtube-embed/blob/master/src/angular-youtube-embed.js

export default function youtube(url) {
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

// Get the ID from a YouTube URL
// TODO: replace this non-reliable function with the one we have in the track model
// the one from track model should probably be moved into a helper somewhere
// getYouTubeID: function(url) {
// 	return url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/)[1];
// }
