/*global Handlebars */

/**
 * Truncate text helper
 *
 * use in .hbs file
 * {{do-truncate "abcdefghijklmnopqrstuvwxyz" 10}}
 *
 * if helpers have two names, like do-truncate instead of just truncate, ember-cli can load them automatically everywhere (performance!)
 **/

import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(str, len) {
	if (str.length > len && str.length > 0) {
		var new_str = str + ' ';
		new_str = str.substr (0, len);
		new_str = str.substr (0, new_str.lastIndexOf(' '));
		new_str = (new_str.length > 0) ? new_str : str.substr (0, len);

		return new Handlebars.SafeString( new_str + ' […]' );
	}
	return str;
});
