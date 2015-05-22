import Ember from 'ember';

const { computed, debug } = Ember;

export default Ember.Component.extend({
	// not sure how to set up SortableMixin
	// sortedandfiltered: computed('filtered', function() {
	sortedandfiltered: computed('model', function() {
		return Ember.ArrayController.create({
			// content: this.get('filtered'),
			content: this.get('model'),

			// Newest on top
			sortProperties: ['created'],
			sortAscending: false
		});
	})

	// filter: '',
	// // Returns either all tracks or the filtered tracks by hashtag
	// filtered: computed('filter', 'model', function() {
	// 	let filter = this.get('filter');
	// 	let model = this.get('model');

	// 	if (!filter) {
	// 		return model;
	// 	}

	// 	// returns models which has the filter (the tag)
	// 	// in their hashtags property
	// 	return model.filter((track) => {
	// 		let hashtags = track.get('hashtags');

	// 		if (!hashtags) { return false; }

	// 		return hashtags.contains(filter);
	// 	});
	// }),

	// // Returns the unique tags from all models
	// tags: computed('model.@each.hashtags', function() {
	// 	let model = this.get('model');
	// 	let tags = model.getEach('hashtags');

	// 	debug('tags computed (keep this low)');

	// 	// Remove tracks without hashtags
	// 	tags = tags.compact();

	// 	// Flatten the array
	// 	tags = (tags.join(',')).split(','); // js version (lodash: _.flatten)

	// 	// Only keep uniques
	// 	tags = tags.uniq();

	// 	// Remove more empty ones (todo: shouldn't be necessary)
	// 	tags = tags.filter((tag) => {
	// 		return tag !== '';
	// 	});

	// 	return tags;
	// })
});
