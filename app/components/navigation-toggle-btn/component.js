import Ember from 'ember'

const {Component, inject, computed, get} = Ember

export default Component.extend({
	tagName: 'button',
	uiStates: inject.service(),
	attributeBindings: ['title'],
	classNames: ['Btn', 'NavigationToggleBtn'],
	classNameBindings: ['isToggled:is-active'],

	isToggled: computed.oneWay('uiStates.isPanelLeftVisible'),

	title: computed('isToggled', function() {
		if (get(this, 'isToggled')) {
			return 'Close the navigation menu'
		}
		return 'Open the navigation menu [shortcut: "b"]'
	}),

	click() {
		get(this, 'uiStates').togglePanelLeft()
	}
})
