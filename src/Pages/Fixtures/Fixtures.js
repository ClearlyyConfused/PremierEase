import './Fixtures.css';
import SortFixtures from './SortFixtures';

function Fixtures({ leagueFixtures }) {
	let matches = leagueFixtures !== undefined ? SortFixtures(leagueFixtures) : [];

	if (leagueFixtures === undefined) {
		return <div>Loading...</div>;
	} else {
		return (
			<table className="league-fixtures">
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
										<td>
											{new Date(fixture.utcDate).toLocaleString('en-US', {
												hour: 'numeric',
												minute: 'numeric',
											})}
										</td>
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

export default Fixtures;
