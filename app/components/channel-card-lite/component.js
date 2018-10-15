import Component from '@ember/component'
import {computed} from '@ember/object'

export default Component.extend({
	tagName: 'article',
	classNames: ['ChannelCard'],
	classNameBindings: ['isActive'],
	isActive: computed.reads('channel.isInPlayer')
})
