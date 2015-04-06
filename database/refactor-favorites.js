
var assign = function(obj, keyPath, value) {
   lastKeyIndex = keyPath.length-1;
   for (var i = 0; i < lastKeyIndex; ++ i) {
     key = keyPath[i];
     if (!(key in obj))
       obj[key] = {}
     obj = obj[key];
   }
   obj[keyPath[lastKeyIndex]] = value;
};


/*

## current structure

channels.id
	.followers (array)
		id > true
	.favoriteChannels (array)
		id > true

## new structure

channelPublics.id
	.channel (string)
	.followers (array)
		id > true

channels.id
	.channelPublic (string)
	.favoriteChannels (array)
		id > true
*/


// 1. create a channelPublic model
// 2. add the belongsTo on both channelPublic and channel
// 3. move followers to it
// 4. remove all images (/channel.images and /images)

var channels = [];

// create an array of channels
for (var prop in db.channels) {
	var channel = db.channels[prop];
	channels.push(channel);
};

// remove images
delete db.images;
channels.forEach(function(channel) {
	delete channel.images;
});

// create a new channelPublic for each channel
var channelPublics = {};

for (var prop in db.channels) {
	var newID = generatePushID();
	channelPublics[newID] = {
		"channel": prop,
		"followers": db.channels[prop]['followers']
	};

	db.channels[prop]['channelPublic'] = newID;
	delete db.channels[prop]['followers'];
};

db['channelPublics'] = channelPublics;



// "channelPublics" : {
//     "-JmEOGbUf72I0eFpIPAS" : {
//       "channel" : "-JmENm96HGHEPevJUnbs"
//     }
//   },

// console.log(channels);
console.log(channelPublics);
