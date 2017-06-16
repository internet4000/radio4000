import Ember from 'ember';
import PlayButtonComponent from 'radio4000/components/play-btn/component';
import { getRandomIndex } from 'radio4000/utils/random-helpers';

const { computed, get, set } = Ember;

// Extends the play button with a different title and template

export default PlayButtonComponent.extend({
	attributeBindings: ['title'],

	title: computed('isPlaying', function () {
		return get(this, 'isPlaying') ? 'Randomize track' : 'Play this radio';
	}),

	click() {
		if(get(this, 'isPlaying') === true) {
			this.playRandomTrack()
		} else {
			set(this, 'isPlaying', true)
			this.playFirstTrack();
		}
	},

	playRandomTrack() {
		get(this, 'tracks').then(tracks => {
			const randomIndex = getRandomIndex(tracks);
			get(this, 'player').playTrack(tracks.objectAt(randomIndex));
		})
	}
});
