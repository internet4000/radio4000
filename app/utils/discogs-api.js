const discogsApiUrl = 'https://edapi.glitch.me/'

const serializeInfo = info => {
	return info.toLowerCase().dasherize()
}

const serializeRelease = (release) => {
	let allStyles = [...release.styles, ...release.genres]
			.filter((elem, index, self) => {
				return index === self.indexOf(elem);
			})
	let result = {
		styles: allStyles.map(serializeInfo),
		labels: release.labels.map(i => serializeInfo(i.name)),
		country: serializeInfo(release.country),
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

const fetchReleaseInfos = async (releaseId) => {
	let url = buildUrl({
		type: 'release',
		id: releaseId
	})
	let response = await fetch(url)
	let data = await response.json()
	return serializeRelease(data);
}

export { fetchReleaseInfos }
