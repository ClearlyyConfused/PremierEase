import './Main.css';
import MainFixtures from './MainFixtures';
import MainStandings from './MainStandings';
import MainNews from './MainNews';
import Loading from '../../Helper/Loading/Loading.js';

function Main({ leagueNews, newsImages, leagueStandings, leagueFixtures }) {
	if (leagueNews === undefined || leagueStandings === undefined || leagueFixtures === undefined) {
		return <Loading />;
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
