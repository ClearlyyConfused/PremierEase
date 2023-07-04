import Navbar from './Pages/Navbar/Navbar';
import Main from './Pages/Main/Main';
import Fixtures from './Pages/Fixtures/Fixtures';
import Results from './Pages/Results/Results';
import Table from './Pages/Table/Table';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App({ leagueNews, leagueFixtures, leagueStandings }) {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path="/"
						element={
							<Main
								leagueNews={leagueNews}
								leagueFixtures={leagueFixtures}
								leagueStandings={leagueStandings}
							/>
						}
					></Route>
					<Route path="/fixtures" element={<Fixtures leagueFixtures={leagueFixtures} />}></Route>
					<Route path="/results" element={<Results leagueFixtures={leagueFixtures} />}></Route>
					<Route path="/standings" element={<Table leagueStandings={leagueStandings} />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
