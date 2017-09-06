import Ember from 'ember';
import ownerRouteMixin from 'radio4000/mixins/owner-route';
import resetScroll from 'radio4000/mixins/reset-scroll'

const {Route} = Ember;

export default Route.extend(ownerRouteMixin, resetScroll, {});
