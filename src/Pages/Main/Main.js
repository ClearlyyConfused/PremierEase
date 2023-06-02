import './Main.css';

function Main({ leagueNews, leagueStandings, leagueFixtures }) {
	console.log(leagueNews);

	if (
		leagueNews === undefined ||
		leagueStandings === undefined ||
		leagueFixtures === undefined
	) {
		return <div>Loading...</div>;
	} else {
		return (
			<main className="main">
				<section className="news">
					<h1>Latest News</h1>
					{leagueNews.map((article) => {
						return (
							<div className="article">
								<a href={article.link} target="_blank" rel="noopener noreferrer">
									<div className="thumbnail-container">
										<img src={article.thumbnail} alt="" srcset="" />
									</div>
									<div className="article-info">
										<p>{article.source}</p>
										<h2>{article.title}</h2>
									</div>
								</a>
							</div>
						);
					})}
				</section>
			</main>
		);
	}
}

export default Main;
