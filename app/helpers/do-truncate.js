/* global Handlebars */

/**
 * Truncate text helper

	Use in a .hbs file like this:

	{{do-truncate "abcdefghijklmnopqrstuvwxyz" 10}}

	or like this

	{{do-truncate someVariable 140}}

	(btw, the helper only has a dash in its name so ember-cli loads it everywhere automatically)
*/

import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(str, len) {
	if (!str) { return ''; }
	if (str.length > len && str.length > 0) {
		var new_str = str + ' ';
		new_str = str.substr (0, len);
		new_str = str.substr (0, new_str.lastIndexOf(' '));
		new_str = (new_str.length > 0) ? new_str : str.substr (0, len);

		return new Ember.Handlebars.SafeString( new_str + ' […]' );
	}
	return str;
});
