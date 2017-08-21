import Ember from 'ember';

const {Component, get} = Ember;

export default Component.extend({
	classNames: ['ChannelHeader'],
	actions: {
		toggleFavorite() {
			return get(this, 'channel.toggleFavorite').perform();
		}
	}
});
