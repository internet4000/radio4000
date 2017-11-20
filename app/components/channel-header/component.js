import Ember from 'ember';
import addMonths from 'npm:date-fns/add_months';
import isAfter from 'npm:date-fns/is_after';

const {
	Component,
	computed,
	get
} = Ember;

export default Component.extend({
	classNames: ['ChannelHeader'],
	hasLinks: computed.or('channel.link', 'channel.hasCoordinates'),
	shouldShowUpdated: computed('channel.updated', function() {
		const updatedTimestamp = get(this, 'channel.updated');

		if(!updatedTimestamp) { return }

		const limit = addMonths(new Date(), -2);
		console.log('limit', limit)
		return isAfter(new Date(updatedTimestamp), limit);
	})
});
