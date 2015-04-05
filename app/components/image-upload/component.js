import Ember from 'ember';

export default Ember.Component.extend({
   tagName: 'form',
   classNames: ['Form', 'Form--box'],
   progressValue: '0',
   isUploading: false,
   imageId: null,
   enablePreview: false,

   startCloudinary: Ember.on('didInsertElement', function() {
      // var input = this.$('cloudinary_fileupload');
      var component = this;

      // here we bind to the events sent by our child cloudinary-input component
      // we could listen to these events directly on that component as well, if we like

      // indicate progress
      this.$().on('fileuploadprogress', function(e, data) {
         var value = Math.round((data.loaded * 100.0) / data.total);
         component.set('progressValue', value);
      });

      // once it's uploaded
      this.$().on('fileuploaddone', function (e, data) {
         component.set('imageId', data.result.public_id);

         // reset progress bar
         component.set('progressValue', 0);
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
