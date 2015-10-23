import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
	track: null,

	// validations
	showErrors: false,
	validations: {
		'track.url': {
			presence: true,
			// TODO make a check for utube URL regex
			length: {
				// http://you.be
				minimum: 13
			}
		},
		'track.title': {
			presence: true,
			length: {
				// http://dougscripts.com/itunes/itinfo/id3tags00.php
				// artist + songTitle
				maximum: 60
			}
		},
		'track.body': {
			length: {
				maximum: 300
			}
		}
	},

	actions: {
		submit() {
			this.validate().then(() => {
				Ember.debug('Edit track validates!')
				this.sendAction('submit', this.get('track'));
			}).catch(() => {
				Ember.debug('Edit does not validate…')
				this.set('showErrors', true);
			});
		},
		cancel() {
			this.get('track').rollbackAttributes();
			this.sendAction('cancel');
		},
		deleteTrack() {
			this.sendAction('deleteTrack', this.get('track'));
		}
	}
});
