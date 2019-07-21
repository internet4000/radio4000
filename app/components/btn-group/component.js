import Component from '@ember/component'

export default Component.extend({
	classNames: ['BtnGroup'],

	click(event) {
		const activeButton = this.element.querySelector('.Btn.is-active')

		activeButton.classList.remove('is-active')
		event.target.classList.add('is-active')
	}
})
