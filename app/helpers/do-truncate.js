/**
 * Truncate text helper

	Use in a .hbs file like this:

	{{do-truncate "abcdefghijklmnopqrstuvwxyz" 10}}

	or like this

	{{do-truncate someVariable 140}}
*/

import Ember from 'ember';

export default Ember.Helper.helper(([str, len]) => {
	if (!str) {
		return '';
	}

	const shouldTruncate = str.length > len && str.length > 0;
	if (shouldTruncate) {
		let newString = `${str} `;

		newString = str.substr(0, len);
		newString = str.substr(0, newString.lastIndexOf(' '));
		newString = (newString.length > 0) ? newString : str.substr(0, len);

		return new Ember.Handlebars.SafeString(`${newString}…`);
	}

	return str;
});
