/*
	SOUNDCLOUD WRAPPER

https://developers.soundcloud.com/docs/api/
https://w.soundcloud.com/player/api_playground.html
https://developers.soundcloud.com/docs/api/reference#oembed
http://stackoverflow.com/questions/18117605/pause-youtube-embed-when-playing-soundcloud-embed?rq=1

*/


// Loads info from a Soundcloud URL and inserts the embed into the DOM
var scLoad = function(trackUrl) {
	if (!trackUrl) trackUrl = 'http://soundcloud.com/forss/flickermood';

	SC.oEmbed(trackUrl, { auto_play: false }, function(oEmbed) {
		// console.log(oEmbed); // this object contains handy data
		$('#SoundCloud').html(oEmbed.html);
	});
}


// NON WORKING CODE. TO BE DONE

var Soundcloud = {
	init: function(){

		// Find the soundcloud iframe and create a "SC widget" from it
		widget: SC.Widget(document.getElementById('sc-widget')),
		this.widgetEvents();
	},

	widgetEvents: function() {

		// When the widget is ready
		widget.bind(SC.Widget.Events.READY, function() {
			console.log('sc ready');
		});

		// When a sound starts playing
		widget.bind(SC.Widget.Events.PLAY, function() {
			console.log('sc play');
			// get information about currently playing sound
			widget.getCurrentSound(function(currentSound) {
				console.log('sound ' + currentSound.get('') + 'began to play');
			});
		});

		// When a sound finishes
		widget.bind(SC.Widget.Events.FINISH, function() {
			console.log('sc finish');
			// @todo: trigger next event in our own player
			// widget.load(newSoundUrl);
		});
	}
};
