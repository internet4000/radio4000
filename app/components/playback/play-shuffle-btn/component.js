import Ember from 'ember';
import PlayButtonComponent from 'radio4000/components/playback/play-button/component';

const {computed} = Ember;

// Extends the play button with a different title and template

export default PlayButtonComponent.extend({
	attributeBindings: ['title'],
	title: computed('shuffle', function () {
		return this.get('shuffle') ? 'Shuffle this radio' : 'Play this radio';
	})
});
