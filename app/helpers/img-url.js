/* eslint guard-for-in: 0 */

import Ember from 'ember';

/*
	IMAGE HELPER

	1. You pass it a cloudinary public ID like this: imprint-85_haowtdg
	2. Then we add the base and optional transformations to get something like this:

	//img.gb-online.com/q_100,w_1000,e_sharpen:100/gb-online.com/Pockit-Capri-Blue-campaign-portrait-28-17_jor3ek
	//res.cloudinary.com/radio4000/image/upload/c_thumb,h_240,w_240,c_fill,fl_lossy,q_60/v1428245306/${src}
*/

const base = '//res.cloudinary.com/radio4000/image/upload';
const defaultQuality = 70;

export function imgUrl(imageId, hash) {
	console.log(imageId);
	console.log(hash);

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
	if (hash.format) {
		url = `${url}.${hash.format}`;
	}

	return url;
}

export default Ember.Helper.helper(imgUrl);
