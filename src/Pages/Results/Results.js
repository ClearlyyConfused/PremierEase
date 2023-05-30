import './Results.css';

function Results({ leagueFixtures }) {
	return (
		<main className="league-results">
			<table className="league-results-table">
				{leagueFixtures.map((fixture) => {
					if (fixture.status === 'FINISHED') {
						console.log(fixture);
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
		</main>
	);
}

export default Results;
