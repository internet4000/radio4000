/* eslint guard-for-in: 0 */

import { helper } from '@ember/component/helper';

/*
	IMAGE HELPER

	1. You pass it a cloudinary public ID like this: imprint-85_haowtdg
	2. Then we add the base and optional transformations to get something like this:

	//res.cloudinary.com/radio4000/image/upload/c_thumb,h_240,w_240,c_fill,fl_lossy,q_60/v1428245306/${src}
*/

const base = 'https://res.cloudinary.com/radio4000/image/upload';
const defaultQuality = 70;

export function imgUrl(imageId, hash) {
	let url = '';
	const transforms = [];

	// Set a default quality
	transforms.push(`q_${defaultQuality}`);

	// Collect transforms from the passed in options
	for (const prop in hash) {
		if (prop === 'transforms') {
			transforms.push(`${hash[prop]}`);
		} else {
			transforms.push(`${prop}_${hash[prop]}`);
		}
	}

	// Build the URL
	url = `${base}/${transforms.join(',')}/${imageId}`;

	// If a format is specified, append it
	if (hash && hash.format) {
		url = `${url}.${hash.format}`;
	}

	return url;
}

export default helper(imgUrl);
