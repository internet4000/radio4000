import Ember from 'ember';

export default Ember.Component.extend({
   imageId: null,
   progressValue: '0',
   isUploading: false,

   // options
   showProgress: true,
   enablePreview: false,

   startCloudinary: Ember.on('didInsertElement', function() {
      // var input = this.$('cloudinary_fileupload');
      var component = this;

      // here we bind to the events sent by our child cloudinary-input component
      // we could listen to these events directly on that component as well, if we like

      // indicate progress
      this.$().on('fileuploadprogress', function(e, data) {
         var value = Math.round((data.loaded * 100.0) / data.total);

         // indicate we're uploading
         component.set('isUploading', true);
         component.set('progressValue', value);
      });

      // once it's uploaded
      this.$().on('fileuploaddone', function (e, data) {
         component.set('imageId', data.result.public_id);

         // reset progress
         component.set('progressValue', 0);
         component.set('isUploading', false);
      });
   }),

   updatePreview: Ember.observer('imageId', function() {
      if (!this.get('enablePreview')) { return; }

      var imageId = this.get('imageId');

      // get image from cloudinary
      var image = Ember.$.cloudinary.image(imageId, {
         format: 'jpg',
         width: 200,
         height: 200,
         crop: 'thumb',
         gravity: 'face',
         // effect: 'saturation:50'
      });

      // insert it
      this.$('figure').append(image);
   })
});
