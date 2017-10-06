import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
	tagName: 'article',
	classNames: ['ChannelCard'],
	classNameBindings: ['isActive', 'wide:ChannelCard--wide'],
	isActive: reads('channel.isInPlayer'),
	title: computed('channel.title', 'channel.body', function () {
		const body = get(this, 'channel.body') || '';
		const title = get(this, 'channel.title') || '';
		return `${body} (${title})`;
	})
});
