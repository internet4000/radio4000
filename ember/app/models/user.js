/* global md5 */
import DS from 'ember-data';

var User = DS.Model.extend({
	name: DS.attr('string'),
	created: DS.attr('number'),
	playlists: DS.hasMany('playlist', { async: true }),

	hasPlaylist: DS.attr('boolean', {defaultValue: false}),

	// pagesCount: function() {
	// 	// Here is where i go wrong, i can get the length of spreads, but not access a spread to get the page length.
	// 	var spreadsLength = this.get('spreads.length');
	// 	var ret = 0;
	// 	this.get("spreads").forEach(function(spread)){
	// 		ret += spread.get('pages.length');
	// 	}
	// 	return ret;
	// }.property('spreads.@each.pages.length'),

	avatar: function() {
		return 'https://www.gravatar.com/avatar/' + md5(this.get('id')) + '.jpg?d=retro&size=80';
	}.property()
});

export default User;
