import Mixin from '@ember/object/mixin'

export default Mixin.create({
	beforeModel() {
		if (!this.get('session.isAuthenticated')) {
			this.transitionTo('auth.login')
		}
		this._super()
	}
})
