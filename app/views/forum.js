import Ember from 'ember';

export default Ember.View.extend({

	// this sets the url on the iframe in the template to load the forum
	setForumIframe: function() {
		var url =	'https://groups.google.com/forum/embed/?place=forum/radio4000' +
					 	'&showsearch=true&showpopout=true&showtabs=false' +
					 	'&parenturl=' +
					 	encodeURIComponent(window.location.href);

		this.$('#Forum')[0].src = url;
	}.on('didInsertElement')
});
