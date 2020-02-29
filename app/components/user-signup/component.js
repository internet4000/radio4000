import Ember from 'ember';
import {validator, buildValidations} from 'ember-cp-validations';
import {task} from 'ember-concurrency';

const {Component, get, set, computed} = Ember;

const Validations = buildValidations({
	email: [
		validator('presence', true),
		validator('format', {type: 'email'})
	],
	password: [
		validator('presence', true),
		validator('length', {min: 6})
	],
	signedUserAgreement: [
		validator('presence', true),
		validator('booleanIsTrue')
	]
});

export default Component.extend(Validations, {
	// email,
	// password,
	signedUp: false,
	signedUserAgreement: false,
	cannotSignUp: computed.not('signedUserAgreement'),
	cannotEmailSignUp: computed.or('submitTask.isRunning', 'validations.isInvalid'),
	submitTask: task(function * (providerId, email, password) {
		get(this, 'onSignup')(providerId, email, password);
		set(this, 'signedUp', true)
		yield
	}),
	actions: {
		submit(providerId, email, password) {
			get(this, 'submitTask').perform(providerId, email, password);
		},
		signUserAgreement(event) {
			set(this, 'signedUserAgreement', event)
		}
	}
});
