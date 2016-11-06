import Ember from 'ember';

const {Component, inject, computed} = Ember;

export default Component.extend({
    uiStates: inject.service(),
    classNames: ['AsideLeftToggle', 'Btn', 'Btn--small'],
    classNameBindings: ['isToggled:Btn--isActive'],
    isToggled: computed.oneWay('uiStates.isPanelLeftVisible'),
    click() {
	this.get('uiStates').togglePanelLeft();
    },
    html: "<"
});
