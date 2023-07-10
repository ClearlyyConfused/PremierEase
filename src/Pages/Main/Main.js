import './Main.css';
import MainFixtures from './MainFixtures';
import MainStandings from './MainStandings';
import MainNews from './MainNews';

function Main({ leagueNews, newsImages, leagueStandings, leagueFixtures }) {
	if (leagueNews === undefined || leagueStandings === undefined || leagueFixtures === undefined) {
		return <div>Loading...</div>;
	} else {
		return (
			<main className="main">
				<MainNews leagueNews={leagueNews} newsImages={newsImages} />
				<div className="standings-matches">
					<MainFixtures leagueFixtures={leagueFixtures} />
					<MainStandings leagueStandings={leagueStandings} />
				</div>
			</main>
		);
	}
}

export default Main;
