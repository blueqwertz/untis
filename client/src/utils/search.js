function searchDictionary(query, dictionary) {
	let results = []
	let threshold = 0.5
	let maxResults = 5

	for (let key in dictionary) {
		let entry = dictionary[key]
		let name = entry.name.toLowerCase()
		let firstName = entry.firstName.toLowerCase()
		let shortName = entry.shortName.toLowerCase()
		let lastName = entry.name.toLowerCase()

		if (name === query.toLowerCase() || firstName === query.toLowerCase() || shortName === query.toLowerCase() || lastName === query.toLowerCase()) {
			results.push({ entry: entry, score: 2 })
			continue
		}

		if (name.startsWith(query.toLowerCase()) || firstName.startsWith(query.toLowerCase()) || shortName.startsWith(query.toLowerCase()) || lastName.startsWith(query.toLowerCase())) {
			results.push({ entry: entry, score: 1 })
			continue
		}

		let nameDistance = levenshteinDistance(name, query.toLowerCase())
		let firstNameDistance = levenshteinDistance(firstName, query.toLowerCase())
		let shortNameDistance = levenshteinDistance(shortName, query.toLowerCase())
		let lastNameDistance = levenshteinDistance(lastName, query.toLowerCase())

		if (nameDistance <= name.length * threshold) {
			results.push({ entry: entry, score: 1 - nameDistance / name.length })
		} else if (firstNameDistance <= firstName.length * threshold) {
			results.push({ entry: entry, score: 1 - firstNameDistance / firstName.length })
		} else if (shortNameDistance <= shortName.length * threshold) {
			results.push({ entry: entry, score: 1 - shortNameDistance / shortName.length })
		} else if (lastNameDistance <= lastName.length * threshold) {
			results.push({ entry: entry, score: 1 - lastNameDistance / lastName.length })
		}
	}

	results.sort((a, b) => b.score - a.score)

	return results.slice(0, maxResults).map((result) => result.entry)
}

function levenshteinDistance(a, b) {
	if (a.length === 0) return b.length
	if (b.length === 0) return a.length

	let matrix = []

	for (let i = 0; i <= b.length; i++) {
		matrix[i] = [i]
	}

	for (let j = 0; j <= a.length; j++) {
		matrix[0][j] = j
	}

	for (let i = 1; i <= b.length; i++) {
		for (let j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1]
			} else {
				matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1))
			}
		}
	}

	return matrix[b.length][a.length]
}

module.exports = { searchDictionary }
