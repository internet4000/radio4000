import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	tagName: 'article',
	classNames: ['ChannelCard'],
	classNameBindings: ['isActive'],
	isActive: computed.reads('channel.isInPlayer')
});
