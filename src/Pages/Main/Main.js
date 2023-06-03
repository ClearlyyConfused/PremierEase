import './Main.css';
import ScreenWidth from '../../Helper/ScreenWidth';
import SortFixtures from '../Fixtures/SortFixtures';

function Main({ leagueNews, leagueStandings, leagueFixtures }) {
	const { screenWidth } = ScreenWidth();
	const currentMatchday =
		leagueFixtures !== undefined ? leagueFixtures[0].season.currentMatchday : 0;
	let matches = leagueFixtures !== undefined ? SortFixtures(leagueFixtures) : [];

	if (
		leagueNews === undefined ||
		leagueStandings === undefined ||
		leagueFixtures === undefined
	) {
		return <div>Loading...</div>;
	} else {
		return (
			<main className="main">
				<div className="standings-matches">
					<section className="current-matchday-matches">
						<h1>Matchday {37}</h1>
						<table className="matches-table">
							{matches.map((matchDatePair) => {
								if (matchDatePair[1][0].matchday === 37) {
									return (
										<div className="matches-date-pair">
											<h2 className="matches-date">{matchDatePair[0]}</h2>
											<div className="matches">
												{matchDatePair[1].map((match) => {
													return (
														<tr>
															<td>{match.homeTeam.tla}</td>
															<td>
																<img
																	src={match.homeTeam.crest}
																	alt={match.homeTeam.shortName}
																/>
															</td>
															{match.status === 'SCHEDULED' ||
															match.status === 'TIMED' ? (
																<td className="date">
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
					<section className="standings">
						<h1>Standings</h1>
						<table className="standings-table">
							<tr>
								<th>P</th>
								<th>Club</th>
								<th></th>
								<th>Pl</th>
								<th>GD</th>
								<th>Pts</th>
							</tr>
							{leagueStandings.map((team) => {
								return (
									<tr>
										<td>{team.position}</td>
										<td>
											<img src={team.team.crest} alt={team.team.shortName} />
										</td>
										<td>{screenWidth >= 350 ? team.team.shortName : team.team.tla}</td>
										<td>{team.playedGames}</td>
										<td>
											{team.goalDifference > 0
												? '+' + team.goalDifference
												: team.goalDifference}
										</td>
										<td>{team.points}</td>
									</tr>
								);
							})}
						</table>
					</section>
				</div>
				<section className="news">
					<h1>Latest News</h1>
					{leagueNews.map((article) => {
						return (
							<a
								className="article"
								href={article.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="thumbnail-container">
									<img src={article.thumbnail} alt="" srcset="" />
								</div>
								<div className="article-info">
									<p>{article.source}</p>
									<h2>{article.title}</h2>
								</div>
							</a>
						);
					})}
				</section>
			</main>
		);
	}
}

export default Main;
