function SortFixtures(leagueFixtures) {
	let matches = [];

	for (const fixture of leagueFixtures) {
		// skips finished matches
		if (fixture.status !== 'FINISHED') {
			continue;
		}

		// get fixture day
		const fixtureDate = new Date(fixture.utcDate).toLocaleString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'long',
		});

		let f = false;

		// if fixture date in array, add it to the array for that date
		for (const dateMatchesPair of matches) {
			if (dateMatchesPair[0] === fixtureDate) {
				dateMatchesPair[1] = [...dateMatchesPair[1], fixture];
				f = true;
			}
		}

		// if fixture date not in the array, add the date and fixture
		if (!f) {
			matches = [...matches, [fixtureDate, [fixture]]];
		}
	}

	// sort matches with earliest first
	matches = matches.sort(function (a, b) {
		return new Date(a[0]) - new Date(b[0]);
	});

	return matches;
}

export default SortFixtures;
