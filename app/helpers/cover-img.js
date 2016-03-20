import Ember from 'ember';

const base = 'https://res.cloudinary.com/radio4000/image/upload';

export function coverImg(params, {size, webp}) {
	const id = params[0];
	if (webp) {
		return `${base}/w_${size},h_${size},q_50,c_thumb,fl_awebp/${id}.webp`;
	}
	return `${base}/q_50,w_${size},h_${size},c_thumb,c_fill,fl_lossy/${id}`;
}

export default Ember.Helper.helper(coverImg);
