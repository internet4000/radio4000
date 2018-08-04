const discogsApiUrl = 'https://edapi.glitch.me/'

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
	let url = this.buildUrl({
		type: 'release',
		id: releaseId
	})
	let response = await fetch(url)
	let data = await response.json()
}

export { fetchReleaseInfos }
