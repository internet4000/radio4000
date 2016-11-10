import Ember from 'ember';

const {Controller, computed} = Ember;

export default Controller.extend({
	// Sort by last updated on top. Because this changes over time it'll make it more interesting.
	sortDefinition: ['updated:desc'],
	sortedFeaturedChannels: computed.sort('model.featured', 'sortDefinition')
});

