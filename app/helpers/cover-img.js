import Ember from 'ember'

// This helper returns a full Cloudinary image url
// with some optimization and formats.

const quality = 50;

export function coverImg([id], {size = 200, format}) {
	const base = `https://res.cloudinary.com/radio4000/image/upload/w_${size},h_${size},c_thumb`

	// This is a predefined animated version of webp.
	if (format === 'awebp') {
		return `${base},q_${quality},fl_awebp/${id}.webp`
	}

	// Use this to overwrite the image format.
	if (format) {
		quality = 'auto'
		return `${base},q_${quality}/${id}.${format}`
	}

	// The default cover image.
	return `${base},q_${quality},c_fill,fl_lossy/${id}`
}

export default Ember.Helper.helper(coverImg)
