import Ember from 'ember'

const {Component, inject, computed, get} = Ember

export default Component.extend({
	uiStates: inject.service(),

	html: '<',
	attributeBindings: ['title'],
	classNames: ['Aside-toggle'],
	classNameBindings: ['isToggled:is-active'],

	isToggled: computed.oneWay('uiStates.isPanelLeftVisible'),

	title: computed('isToggled', function() {
		if (get(this, 'isToggled')) {
			return 'Close the navigation menu'
		}
		return 'Open the navigation menu'
	}),

	click() {
		get(this, 'uiStates').togglePanelLeft()
	}
})
