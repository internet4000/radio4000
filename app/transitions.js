export default function() {

	// REMEMBER
	//  to add liquid-fire to package.json so the scripts get loaded

	// This is a map of our routes and how they transition.

	/*
	----------------------------------------
	|            |   signin   |            |
	----------------------------------------
	| index      |  channels  | channel    |
	----------------------------------------
	|                pages                 |
	----------------------------------------
	*/

	// NOTE! We currently don't transition between signin and the other pages.

	// this.transition(
	// 	this.fromRoute('index'),
	// 	this.toRoute('channels', 'channel'),
	// 	this.use('toLeft'),
	// 	this.reverse('toRight')
	// );

	// this.transition(
	// 	this.fromRoute('channels'),
	// 	this.toRoute('channel'),
	// 	this.use('toLeft'),
	// 	this.reverse('toRight')
	// );
}
