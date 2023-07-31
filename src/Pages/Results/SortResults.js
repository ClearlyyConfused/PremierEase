function SortResults(leagueFixtures, team = 'All Clubs') {
	let matches = [];

	for (const fixture of leagueFixtures) {
		// skips non-finished matches
		if (fixture.status !== 'FINISHED') {
			continue;
		}
		// skips non-filtered clubs
		if (team !== 'All Clubs') {
			if (fixture.homeTeam.shortName !== team && fixture.awayTeam.shortName !== team) {
				continue;
			}
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

	// sort matches with latest first
	matches = matches.sort(function (a, b) {
		return new Date(b[0]) - new Date(a[0]);
	});

	return matches;
}

export default SortResults;
