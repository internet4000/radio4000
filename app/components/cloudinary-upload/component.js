import Ember from 'ember'

const {Component, get, set} = Ember

export default Component.extend({
	cloudName: '',
	unsignedUploadPreset: '',

	didInsertElement() {
		this._super(...arguments)
		this.enableEvents()
	},

	enableEvents() {
		const component = this
		const element = this.element

		// Drag and drop
		function dragenter(e) {
			e.stopPropagation()
			e.preventDefault()
		}

		function dragover(e) {
			e.stopPropagation()
			e.preventDefault()
		}

		element.addEventListener('dragenter', dragenter, false)
		element.addEventListener('dragover', dragover, false)
		element.addEventListener('drop', drop, false)

		function drop(e) {
			e.stopPropagation()
			e.preventDefault()

			var dt = e.dataTransfer
			var files = dt.files

			component.handleFiles(files)
		}
	},

	handleFiles(files) {
		for (var i = 0; i < files.length; i++) {
			// Call the function to upload each file.
			this.uploadFile(files[i])
		}
	},

	// Called after a succesful upload.
	onUpload(response) {
		const action = get(this, 'didUpload')
		if (action) {
			action(response.public_id)
		}
	},

	// Upload file to Cloudinary
	uploadFile(file) {
		const component = this
		const unsignedUploadPreset = this.get('unsignedUploadPreset')
		const fd = new FormData()
		const url = `https://api.cloudinary.com/v1_1/${this.get('cloudName')}/upload`

		// Reset progress
		set(this, 'progress', 0)

		const xhr = new XMLHttpRequest()
		xhr.open('POST', url, true)
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

		// Update progress (can be used to show progress indicator)
		xhr.upload.addEventListener('progress', function(e) {
			const progress = Math.round((e.loaded * 100.0) / e.total)
			component.set('progress', progress)
		})

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				// File uploaded successfully
				var response = JSON.parse(xhr.responseText)

				component.onUpload(response)
				if (!component.isDestroyed) {
					component.set('isRunning', false)
				}
			}
		}

		xhr.onerror = function() {

		}

		fd.append('upload_preset', unsignedUploadPreset)
		fd.append('tags', 'browser_upload') // Optional - add tag for image admin in Cloudinary
		fd.append('file', file)
		xhr.send(fd)
		component.set('isRunning', true)
	},

	actions: {
		fileInputChanged(files) {
			this.handleFiles(files)
		},
		selectFiles() {
			const fileElem = this.element.querySelector('input')
			if (fileElem) {
				fileElem.click()
			}
		}
	}
})
