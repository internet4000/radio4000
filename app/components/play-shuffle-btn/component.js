import Ember from 'ember';
import PlayButtonComponent from 'radio4000/components/play-btn/component';
import {getRandomIndex} from 'radio4000/utils/random-helpers';

const {computed, get} = Ember;

// Extends the play button with a different title and template

export default PlayButtonComponent.extend({
	attributeBindings: ['title'],

	isPlaying: computed.alias('channel.isInPlayer'),
	title: computed('isPlaying', function () {
		return get(this, 'isPlaying') ? 'Play a random track' : 'Play this radio';
	}),

	click() {
		if (get(this, 'isPlaying') === true) {
			this.playRandomTrack();
		} else {
			this.playFirstTrack();
		}
	},

	playRandomTrack() {
		get(this, 'tracks').then(tracks => {
			const randomIndex = getRandomIndex(tracks);
			const randomTrack = tracks.objectAt(randomIndex);
			get(this, 'player').playTrack(randomTrack);
		});
	}
});
