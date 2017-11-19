import Ember from 'ember'

const {Route} = Ember

const PAGE_SIZE = 4

export default Route.extend({
	startAt: null,
	endAt: null,

	// When search changes the url, don't replace (add) to the history.
	// e.g. back/forth in browser works as expected.
	queryParams: {
		search: {
			replace: true
		}
	},

	model() {
	//	// return this.store.query('channel', {limitToLast: 100})
	// 	this.store.findAll('channel')
	// 	return this.store.peekAll('channel')
		var query = {
			limitToFirst: PAGE_SIZE + 1
		}

		if (this.get('startAt')) {
			query.startAt = this.get('startAt')
		}

		if (this.get('endAt')) {
			query.endAt = this.get('endAt')
			delete query.limitToFirst
			query.limitToLast = PAGE_SIZE + 1
		}

		return this.store.query('channel', query).then(posts => {
			if (this.get('startAt')) {
				return posts.slice(1)
			}
			return posts.slice(0, posts.get('length') - 1)
		})
	},

	actions: {
		prev() {
			var id = this.get('currentModel').get('firstObject.id')
			this.set('startAt', null)
			this.set('endAt', id)
			this.refresh()
		},
		next() {
			var id = this.get('currentModel').get('lastObject.id')
			this.set('startAt', id)
			this.set('endAt', null)
			this.refresh()
		}
	}
})

