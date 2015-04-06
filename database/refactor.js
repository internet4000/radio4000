var users = [];

// create an array of users
for (var prop in db.users) {
	var user = db.users[prop];
	users.push(user);
}

// delete user names
users.forEach(function(user) {
	if (user.name) {
		delete user.name;
	}
});

// get users with both a channel and favorites
var filteredUsers = users.filter(function(user) {
	return user.channels && user.favoriteChannels;
});

filteredUsers.forEach(function(user) {
	var favorites = user.favoriteChannels;
	var channelId;

	// get channel
	for (prop in user.channels) {
		channelId = prop;
	}

	var channel = db.channels[channelId];

	console.log('Going through ' + channel.title);

	// move user favorites to channel favorites
	channel.favoriteChannels = favorites;

	// iterate these favorite
	for (favorite in channel.favoriteChannels) {
		var favoriteChannel = db.channels[favorite];

		console.log('- favorite: ' + favoriteChannel.title);

		// console.log(favoriteChannel.followers);
		// @todo: add channel to favoriteChannel.followers

		if (!favoriteChannel.followers) {
			favoriteChannel.followers = {};
		};

		favoriteChannel.followers[channelId] = true;
	}
});

// delete channel user
for (var prop in db.channels) {
	var channel = db.channels[prop];
	delete channel.user;
	// console.log(channel.user);
	// if (prop === '-JXHtCxC9Ew-Ilck6iZ8') {
	// 	console.log(channel.favoriteChannels);
	// }
}
