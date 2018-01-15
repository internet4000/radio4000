import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('channel-sharer-url', 'Integration | Component | channel sharer url', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
  	{{channel-sharer-url
  		showEmbed=showEmbed
  		slug="my-radio"
  	}}
  `);
  assert.equal(this.$('input').val(), 'https://radio4000.com/my-radio', 'by default it shows the Radio4000 URL')
  this.set('showEmbed', true)
  assert.equal(this.$('input').val(), '<iframe src="https://api.radio4000.com/embed?slug=my-radio" width="320" height="500" frameborder="0"></iframe>', 'it can switch to show iframe/embed code')

  // Template block usage:
  this.render(hbs`
    {{#channel-sharer-url}}
      template block text
    {{/channel-sharer-url}}
  `)
  assert.equal(this.$('label').text().trim(), 'template block text', 'you can pass in a label')
});
