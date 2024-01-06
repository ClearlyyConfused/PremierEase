import { useState } from 'react';
import NewsImgDisplay from './NewsImgDisplay';
import backupImage from '../../images/Premier_league_text_logo.png';

function MainNews({ leagueNews, newsImages }) {
	const [displayImage, setDisplayImage] = useState(0);
	console.log(leagueNews);

	return (
		<section className="news">
			<NewsImgDisplay
				img={newsImages[displayImage]}
				numOfImgs={newsImages.length}
				displayImage={displayImage}
				setDisplayImage={setDisplayImage}
			/>
			<h1>Latest News</h1>
			<table className="articles">
				{leagueNews.map((article, index) => {
					return (
						<a className="article" href={article.link} target="_blank" rel="noopener noreferrer">
							<div className="thumbnail-container">
								<img
									src={article.original}
									alt={article.title}
									srcset=""
									// if image is not found (Ex. deleted)
									onError={({ currentTarget }) => {
										currentTarget.onerror = null; // prevents looping
										currentTarget.src = backupImage;
									}}
								/>
							</div>
							<div className="article-info">
								<p>{article.source}</p>
								<h2>{article.title}</h2>
							</div>
							<div className="divider"></div>
						</a>
					);
				})}
			</table>
		</section>
	);
}

export default MainNews;
