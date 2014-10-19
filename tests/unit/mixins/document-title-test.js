import Ember from 'ember';
import DocumentTitleMixin from 'radio4000/mixins/document-title';

module('DocumentTitleMixin');

// Replace this with your real tests.
test('it works', function() {
  var DocumentTitleObject = Ember.Object.extend(DocumentTitleMixin);
  var subject = DocumentTitleObject.create();
  ok(subject);
});
