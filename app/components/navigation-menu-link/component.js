import Ember from 'ember'
import LinkComponent from '@ember/routing/link-component';
const {get} = Ember

export default LinkComponent.extend({
	classNames: ['Btn', 'Btn--navigationToggle'],
	click(event) {
		if (get(this, 'active')) {
			event.preventDefault()
			history.back()
		}
	}
})
