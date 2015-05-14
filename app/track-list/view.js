// import Ember from 'ember';
// import TrackItemComponent from 'radio4000/components/track-item/component';
import ListView from 'ember-list-view';
import ListItemView from 'ember-list-view/list-item-view';

// extending ListView
// customize the row views by subclassing ListItemView
// and specifying the itemViewClass property in the Ember.ListView definition
export default ListView.extend({
	height: 550,
	rowHeight: 40,
	itemViewClass: ListItemView.extend({ templateName: 'about' })
});
