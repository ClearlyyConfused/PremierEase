import './Fixtures.css';

function Fixtures({ leagueFixtures }) {
	return (
		<main className="league-fixtures">
			<table className="league-fixtures-table">
				{leagueFixtures.map((fixture) => {
					if (fixture.status === 'SCHEDULED' || fixture.status === 'TIMED') {
						console.log(fixture);
						return (
							<tr>
								<td>{fixture.awayTeam.shortName}</td>
								<td>
									<img src={fixture.awayTeam.crest} alt={fixture.awayTeam.shortName} />
								</td>
								<td>
									{new Date(fixture.utcDate).toLocaleString('en-US', {
										year: 'numeric',
										month: 'numeric',
										day: 'numeric',
										hour: 'numeric',
										minute: 'numeric',
									})}
								</td>
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

export default Fixtures;
