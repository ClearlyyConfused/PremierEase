import './Results.css';
import SortResults from './SortResults';
import ScreenWidth from '../../Helper/ScreenWidth';
import stadium from '../../images/stadium.svg';

function Results({ leagueFixtures, leagueTeams }) {
	const { screenWidth } = ScreenWidth();
	let matches = leagueFixtures !== undefined ? SortResults(leagueFixtures) : [];

	if (leagueFixtures === undefined) {
		return <div>Loading...</div>;
	} else {
		return (
			<table className="league-results">
				<h1>RESULTS</h1>
				{matches.map((dateMatchesPair) => {
					// only returns finished matches
					return (
						<tr className="matches-on-date">
							<h2>{dateMatchesPair[0]}</h2>
							{dateMatchesPair[1].reverse().map((fixture) => {
								return (
									<tr className="match">
										<div>
											<td>{screenWidth >= 550 ? fixture.awayTeam.shortName : fixture.awayTeam.tla}</td>
											<td>
												<img src={fixture.awayTeam.crest} alt={fixture.awayTeam.shortName} />
											</td>
											<td>
												<td>
													{fixture.score.fullTime.away}-{fixture.score.fullTime.home}
												</td>
												<td className="match-finished">FINISHED</td>
											</td>

											<td>
												<img src={fixture.homeTeam.crest} alt={fixture.homeTeam.shortName} />
											</td>
											<td>{screenWidth >= 550 ? fixture.homeTeam.shortName : fixture.homeTeam.tla}</td>
										</div>
										<td>
											<img src={stadium} alt="" />
											{leagueTeams.map((team) => {
												if (fixture.homeTeam.shortName === team.shortName) {
													return <p>{team.venue}</p>;
												}
											})}
										</td>
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
