Webapp.SoundView = Ember.View.extend({
  // templateName: function() {

  //   return this.get('provider');
  // }.property().cacheable(),
  srcChanged: function() {        
      this.get('sound').rerender();
  }.observes('src')
});
/*
<script>
   // 2. This code loads the IFrame Player API code asynchronously.
   var tag = document.createElement('script');

   tag.src = "https://www.youtube.com/iframe_api";
   var firstScriptTag = document.getElementsByTagName('script')[0];
   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

   // 3. This function creates an <iframe> (and YouTube player)
   //    after the API code downloads.
   var player, key;
   mykey = $('#sound').data('key');
   console.log(model);

   
   function onYouTubeIframeAPIReady() {
     player = new YT.Player('player', {
       height: '390',
       width: '640',
       videoId: mykey,
       events: {
         'onReady': onPlayerReady,
         // 'onStateChange': onPlayerStateChange
       }
     });
   }

   // 4. The API will call this function when the video player is ready.
   function onPlayerReady(event) {
     event.target.playVideo();
   }

   // 5. The API calls this function when the player's state changes.
   //    The function indicates that when playing a video (state=1),
   //    the player should play for six seconds and then stop.
   // var done = false;
   // function onPlayerStateChange(event) {
   //   if (event.data == YT.PlayerState.PLAYING && !done) {
   //     setTimeout(stopVideo, 6000);
   //     done = true;
   //   }
   // }
   // function stopVideo() {
   //   player.stopVideo();
   // }
 </script>
                         <script src="https://w.soundcloud.com/player/api.js" type="text/javascript"></script>
                        <iframe id="sc-widget" src="https://w.soundcloud.com/player/?url=http://api.soundcloud.com/tracks/145324052" width="100%" height="465" scrolling="no" frameborder="no"></iframe>
                        <script type="text/javascript">
                          (function(){
                            var widgetIframe = document.getElementById('sc-widget'),
                                widget       = SC.Widget(widgetIframe);

                            widget.bind(SC.Widget.Events.READY, function() {
                              widget.bind(SC.Widget.Events.PLAY, function() {
                                // get information about currently playing sound
                                widget.getCurrentSound(function(currentSound) {
                                  console.log('sound ' + currentSound.get('') + 'began to play');
                                });
                              });
                              // get current level of volume
                              widget.getVolume(function(volume) {
                                console.log('current volume value is ' + volume);
                              });
                              // set new volume level
                              widget.setVolume(50);
                              // get the value of the current position
                            });

                          }());
                        </script>
 */