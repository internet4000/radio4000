import Ember from 'ember';

const {Component, inject, computed} = Ember;

export default Component.extend({
    uiStates: inject.service(),
    tagName: ['button'],
    attributeBindings: ['title'],
    classNames: ['AsideLeftToggle', 'Btn', 'Btn--small'],
    classNameBindings: ['isToggled:Btn--isActive'],
    title: "Toggle the visibility of the navigation menu",
    isToggled: computed.oneWay('uiStates.isPanelLeftVisible'),
    click() {
	this.get('uiStates').togglePanelLeft();
    },
    html: '<'
});
