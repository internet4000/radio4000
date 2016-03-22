// Returns a random string from a specified list of characters.

export default function randomText() {
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const len = 4;
	return new Array(len).join().split(',').map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

// in that case read it as follows:
// create an empty array of length len(`Array(len)`),
// make it a string(by joining) and an array again (by splitting at the commas).
// this will give us an array of four empty strings (`.join().split(',')`).
// then go over that array and for each element take a random char instead
// (`.map(() => chs.charAt(Math.floor(Math.random() * s.length)))`).
// then join again, without a separator (`.join('')`) and were done.
// all of this is because of shitty behaviour of javascripts Array.prototype.map function.
// because that function will just ignore empty positions in an array.
// so if you have an array with empty positions only (even if its a million), it will not do anything.
// for me thats more shitty than useful most of the time, but it can be cool i guess.
