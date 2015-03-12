import DS from 'ember-data';
import youtube from 'radio4000/utils/youtube';

export default DS.Model.extend({
	url: DS.attr('string'),
	title: DS.attr('string'),
	body: DS.attr('string'),
	created: DS.attr('number'),
	channel: DS.belongsTo('channel', { async: true }),
	ytid: DS.attr('string'),

	// Format the date
	createdDate: function() {
		return window.moment(this.get('created')).fromNow();
	}.property('created'),

	// Returns a YouTube ID from an URL
	// TODO: this should definitely be saved in the db
	// and not computed every time like it is now
	updateProvider: function() {
		console.log('updateYtid');
		var id = youtube(this.get('url'));
		this.set('ytid', id);
		this.save();
	}
});
