import Ember from 'ember';

const {Component, computed, get} = Ember;

export default Component.extend({
    tagName: 'article',
    classNames: ['ChannelCard'],
    classNameBindings: ['isActive', 'wide:ChannelCard--wide'],
    isActive: computed.reads('channel.isInPlayer'),
    title: computed('channel.title', 'channel.body', function() {
	const body = this.get('channel.body') || '';
	const title = this.get('channel.title') || '';
	return `${body} (${title})`;
    })
});
