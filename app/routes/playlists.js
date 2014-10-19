import Ember from 'ember';
import DocumentTitleMixin from '../mixins/document-title';

export default Ember.Route.extend(DocumentTitleMixin, {
	// title: 'Discover - Radio4000',
	// titleSpecificityIncreases: false,
	// titleDivider: '-',

	model: function() {
		return this.store.find('playlist');
	}
});
