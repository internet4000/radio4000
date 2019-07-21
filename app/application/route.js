import Route from '@ember/routing/route'
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'
import {inject as service} from '@ember/service'
import KeyboardShortcutsGlobal from 'radio4000/mixins/keyboard-shortcuts-global'

export default Route.extend(ApplicationRouteMixin, KeyboardShortcutsGlobal, {
	session: service(),
	player: service()
})
