import Ember from 'ember';

const {Component, computed, get} = Ember;

export default Component.extend({
	channel: null,
	url: computed('channel.slug', function() {
		return 'https://radio4000.com/' + get(this, 'channel.slug')
	})
});
