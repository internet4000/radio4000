import Route from '@ember/routing/route';

const colors = [
	{title: 'purple', value: 'hsl(260, 80%, 50%)'},
	{title: 'red', value: 'hsl(0, 75%, 50%)'},
	{title: 'yellow', value: 'hsl(52, 100%, 67%)'},
	{title: 'green', value: 'hsl(125, 82%, 35%)'},
	{title: 'blue', value: 'hsl(255, 95%, 39%)'},
	{title: 'fadedblue', value: 'hsl(231, 48%, 95%)'},
	{title: 'lighterblue', value: 'hsla(266, 36%, 84%, 0.8)'},
	{title: 'darkblue', value: 'hsl(230, 50%, 23%)'},
	{title: 'verydarkblue', value: 'hsl(255, 65%, 19%)'}
];

const grays = [
	{title: 'white', value: 'hsl(0, 0%, 100%)'},
	{title: 'superlightgray', value: 'hsl(0, 0%, 98%)'},
	{title: 'bleach', value: 'hsl(72, 100%, 98%)'},
	{title: 'slightgray', value: 'hsl(0, 0%, 95%)'},
	{title: 'sand', value: 'hsl(46, 5%, 85%)'},
	{title: 'lightgray', value: 'hsl(0, 0%, 91%)'},
	{title: 'mediumlightgray', value: 'hsl(0, 0%, 85%)'},
	{title: 'mediumgray', value: 'hsl(0, 0%, 70%)'},
	{title: 'gray', value: 'hsl(0, 0%, 50%)'},
	{title: 'dark', value: 'hsl(0, 0%, 30%)'},
	{title: 'black', value: 'hsl(0, 0%, 10%)'}
];

export default Route.extend({
	model() {
		return {colors, grays};
	}
});
