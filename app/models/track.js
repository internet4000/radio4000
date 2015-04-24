import DS from 'ember-data';
import youtube from 'radio4000/utils/youtube';

export default DS.Model.extend({
	url: DS.attr('string'),
	title: DS.attr('string'),
	body: DS.attr('string'),
	created: DS.attr('number', {
		defaultValue: function() { return new Date().getTime(); }
	}),
	channel: DS.belongsTo('channel', { async: true }),
	ytid: DS.attr('string'),

	// Returns a YouTube ID from an URL
	// TODO: this should definitely be saved in the db
	// and not computed every time like it is now
	updateProvider() {
		var id = youtube(this.get('url'));
		console.log('updateYtid');

		this.set('ytid', id);
		this.save();
	}
});
