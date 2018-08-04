import youtubeRegex from 'youtube-regex';

export default function youtubeUrlToId(url) {
	const results = youtubeRegex().exec(url);
	if (!results) {
		return false;
	}
	return results[1];
}
