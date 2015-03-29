import Ember from 'ember';

export default Ember.TextField.extend({
	// http://emberjs.com/guides/cookbook/user_interface_and_interaction/focusing_a_textfield_after_its_been_inserted/
	becomeFocused: Ember.on('didInsertElement', function() {
		this.$().focus();
	})
});
