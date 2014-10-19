import Ember from 'ember';
import DocumentTitleMixin from '../mixins/document-title';

export default Ember.Route.extend(DocumentTitleMixin, {
	title: 'Oskar - Radio4000',
	// titleDivider: '-',
	// titleSpecificityIncreases: false,

	model: function() {
		return this.store.find('playlist');
	}
});
