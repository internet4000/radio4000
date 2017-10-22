import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	classNames: ['ChannelHeader'],
	hasLinks: computed.or('channel.link', 'channel.coordinates')
});
