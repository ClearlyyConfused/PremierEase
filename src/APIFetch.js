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
		return fetch('https://premier-ease-backend.vercel.app/LeagueStandings')
			.then((response) => response.json())
			.then((data) => {
				return data.standings;
			});
	}

	async function fetchFixtures() {
		return fetch('https://premier-ease-backend.vercel.app/LeagueMatches')
			.then((response) => response.json())
			.then((data) => {
				return data.matches;
			});
	}

	async function fetchTeams() {
		return fetch('https://premier-ease-backend.vercel.app/LeagueTeams')
			.then((response) => response.json())
			.then((data) => {
				return data.teamsInfo;
			});
	}

	/* for getting news from "news" section of google
	async function fetchNews() {
		return fetch('https://premier-ease-backend.vercel.app/LeagueNewsImages')
			.then((response) => response.json())
			.then((data) => {
				let arr = [];
				for (const img of data.newsImages[0].images_results) {
					if (img.original_height >= 720 && img.original_width >= 1080) {
						arr.push(img);
					}
					if (arr.length === 9) {
						return arr;
					}
				}
				return arr;
			});
	}
	*/

	async function fetchNews() {
		return fetch('https://premier-ease-backend.vercel.app/LeagueNewsImages')
			.then((response) => response.json())
			.then((data) => {
				let arr = [];
				for (const vid of data.newsImages[0].video_results) {
					arr.push({
						title: vid.title,
						source: vid.channel.name,
						original: vid.thumbnail.static,
						link: vid.link,
					});
					if (arr.length === 14) {
						return arr;
					}
				}
				return arr;

				/*
				// news fetched from google
				let arr = [];
				for (const img of data.newsImages[0].images_results) {
					if (img.original_width >= 700) {
						arr.push(img);
					}
					if (arr.length === 14) {
						// number of images total
						return arr;
					}
				}
				return arr;
				*/
			});
	}

	// fetches all required data
	async function fetchData() {
		const standings = await fetchStandings();
		const fixtures = await fetchFixtures();
		const teams = await fetchTeams();
		let newsData = await fetchNews();
		const newsImages = newsData.splice(0, 5); // number of images for main display
		const news = newsData;
		setApiData({
			standings: standings,
			fixtures: fixtures,
			teams: teams,
			news: news,
			newsImages: newsImages,
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
			leagueNews={apiData.news}
			leagueFixtures={apiData.fixtures}
			leagueStandings={apiData.standings}
			leagueTeams={apiData.teams}
			newsImages={apiData.newsImages}
		/>
	);
}

export default APIFetch;
