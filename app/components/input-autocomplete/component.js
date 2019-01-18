import Component from '@ember/component'
import {inject as service} from '@ember/service'
import algoliasearch from 'algoliasearch/lite'
import autocomplete from 'autocomplete.js'

export default Component.extend({
	router: service(),

	classNames: ['InputAutocomplete'],

	didInsertElement() {
		this.enableAutocomplete()
	},

	selected(channel) {
		document.querySelector('html').focus()
		this.get('router').transitionTo('channel', channel.slug)
	},

	// clearSearch() {
	// 	this.search.autocomplete.setVal('')
	// },

	enableAutocomplete() {
		// Enable algolia index.
		const client = algoliasearch('7FFSURJR0X', 'dba2e03ef95f278d5fbe76d4cd80b6bf')
		const index = client.initIndex('radio4000_channels')
		const inputElement = this.element.querySelector('.aa-input-search')
		const options = {
			autoselect: true,
			clearOnSelected: true,
			hint: true,
			openOnFocus: true,
			ariaLabel: 'Search Radio4000 channels',
			// debug: true, // keeps the dropdown open for styling
			// autoselectOnBlur: true, // should be enabled on mobile they say?
			// 191 is the "/" (forward slash) key
			keyboardShortcuts: ['s', 191]
		}
		const templates = [{
			source: autocomplete.sources.hits(index, {hitsPerPage: 8}),
			displayKey: 'title',
			templates: {
				// This is the HTML template for each search result.
				suggestion({image, title}) {
					if (!image) {
						return title
					}
					var thumbnail = `https://res.cloudinary.com/radio4000/image/upload/w_50,h_50,c_thumb,q_60/${image}`
					return `<img width="30" src="${thumbnail}" alt=""><span>${title}</span>`
				}
			}
		}]

		// Create and save the instance.
		const search = autocomplete(inputElement, options, templates)
		this.set('search', search)

		// Send a custom event up.
		search.on('autocomplete:selected', (event, suggestion) => {
			this.selected(suggestion)
		})
	}
})
