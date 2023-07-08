// uses same css as results
import SortFixtures from './SortFixtures';
import ScreenWidth from '../../Helper/ScreenWidth';
import stadium from '../../images/stadium.svg';

function Fixtures({ leagueFixtures, leagueTeams }) {
	const { screenWidth } = ScreenWidth();
	let matches = leagueFixtures !== undefined ? SortFixtures(leagueFixtures) : [];

	if (leagueFixtures === undefined) {
		return <div>Loading...</div>;
	} else {
		return (
			<table className="league-fixtures">
				<h1>FIXTURES</h1>
				{matches.map((dateMatchesPair) => {
					// only returns finished matches
					return (
						<tr className="matches-on-date">
							<h2>{dateMatchesPair[0]}</h2>
							{dateMatchesPair[1].map((fixture) => {
								return (
									<tr className="match">
										<div>
											<td>{screenWidth > 550 ? fixture.awayTeam.shortName : fixture.awayTeam.tla}</td>
											<td>
												<img src={fixture.awayTeam.crest} alt={fixture.awayTeam.shortName} />
											</td>

											{/* if match isn't live or finished, display date of match */}
											{fixture.status === 'SCHEDULED' || fixture.status === 'TIMED' ? (
												<td>
													<td className="time">
														{new Date(fixture.utcDate).toLocaleString('en-US', {
															hour: 'numeric',
															minute: 'numeric',
														})}
													</td>
													<td className="match-scheduled">SCHEDULED</td>
												</td>
											) : (
												// else display the current or final score
												<td>
													<td className="score">
														<td>{fixture.score.fullTime.home}</td>
														<td>{fixture.score.fullTime.away}</td>
													</td>
													{/* display match status */}
													{fixture.status === 'IN_PLAY' || fixture.status === 'PAUSED' ? (
														<td className="match-live">LIVE</td>
													) : (
														<td className="match-finished">FINISHED</td>
													)}
												</td>
											)}

											<td>
												<img src={fixture.homeTeam.crest} alt={fixture.homeTeam.shortName} />
											</td>
											<td>{screenWidth > 550 ? fixture.homeTeam.shortName : fixture.homeTeam.tla}</td>
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

export default Fixtures;
