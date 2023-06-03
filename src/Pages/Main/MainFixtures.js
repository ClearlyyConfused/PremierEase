import SortFixtures from '../Fixtures/SortFixtures';

function MainFixtures({ leagueFixtures }) {
	const currentMatchday =
		leagueFixtures !== undefined ? leagueFixtures[0].season.currentMatchday : 0;
	let matchDatePair = leagueFixtures !== undefined ? SortFixtures(leagueFixtures) : [];

	if (matchDatePair === undefined) {
		return '';
	} else {
		return (
			<section className="current-matchday-matches">
				<h1>Matchday {37}</h1>
				<table className="matches-table">
					{matchDatePair.map((pair) => {
						// if matches on a date are a part of the current matchday
						if (pair[1][0].matchday === 37) {
							return (
								<div className="matches-date-pair">
									{/* return the date */}
									<h2 className="matches-date">{pair[0]}</h2>
									{/* return matches on that date */}
									<div className="matches">
										{pair[1].map((match) => {
											return (
												<tr>
													<td>{match.homeTeam.tla}</td>
													<td>
														<img
															src={match.homeTeam.crest}
															alt={match.homeTeam.shortName}
														/>
													</td>
													{match.status === 'SCHEDULED' || match.status === 'TIMED' ? (
														<td className="time">
															{new Date(match.utcDate).toLocaleString('en-US', {
																hour: 'numeric',
																minute: 'numeric',
															})}
														</td>
													) : (
														<td className="score">
															<td>{match.score.fullTime.home}</td>
															<td>{match.score.fullTime.away}</td>
														</td>
													)}
													<td>
														<img
															src={match.awayTeam.crest}
															alt={match.awayTeam.shortName}
														/>
													</td>
													<td>{match.homeTeam.tla}</td>
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
