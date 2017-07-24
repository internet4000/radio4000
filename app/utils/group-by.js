import Ember from 'ember';

const {
	A,
	computed,
	get,
	isPresent} = Ember;

/*
 * source: https://github.com/HeroicEric/ember-group-by
 * not used as an ember addon because it is nice to have it here
 * and look at the code
 */

export default function groupBy(collection, property) {
	var dependentKey = collection + '.@each.' + property;

	return computed(dependentKey, function () {
		var groups = new A();
		var items = get(this, collection);

		items.forEach(function (item) {
			var value = get(item, property);
			var group = groups.findBy('value', value);

			if (isPresent(group)) {
				get(group, 'items').push(item);
			} else {
				group = {property: property, value: value, items: [item]};
				groups.push(group);
			}
		});

		return groups;
	}).readOnly();
}
