import DS from 'ember-data';

export default DS.Model.extend({
	url: DS.attr('string'),
	title: DS.attr('string', { defaultValue: 'Untitled' }),
	body: DS.attr('string'),
	created: DS.attr('number'),
	channel: DS.belongsTo('channel', { async: true }),

	// Format the date
	createdDate: function() {
		var m = window.moment(this.get('created'));
		// return '%@ at %@'.fmt(m.format('MMMM Do, YYYY'), m.format('h:mm:ss a'));
		// return '%@ at %@'.fmt(m.format('MMMM Do, YYYY'));
		return m.fromNow(); // 19 hours ago
	}.property('created'),

	// adapted from http://stackoverflow.com/a/5831191/1614967
	// and https://github.com/brandly/angular-youtube-embed/blob/master/src/angular-youtube-embed.js
	ytid: function() {
		var url = this.get('url');
		var youtubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
		var id = url.replace(youtubeRegexp, '$1');

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
							.replace(youtubeRegexp, '$1');
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
	}.property('url')
});
