import Ember from 'ember'

// These colors are copy/pasted from _colors.scss
// and might not be up to date.

const colors = [
	{title: 'purple', value: 'hsl(260, 80%, 50%)'},
	{title: 'red', value: 'hsl(0, 75%, 50%)'},
	{title: 'yellow', value: 'rgba(255, 233, 87, 0.5)'},
	{title: 'green', value: 'hsl(125, 82%, 35%)'},
	{title: 'fadedblue', value: 'hsl(231, 48%, 95%)'},
	{title: 'bleach', value: 'hsl(72, 100%, 98%)'}
]

const grays = [
	{title: 'white', value: 'hsl(0, 0%, 100%)'},
	{title: 'superlightgray', value: 'hsl(0, 0%, 98%)'},
	{title: 'slightgray', value: 'hsl(0, 0%, 95%)'},
	{title: 'lightgray', value: 'hsl(45, 5%, 90%)'},
	{title: 'mediumlightgray', value: 'hsl(0, 0%, 85%)'},
	{title: 'mediumgray', value: 'hsl(0, 0%, 70%)'},
	{title: 'gray', value: 'hsl(0, 0%, 45%)'},
	{title: 'dark', value: 'hsl(0, 0%, 30%)'},
	{title: 'black', value: 'hsl(0, 0%, 10%)'}
]

export default Ember.Route.extend({
	model() {
		return {colors, grays}
	}
})
