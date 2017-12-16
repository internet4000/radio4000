import Component from '@ember/component';

const { get } = Ember;

export default Component.extend({
	classNames: ['Track-contextual', 'ContextualToggle'],

	copyURL(url, text = 'Copy this URL') {
		window.prompt(text, url);
	},

	actions: {
		editTrack() {
			get(this, 'onEdit')()
		},

		copyTracktoRadio() {
			console.log('copyTracktoRadio');
		},

		copyYoutubeURL() {
			console.log('copyYoutubeURL');
			this.copyURL(get(this, 'track.url'))
		},

		copyR4URL() {
			const id = get(this, 'track.id');
			const slug = get(this, 'track.channel.slug');
			const url = `https://radio4000.com/${slug}/${id}`;
			this.copyURL(url);
		},
		handleSelect(event) {
			const el = event.target;
			const value = el.options[el.selectedIndex].value;
			this.send(value);
		}
	}
});
