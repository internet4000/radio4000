import Controller from '@ember/controller';
import {get, set} from '@ember/object'

export default Controller.extend({
	actions: {
		saveImage(cloudinaryId) {
			const messages = get(this, 'flashMessages')
			const channel = get(this, 'model')

			if (!cloudinaryId) {
				throw new Error('Could not save image. Missing cloudinary id')
			}

			channel.set('image', cloudinaryId)
			return channel
				.save()
				.then(() => {
					messages.success('Saved image!')
				})
				.catch(() => {
					messages.warning('Could not save the image to your channel')
					channel.set('image', undefined)
				})
		},

		deleteImage() {
			set(this, 'model.image', undefined)
			return this.get('model').save()
		}
	}
});
