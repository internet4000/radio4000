import Route from '@ember/routing/route';
import ownerRouteMixin from 'radio4000/mixins/owner-route';
import resetScroll from 'radio4000/mixins/reset-scroll'

export default Route.extend(ownerRouteMixin, resetScroll, {});
