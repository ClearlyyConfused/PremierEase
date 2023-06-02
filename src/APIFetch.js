import { useState, useEffect } from 'react';
import App from './App';

function APIFetch() {
	// information fetched from API
	const [apiData, setApiData] = useState({
		standings: undefined,
		fixtures: undefined,
		news: undefined,
	});

	async function fetchStandings() {
		return fetch('https://matchday-madness-backend.vercel.app/LeagueStandings')
			.then((response) => response.json())
			.then((data) => {
				return data.standings;
			});
	}

	async function fetchFixtures() {
		return fetch('https://matchday-madness-backend.vercel.app/LeagueMatches')
			.then((response) => response.json())
			.then((data) => {
				return data.matches;
			});
	}

	async function fetchNews() {
		return fetch('https://matchday-madness-backend.vercel.app/LeagueNews')
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
							title: article.title,
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
							title: article.news_results[0].title,
						},
					];
				}

				return news;
			});
	}

	// fetches all required data
	async function fetchData() {
		const standings = await fetchStandings();
		const fixtures = await fetchFixtures();
		const news = await fetchNews();
		setApiData({ standings: standings, fixtures: fixtures, news: news });
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
			leagueNews={apiData.news}
			leagueFixtures={apiData.fixtures}
			leagueStandings={apiData.standings}
		/>
	);
}

export default APIFetch;
