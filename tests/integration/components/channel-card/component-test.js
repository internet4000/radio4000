import Service from '@ember/service';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('/channel-card', 'Integration | Component | channel card', {
	integration: true
});

test('it renders a title', function (assert) {
	this.register('service:session', Service.extend());
	this.set('model', {title: 'It works!'});
	this.render(hbs`{{channel-card channel=model}}`);
	assert.equal(this.$('h3').text().trim(), 'It works!');
});
