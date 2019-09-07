// https://regex101.com/r/pJ4wC5/1
const hashtagRegex = /(^|\s)(#[a-z\d-]+)/ig

const findHashtags = searchText => {
	if (!searchText) return null
	// https://regexr.com/46r2p
	var regexp = /(?:\B#)(\w|-?)+\b/g
	let result = searchText.match(regexp)
	if (!result) {
		return null
	}
	return result.map(item => item.replace('#', ''))
}

const generateHashtags = (items, attribute = 'body') => {
	let aggBodies
	if (items && items.length) {
		aggBodies = items
			.map(item => item[attribute])
			.reduce((acc, curr) => {
				return acc + ' ' + curr
			})
	} else {
		aggBodies = ''
	}

	return findHashtags(aggBodies)
}

const generateUniqueHashtags = (items, attribute) => {
	let tags = generateHashtags(items, attribute)

	if (!tags) return null

	let uniqueTags = tags.reduce((acc, cur) => {
		if (Object.prototype.hasOwnProperty.call(acc, cur)) {
			acc[cur]++
		} else {
			acc[cur] = 1
		}
		return acc
	}, {})

	let sortedTags = Object.entries(uniqueTags).sort((a, b) => {
		return b[1] - a[1]
	})

	const result = {
		tags: sortedTags.map(i => i[0]),
		sortedTags: sortedTags
	}

	return result
}

export {
	hashtagRegex,
	generateHashtags,
	generateUniqueHashtags,
	findHashtags
}
