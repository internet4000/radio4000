// Returns true if {string} contains {search}
export default function stringContains(string, search) {
	if (!string) {
		return false;
	}
	return string.toLowerCase().indexOf(search.toLowerCase()) >= 0;
}
