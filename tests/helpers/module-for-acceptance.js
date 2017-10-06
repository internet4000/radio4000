import { resolve } from 'rsvp';
import { module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

export default function (name, options = {}) {
	module(name, {
		beforeEach() {
			this.application = startApp();

			if (options.beforeEach) {
				return options.beforeEach.apply(this, arguments);
			}

			// Use this to 'stub' services in tests.
			// Example: this.register('service:session', Ember.Service.extend({}))
			this.register = (fullName, Factory) => {
				let instance = this.application.__deprecatedInstance__;
				let registry = instance.register ? instance : instance.registry;

				return registry.register(fullName, Factory);
			};
		},

    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return resolve(afterEach).then(() => destroyApp(this.application));
    }
	});
}
