import './Main.css';
import ScreenWidth from '../../Helper/ScreenWidth';

function Main({ leagueNews, leagueStandings, leagueFixtures }) {
	const { screenWidth } = ScreenWidth();

	if (
		leagueNews === undefined ||
		leagueStandings === undefined ||
		leagueFixtures === undefined
	) {
		return <div>Loading...</div>;
	} else {
		return (
			<main className="main">
				<div className="standings">
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
