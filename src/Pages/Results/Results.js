import './Results.css';
import SortResults from './SortResults';

function Results({ leagueFixtures }) {
	let matches = leagueFixtures !== undefined ? SortResults(leagueFixtures) : [];

	if (leagueFixtures === undefined) {
		return <div>Loading...</div>;
	} else {
		return (
			<table className="league-results">
				{matches.map((dateMatchesPair) => {
					// only returns finished matches
					return (
						<tr>
							<h2>{dateMatchesPair[0]}</h2>
							{dateMatchesPair[1].reverse().map((fixture) => {
								return (
									<tr>
										<td>{fixture.awayTeam.shortName}</td>
										<td>
											<img
												src={fixture.awayTeam.crest}
												alt={fixture.awayTeam.shortName}
											/>
										</td>
										<td>{fixture.score.fullTime.away}</td>
										<td>{fixture.score.fullTime.home}</td>
										<td>
											<img
												src={fixture.homeTeam.crest}
												alt={fixture.homeTeam.shortName}
											/>
										</td>
										<td>{fixture.homeTeam.shortName}</td>
									</tr>
								);
							})}
						</tr>
					);
				})}
			</table>
		);
	}
}

export default Results;
