import youtubeRegex from 'npm:youtube-regex';

export default function youtubeUrlToId(url) {
	console.log(url);
	const results = youtubeRegex().exec(url);
	console.log(results);
	if (!results) {
		// throw new Error(`Could not parse the URL: ${url}`);
		return false;
	}
	return results[1];
}
