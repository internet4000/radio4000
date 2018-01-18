import Ember from 'ember';
import PlayButtonComponent from 'radio4000/components/play-btn/component';
import {getRandomIndex} from 'radio4000/utils/random-helpers';

const {computed, get} = Ember;

// Extends the play button with a different title and template

export default PlayButtonComponent.extend({
	attributeBindings: ['title'],
	isPlaying: computed.alias('channel.isInPlayer'),
	title: computed('isPlaying', function () {
		return get(this, 'isPlaying') ? 'Play a new random track from "all" tracks in this radio channel' : 'Play this radio';
	}),


	clickTask: task(function * () {
		const player = get(this, 'player')
		const taskName = get(this, 'isPlaying') ? 'playRandomTrack' : 'playFirstTrack'
		yield get(player, taskName).perform(get(this, 'channel'))
	})
})
