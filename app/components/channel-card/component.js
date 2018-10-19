import Component from '@ember/component'
import {computed, get} from '@ember/object'

export default Component.extend({
	tagName: 'article',
	classNames: ['ChannelCard'],
	classNameBindings: ['isActive', 'wide:ChannelCard--wide'],
	isActive: computed.reads('channel.isInPlayer'),
	title: computed('channel.{title,body}', function() {
		const body = get(this, 'channel.body') || ''
		const title = get(this, 'channel.title') || ''
		return `${body} (${title})`
	}),
	disableLazyload: computed('index', function() {
		return get(this, 'index') > 0 && get(this, 'index') < 10
	})
})
