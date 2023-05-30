import './Results.css';

function Results({ leagueFixtures }) {
	if (leagueFixtures === undefined) {
		return <div>Loading...</div>;
	} else {
		return (
			<table className="league-results">
				{/* reversed to display latest matches first */}
				{[...leagueFixtures].reverse().map((fixture) => {
					// only returns finished matches
					if (fixture.status === 'FINISHED') {
						return (
							<tr>
								<td>{fixture.awayTeam.shortName}</td>
								<td>
									<img src={fixture.awayTeam.crest} alt={fixture.awayTeam.shortName} />
								</td>
								<td>{fixture.score.fullTime.away}</td>
								<td>{fixture.score.fullTime.home}</td>
								<td>
									<img src={fixture.homeTeam.crest} alt={fixture.homeTeam.shortName} />
								</td>
								<td>{fixture.homeTeam.shortName}</td>
							</tr>
						);
					}
				})}
			</table>
		);
	}
}

export default Results;
