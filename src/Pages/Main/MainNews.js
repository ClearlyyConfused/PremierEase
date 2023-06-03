function MainNews({ leagueNews }) {
	return (
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
	);
}

export default MainNews;
