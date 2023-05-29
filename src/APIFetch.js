import { useState, useEffect } from 'react';
import App from './App';

function APIFetch() {
	// information fetched from API
	const [leagueStandings, setLeagueStandings] = useState();
	const [leagueFixtures, setLeagueFixtures] = useState();
	const [leagueNews, setLeagueNews] = useState([]);

	// fetches all required data
	function fetchData() {
		console.log('fetching data');

		// standings
		fetch('https://matchday-madness-backend.vercel.app/LeagueStandings')
			.then((response) => response.json())
			.then((data) => {
				setLeagueStandings(data.standings);
			});

		// fixtures
		fetch('https://matchday-madness-backend.vercel.app/LeagueMatches')
			.then((response) => response.json())
			.then((data) => {
				setLeagueFixtures(data.matches);
			});

		// news
		fetch('https://matchday-madness-backend.vercel.app/LeagueNews')
			.then((response) => response.json())
			.then((data) => {
				let news = [];

				for (const article of data.news[0].news_results) {
					news = [
						...news,
						{
							link: article.link,
							snippet: article.snippet,
							source: article.source,
							thumbnail: article.thumbnail,
							title: article.thumbnail,
						},
					];
				}

				for (const article of data.news[0].people_also_search_for) {
					news = [
						...news,
						{
							link: article.news_results[0].link,
							snippet: article.news_results[0].snippet,
							source: article.news_results[0].source,
							thumbnail: article.news_results[0].thumbnail,
							title: article.news_results[0].thumbnail,
						},
					];
				}
				setLeagueNews(news);
			});
	}

	// fetches every 10 seconds
	useEffect(() => {
		fetchData();
		const timer = setInterval(() => {
			fetchData();
		}, 10000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	// gives information to main App
	return (
		<App
			leagueNews={leagueNews}
			leagueFixtures={leagueFixtures}
			leagueStandings={leagueStandings}
		/>
	);
}

export default APIFetch;
