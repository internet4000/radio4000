import Ember from 'ember';
import ListView from 'ember-list-view';
import ListItemView from 'ember-list-view/list-item-view';
import TrackItemComponent from 'radio4000/components/track-item/component';

// extending ListView
// customize the row views by subclassing ListItemView
// and specifying the itemViewClass property in the Ember.ListView definition
export default ListView.extend({
	height: 550,
	rowHeight: 40,
	// itemViewClass: ListItemView.extend({ templateName: 'about' })
	itemViewClass: ListItemView.extend({ templateName: 'about' })
});
