import DS from 'ember-data';
import youtubeRegex from 'npm:youtube-regex';
import {validator, buildValidations} from 'ember-cp-validations';

const {Model, attr, belongsTo} = DS;

export const Validations = buildValidations({
	url: [
		validator('presence', true),
		validator('format', {
			type: 'url',
			regex: youtubeRegex(),
			message: 'The URL has to be a valid and complete YouTube URL'
		})
	],
	title: [
		validator('presence', true),
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
	finishedInCurrentPlayer: false

});
