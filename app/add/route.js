import UserChannelRoute from 'radio4000/routes/user-channel'
import resetScroll from 'radio4000/mixins/reset-scroll'

export default UserChannelRoute.extend(resetScroll, {
	setupController(controller) {
		this._super(...arguments)
		// If you enter an unencoded URL as
		// /add?url=https://www.youtube.com/watch?v=zxnJD7exFEM
		// Ember will ignore everything after the `v=` part. So we parse
		// the URL and set the query param manually.
		let parsedUrl = new URL(window.location.href)
		let videoUrl = parsedUrl.searchParams.get('url')
		controller.set('url', videoUrl)
	}
})
