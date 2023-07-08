import { useState } from 'react';
import NewsImgDisplay from './NewsImgDisplay';

function MainNews({ leagueNews, newsImages }) {
	console.log(newsImages);
	const [displayImage, setDisplayImage] = useState(0);

	return (
		<section className="news">
			<NewsImgDisplay
				img={newsImages[displayImage]}
				displayImage={displayImage}
				setDisplayImage={setDisplayImage}
			/>
			<h1>Latest News</h1>
			<table className="articles">
				{leagueNews.map((article) => {
					return (
						<a className="article" href={article.link} target="_blank" rel="noopener noreferrer">
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
			</table>
		</section>
	);
}

export default MainNews;
