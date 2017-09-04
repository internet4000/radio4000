import Ember from 'ember';
import authenticatedRoute from 'radio4000/mixins/authenticated-route';
import ownerRoute from 'radio4000/mixins/owner-route';

export default Ember.Route.extend(authenticatedRoute, {
});
