import DS from 'ember-data';

export default DS.Model.extend({
	channel: DS.belongsTo('channel'),
	src: DS.attr('string'),

	background: function() {
		var src = this.get('src');
		if (src) {
			return 'background-image: url('+ src +')';
		} else {
			return '';
		}
	}.property('src'),
});
