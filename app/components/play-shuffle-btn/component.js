import Ember from 'ember';
import PlayButtonComponent from 'radio4000/components/play-btn/component';
import {task} from 'ember-concurrency'
import {conditional} from 'ember-awesome-macros'
import raw from 'ember-macro-helpers/raw'

const {computed, get} = Ember;

export default PlayButtonComponent.extend({
	isPlaying: computed.reads('channel.isInPlayer'),

	title: conditional(
		'isPlaying',
		raw('Play a new random track from "all" tracks in this radio channel'),
		raw('Play this radio')
	),

	clickTask: task(function * () {
		const player = get(this, 'player')
		const taskName = get(this, 'isPlaying') ? 'playRandomTrack' : 'playFirstTrack'
		yield get(player, taskName).perform(get(this, 'channel'))
	})
})
