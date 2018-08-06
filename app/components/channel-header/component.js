/* eslint ember/use-brace-expansion:0 */
import Ember from 'ember';
import addMonths from 'date-fns/add_months';
import isAfter from 'date-fns/is_after';

const {
	Component,
	computed,
	get
} = Ember;

export default Component.extend({
	classNames: ['ChannelHeader'],

	hasLinks: computed.or('channel.link', 'channel.hasCoordinates'),
	lat: computed.alias('channel.coordinatesLatitude'),
	lng: computed.alias('channel.coordinatesLongitude'),

	shouldShowUpdated: computed('channel.updated', function() {
		const updatedTimestamp = get(this, 'channel.updated');

		if (!updatedTimestamp) {
			return false;
		}

		const limit = addMonths(new Date(), -2);
		return isAfter(new Date(updatedTimestamp), limit);
	})
});
