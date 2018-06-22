import Component from '@ember/component'
import { get } from '@ember/object'
import { inject as service } from '@ember/service'

export default Component.extend({
	classNames: ['Track-contextual', 'ContextualToggle'],

	session: service(),
	// track: Object
	// canEdit: Boolean
	// onEdit: Function

	copyURL(url, text = 'Copy this URL') {
		window.prompt(text, url);
	},

	actions: {
		editTrack() {
			const track = get(this, 'track')
			get(this, 'onEdit')(track)
		},
		copyTrackToRadio() {
			const track = get(this, 'track')
			get(this, 'onCopyTrack')(track)
		},
		copyYoutubeURL() {
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
			el.selectedIndex = 0
		}
	}
});
