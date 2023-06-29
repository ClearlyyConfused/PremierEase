import SortFixtures from '../Fixtures/SortFixtures';

function MainFixtures({ leagueFixtures }) {
	const currentMatchday = leagueFixtures !== undefined ? leagueFixtures[0].season.currentMatchday : 0;
	let matchDatePair = leagueFixtures !== undefined ? SortFixtures(leagueFixtures) : [];

	if (matchDatePair === undefined) {
		return '';
	} else {
		return (
			<section className="current-matchday-matches">
				<h1>Matchday {currentMatchday}</h1>
				<table className="matches-table">
					{matchDatePair.map((pair) => {
						// if matches on a date are a part of the current matchday
						if (pair[1][0].matchday === currentMatchday) {
							return (
								<div className="matches-date-pair">
									{/* return the date */}
									<h2 className="matches-date">{pair[0]}</h2>
									{/* return matches on that date */}
									<div className="matches">
										{pair[1].map((match) => {
											return (
												<tr>
													{/* display match status */}
													{match.status === 'IN_PLAY' || match.status === 'PAUSED' ? (
														<td className="match-live">LIVE</td>
													) : match.status === 'SCHEDULED' ? (
														// hides live message if game is not live
														<td className="match-scheduled">SCH</td>
													) : match.status === 'TIMED' ? (
														<td className="match-scheduled">SCH</td>
													) : (
														<td className="match-finished">FIN</td>
													)}

													<td>{match.homeTeam.tla}</td>
													<td>
														<img src={match.homeTeam.crest} alt={match.homeTeam.shortName} />
													</td>

													{/* if match isn't live or finished, display date of match */}
													{match.status === 'SCHEDULED' || match.status === 'TIMED' ? (
														<td className="time">
															{new Date(match.utcDate).toLocaleString('en-US', {
																hour: 'numeric',
																minute: 'numeric',
															})}
														</td>
													) : (
														// else display the current or final score
														<td className="score">
															<td>{match.score.fullTime.home}</td>
															<td>{match.score.fullTime.away}</td>
														</td>
													)}

													<td>
														<img src={match.awayTeam.crest} alt={match.awayTeam.shortName} />
													</td>
													<td>{match.awayTeam.tla}</td>
												</tr>
											);
										})}
									</div>
								</div>
							);
						}
					})}
				</table>
			</section>
		);
	}
}

export default MainFixtures;
