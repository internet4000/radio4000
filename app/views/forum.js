import Ember from 'ember';

export default Ember.View.extend({
	setForumIframe: function() {
		this.$('#Forum')[0].src =
			'https://groups.google.com/forum/embed/?place=forum/radio4000' + '&showsearch=true&showpopout=true&showtabs=false' + '&parenturl=' + encodeURIComponent(window.location.href);
	}.on('didInsertElement')
});
