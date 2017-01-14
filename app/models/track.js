import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';
import youtubeUrlToId from 'radio4000/utils/youtube-url-to-id';
import format from 'npm:date-fns/format';
// import getMonth from 'npm:date-fns/get_month';
// import getYear from 'npm:date-fns/get_year';
// import getISOWeek from 'npm:date-fns/get_iso_week';

const {Model, attr, belongsTo} = DS;
const {computed, get, set} = Ember;

export const Validations = buildValidations({
	url: [
		validator('presence', true),
		validator('youtube-url')
	],
	title: [
	  validator('presence', {
	    presence: true,
	    ignoreBlank: true,
	    message: 'Field should not be empty'
	  }),
		validator('length', {
			max: 256
		})
	],
	body: [
		validator('length', {
			max: 300
		})
	]
});

export default Model.extend(Validations, {
	created: attr('number', {
		defaultValue() {
			return new Date().getTime();
		}
	}),
	createdMonth: computed('created', function () {
		let created = get(this, 'created');
		return format(created, 'Wo \w\e\e\k of YYYY');
	}),
	url: attr('string'),
	title: attr('string'),
	body: attr('string'),
	ytid: attr('string'),

	// relationships
	channel: belongsTo('channel', {
		async: true,
		inverse: 'tracks'
	}),

	// Own properties
	// property for local use only, not planned to save them
	usedInCurrentPlayer: false,
	finishedInCurrentPlayer: false,

	// If the user changes the url, we need to update the YouTube id.
	updateYoutubeId() {
		const url = get(this, 'url');
		const ytid = youtubeUrlToId(url);
		if (ytid) {
			set(this, 'ytid', ytid);
		}
	}
});
