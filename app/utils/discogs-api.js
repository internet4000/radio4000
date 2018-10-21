const discogsApiUrl = 'https://edapi.glitch.me/'

const serializeInfo = info => {
	if (!info) {
		return ''
	}
	return info.toLowerCase().dasherize()
}

const serializeRelease = release => {
	let styles = [];
	let allStyles = styles.concat(
		release.styles,
		release.genres
	).filter((elem, index, self) => {
		return index === self.indexOf(elem);
	})

	let result = {
		styles: allStyles.map(serializeInfo),
		labels: release.labels ? release.labels.map(i => serializeInfo(i.name)) : [],
		country: release.country ? serializeInfo(release.country) : '',
		year: release.year
	}
	return result
}

const buildUrl = ({type, id}) => {
	if (type === 'release') {
		return `${discogsApiUrl}/releases/${id}`
	}
	if (type === 'master') {
		return `${discogsApiUrl}/masters/${id}`
	}
	return undefined
}

const fetchDiscogsInfo = async (id, type = 'release') => {
	let url = buildUrl({type, id})
	let response = await fetch(url)
	let data = await response.json()
	if (data.errors) {
		throw new Error(data.errors.msg)
	}
	return serializeRelease(data)
}

export { fetchDiscogsInfo }
