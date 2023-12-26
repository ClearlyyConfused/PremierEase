function SortFixtures(leagueFixtures, team = 'All Clubs', startDate, endDate) {
	let matches = [];

	for (const fixture of leagueFixtures) {
		// skips finished matches
		if (fixture.status === 'FINISHED' || fixture.status === 'CANCELLED') {
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

		// skips fixture if its before start date filter
		if (startDate) {
			if (new Date(startDate) >= new Date(fixtureDate)) {
				continue;
			}
		}
		// skips fixture if its after end date filter
		if (endDate) {
			// makes it inclusive of the last date
			let date = new Date(endDate);
			if (date.setDate(date.getDate() + 1) <= new Date(fixtureDate)) {
				continue;
			}
		}

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
