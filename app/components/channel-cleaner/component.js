import Component from '@ember/component';

export default Component.extend({
	userChannel: null,
	async didReceiveAttrs() {
		this._super(...arguments);
		let channel = this.get('userChannel');
		this.store.peakAll('channels')
		const favorites = await channel.get('favoriteChannels');
		favorites.forEach(channel => {
			debugger
		})
	}
});
