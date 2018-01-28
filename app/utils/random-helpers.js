// Return a random index from an array
export function getRandomIndex(array) {
	return Math.floor(Math.random() * array.length);
}

// Takes an array and returns a shuffled version.
// It uses this algorithm: http://bost.ocks.org/mike/shuffle/
export function shuffleArray(array) {
	// Return a new array.
	array = array.slice();

	let m = array.length;
	let t;
	let i;

	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

export function pickRandom(arr, amount) {
	const shuffled = shuffleArray(arr)
	return shuffled.slice(0, amount)
}
