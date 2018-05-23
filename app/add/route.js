import UserChannelRoute from 'radio4000/routes/user-channel'
import resetScroll from 'radio4000/mixins/reset-scroll'

export default UserChannelRoute.extend(resetScroll, {
	setupController(controller) {
		this.super(...arguments)
		let parsedUrl = new URL(window.location.href)
		let videoUrl = parsedUrl.searchParams.get('url')
		controller.set('url', videoUrl)
	}
})
