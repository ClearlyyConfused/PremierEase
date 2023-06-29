// uses same css as results
import SortFixtures from './SortFixtures';
import ScreenWidth from '../../Helper/ScreenWidth';

function Fixtures({ leagueFixtures }) {
	const { screenWidth } = ScreenWidth();
	let matches = leagueFixtures !== undefined ? SortFixtures(leagueFixtures) : [];

	if (leagueFixtures === undefined) {
		return <div>Loading...</div>;
	} else {
		return (
			<table className="league-fixtures">
				{matches.map((dateMatchesPair) => {
					// only returns finished matches
					return (
						<tr className="matches-on-date">
							<h2>{dateMatchesPair[0]}</h2>
							{dateMatchesPair[1].reverse().map((fixture) => {
								return (
									<tr className="match">
										<td>{screenWidth >= 550 ? fixture.awayTeam.shortName : fixture.awayTeam.tla}</td>
										<td>
											<img src={fixture.awayTeam.crest} alt={fixture.awayTeam.shortName} />
										</td>
										<td>
											{new Date(fixture.utcDate).toLocaleString('en-US', {
												hour: 'numeric',
												minute: 'numeric',
											})}
										</td>
										<td>
											<img src={fixture.homeTeam.crest} alt={fixture.homeTeam.shortName} />
										</td>
										<td>{screenWidth >= 550 ? fixture.homeTeam.shortName : fixture.homeTeam.tla}</td>
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
