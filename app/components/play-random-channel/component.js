import PlayButtonComponent from 'radio4000/components/play-btn/component'
import {task} from 'ember-concurrency'

export default PlayButtonComponent.extend({
	title: 'Play a random Radio4000 channel [⌨ r]',

	clickTask: task(function * () {
		yield this.get('player.playRandomChannel').perform()
	})
})
