import Component from '@ember/component';

export default Component.extend({
	classNames: ['DiscogsInfo'],
	actions: {
		add(info) {
			// add it has a hashtag `#`
			this.get('addInfo')(`#${info}`)
		}
	}
});
