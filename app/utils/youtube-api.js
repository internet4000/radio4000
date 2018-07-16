import Ember from 'ember';
import config from 'radio4000/config/environment';
const {debug} = Ember;

const fetchYoutubeTrack = async (ytid, fields) => {
	if (!ytid) {
		throw Error('You need to provide a youtube video to fetchYoutubeTrack')
	}
	if (!fields) {
		fields = `items(id,snippet,contentDetails,statistics)&part=snippet,contentDetails,statistics`;
	}

	let rootUrl = `https://www.googleapis.com/youtube/v3/videos?key=${config.youtubeApiKey}`
	let url = rootUrl + `&id=${ytid}&fields=${fields}`
	let response = await fetch(url);
	let data = await response.json();
	return data
}

const fetchTitle = async function (ytid) {
	let data = await fetchYoutubeTrack(ytid, 'items(id,snippet(title))&part=snippet');

	if (!data.items.length) {
		debug('Could not find title for track');
		return;
	}

	return data.items[0] && data.items[0].snippet.title
}

const fetchTrackAvailability = async function (ytid) {
	// let data = await fetchYoutubeTrack(ytid, 'items(id,status)&part=status')
	let data = await fetchYoutubeTrack(ytid, 'items(id,snippet(title))&part=snippet')

	return Boolean(data.items.length)
}

export {fetchTitle, fetchTrackAvailability};
