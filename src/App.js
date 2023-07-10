import Navbar from './Pages/Navbar/Navbar';
import Main from './Pages/Main/Main';
import Fixtures from './Pages/Fixtures/Fixtures';
import Results from './Pages/Results/Results';
import Table from './Pages/Table/Table';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App({ leagueNews, newsImages, leagueFixtures, leagueStandings, leagueTeams }) {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar leagueTeams={leagueTeams} />
				<Routes>
					<Route
						path="/"
						element={
							<Main
								leagueNews={leagueNews}
								leagueFixtures={leagueFixtures}
								leagueStandings={leagueStandings}
								newsImages={newsImages}
							/>
						}
					></Route>
					<Route
						path="/fixtures"
						element={<Fixtures leagueFixtures={leagueFixtures} leagueTeams={leagueTeams} />}
					></Route>
					<Route
						path="/results"
						element={<Results leagueFixtures={leagueFixtures} leagueTeams={leagueTeams} />}
					></Route>
					<Route path="/standings" element={<Table leagueStandings={leagueStandings} />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
