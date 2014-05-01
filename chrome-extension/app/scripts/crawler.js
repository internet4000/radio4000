/* jshint unused:false */

'use strict';

/**
 * Crawler
 * fetches all sounds from a html page
 *
 * @author Stefan Sinnwell <steve@kopfwelt.com>
 * @copyright Copyright (c) 2014, KOPFWELT GmbH
 */
var Crawler = function() {};

Crawler.prototype = {

    sounds: [],

    start: function() {
        this._crawl();
        this._send();
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            this._crawl();
            this._send();

            // if (changeInfo.status == "loading")
            // {
            //     var url = tab.url;
            //     var iconPath = ???
            //     chrome.pageAction.setIcon({tabId: tabId, path: iconPath});
            // }
        }.bind(this));
    },

    _crawl: function() {
        var iframes = [].slice.apply(document.getElementsByTagName('iframe'));
        iframes.map(function(element) {

            var url = element.src;

            // var regSoundcloud = /^.*soundcloud\.com?(track=|.*(?=track=))([^#\&\?]+)/;
            var regSoundcloud = /.*soundcloud\.com.*tracks%2F([^#\&\?]+)/;

            // http://stackoverflow.com/questions/18336873/regex-to-extract-youtube-video-id
            var regYoutube = /^.*youtu(\.)?be(\.com)?(\/|v\/|u\/\w\/)(embed\/|watch\?(v=|.*(?=v=)))([^#\&\?]+)/;
            var matches;
            if(url.match(regSoundcloud)) {
                matches = regSoundcloud.exec(url);
                this.sounds.push({
                    'type': 'soundcloud',
                    'key': matches[1]
                });
            }else if(url.match(regYoutube)) {
                matches = regYoutube.exec(url);
                this.sounds.push({
                    'type': 'youtube',
                    'key': matches[6]
                });
            }

        }.bind(this));
    },

    _send: function() {
        chrome.extension.sendRequest(this.sounds);
    }

};

var crawler = new Crawler();
crawler.start();
