import Ember from 'ember';

const {Component, computed, get} = Ember;

export default Component.extend({
	tagName: 'article',
	classNames: ['ChannelCard'],
	classNameBindings: ['isActive', 'wide:ChannelCard--wide'],
	isActive: computed.reads('channel.isInPlayer'),
	title: computed('channel.{title,body}', function () {
		const body = get(this, 'channel.body') || '';
		const title = get(this, 'channel.title') || '';
		return `${body} (${title})`;
	})
});
