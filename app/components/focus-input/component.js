import Ember from 'ember';

const {TextField, get} = Ember;

export default TextField.extend({
	// user param
	select: false,

	// http://emberjs.com/guides/cookbook/user_interface_and_interaction/focusing_a_textfield_after_its_been_inserted/
	becomeFocused: Ember.on('didInsertElement', function () {
		this.element.focus();

		if(get(this, 'select')) {
			this.element.select();
		}
	})


});
