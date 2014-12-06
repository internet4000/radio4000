export default function() {

	// This is a map of our routes and how they transition.

	//  ----------------------------------------
	//  |            |   signin   |            |
	//  ----------------------------------------
	//  | index      |  channels  | channel    |
	//  ----------------------------------------
	//  |                pages                 |
	//  ----------------------------------------

	// Three examples:
	// 1) from 'channels' to 'channel' should use 'toLeft' (as channels is left of channel)
	// 2) from anywhere to 'sign' should use 'toDown' (as it comes down from above)
	// 3) from anywhere to a 'page' should use 'toUp' (as it comes down from beneath)

	// NOTE! 2 and 3 are currently disabled. It was too much, they just come instantly.

	// channels comes from right
	this.transition(
		this.toRoute('channels'),
		this.use('toLeft'),
		this.reverse('toRight')
	);

	// channel comes from right
	this.transition(
		this.fromRoute('channels'),
		this.toRoute('channel'),
		this.use('toLeft'),
		this.reverse('toRight')
	);

	// channel comes from right
	this.transition(
		this.fromRoute('channel'),
		this.toRoute('index'),
		this.use('toRight'),
		this.reverse('toLeft')
	);

	// // Sign in comes form above
	// this.transition(
	// 	// from everywhere
	// 	this.toRoute('signin'),
	// 	this.use('toDown', {duration: 4000}),
	// 	this.reverse('toUp')
	// );

	// // TO PAGES
	// this.transition(
	// 	// from everywhere
	// 	this.toRoute('about','forum','help','log','styleguide'),
	// 	this.use('fade')
	// );
}
