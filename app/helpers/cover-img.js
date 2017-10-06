import { helper } from '@ember/component/helper';

// This helper returns a full Cloudinary image url
// with some optimization and formats.

const base = 'https://res.cloudinary.com/radio4000/image/upload';
const quality = 50;

export function coverImg(params, {size, format}) {
	const id = params[0];
	if (format === 'awebp') {
		// This is an animated version of webp.
		return `${base}/w_${size},h_${size},q_${quality},c_thumb,fl_awebp/${id}.webp`;
	} else if (format) {
		return `${base}/w_${size},h_${size},q_auto,c_thumb/${id}.${format}`;
	}
	return `${base}/q_${quality},w_${size},h_${size},c_thumb,c_fill,fl_lossy/${id}`;
}

export default helper(coverImg);
