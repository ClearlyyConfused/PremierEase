import SortAllMatches from './SortAllMatches';

function MainFixtures({ leagueFixtures }) {
	const currentMatchday = leagueFixtures !== undefined ? leagueFixtures[0].season.currentMatchday : 0;
	let matchDatePair = leagueFixtures !== undefined ? SortAllMatches(leagueFixtures, currentMatchday) : [];

	function timeUntilNextMatch() {
		for (const fixture of leagueFixtures) {
			if (new Date(fixture.utcDate).getTime() > new Date().getTime()) {
				return convertMilliseconds(new Date(fixture.utcDate) - new Date());
			}
		}
	}

	timeUntilNextMatch();

	if (matchDatePair === undefined) {
		return '';
	} else {
		return (
			<section className="current-matchday-matches">
				<h1>Matchweek {currentMatchday}</h1>
				<table className="matches-table">
					<p className="next-match">
						Next Match: {timeUntilNextMatch().days} days, {timeUntilNextMatch().hours} hours,{' '}
						{timeUntilNextMatch().minutes} minutes
					</p>
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
													<td>{match.awayTeam.tla}</td>
													<td>
														<img src={match.awayTeam.crest} alt={match.awayTeam.shortName} />
													</td>

													{/* if match isn't live or finished, display date of match */}
													{match.status === 'SCHEDULED' || match.status === 'TIMED' ? (
														<td>
															<td className="time">
																{new Date(match.utcDate).toLocaleString('en-US', {
																	hour: 'numeric',
																	minute: 'numeric',
																})}
															</td>
															<td className="match-scheduled">SCHEDULED</td>
														</td>
													) : match.status === 'POSTPONED' ? (
														<td>
															<td className="time">TBD</td>
															{/* display match status */}
															<td className="match-scheduled">POSTPONED</td>
														</td>
													) : (
														// else display the current or final score
														<td>
															<td className="score">
																<td>
																	{match.score.fullTime.away} - {match.score.fullTime.home}
																</td>
															</td>
															{/* display match status */}
															{match.status === 'IN_PLAY' || match.status === 'PAUSED' ? (
																<td className="match-live">LIVE</td>
															) : (
																<td className="match-finished">FINISHED</td>
															)}
														</td>
													)}

													<td>
														<img src={match.homeTeam.crest} alt={match.homeTeam.shortName} />
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

function convertMilliseconds(milliseconds) {
	const millisecondsPerMinute = 1000 * 60;
	const millisecondsPerHour = millisecondsPerMinute * 60;
	const millisecondsPerDay = millisecondsPerHour * 24;

	const days = Math.floor(milliseconds / millisecondsPerDay);
	milliseconds %= millisecondsPerDay;

	const hours = Math.floor(milliseconds / millisecondsPerHour);
	milliseconds %= millisecondsPerHour;

	const minutes = Math.floor(milliseconds / millisecondsPerMinute);

	return {
		days: days,
		hours: hours,
		minutes: minutes,
	};
}

export default MainFixtures;
