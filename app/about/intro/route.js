import ChannelsIndexRoute from 'radio4000/channels/index/route'

// Reuse the "random featured radios" model

export default ChannelsIndexRoute.extend({
	model() {
		return this.store.query('channel', {
			orderBy: 'isFeatured',
			equalTo: true,
			limitToLast: 10
		});
	}
})
