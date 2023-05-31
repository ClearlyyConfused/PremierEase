import { useState } from 'react';
import Navbar from './Pages/Navbar/Navbar';
import Main from './Pages/Main/Main';
import Fixtures from './Pages/Fixtures/Fixtures';
import Results from './Pages/Results/Results';
import Table from './Pages/Table/Table';
import Footer from './Pages/Footer/Footer';

function App({ leagueNews, leagueFixtures, leagueStandings }) {
	// screen to display
	const [currentDisplay, setCurrentDisplay] = useState('Main');

	return (
		<div className="App">
			{/* navbar that setsCurrentDisplay */}
			<Navbar setCurrentDisplay={setCurrentDisplay} />

			{/* If currentDisplay = Main -> Main display that has all general information */}
			{/* If currentDisplay = Standings -> Standings display that has in-depth standings information */}
			{/* If currentDisplay = Matches -> League Matches display that has in-depth matches information information */}
			{currentDisplay === 'Main' ? (
				<Main />
			) : currentDisplay === 'Fixtures' ? (
				<Fixtures leagueFixtures={leagueFixtures} />
			) : currentDisplay === 'Results' ? (
				<Results leagueFixtures={leagueFixtures} />
			) : currentDisplay === 'Table' ? (
				<Table leagueStandings={leagueStandings} />
			) : (
				''
			)}
		</div>
	);
}

export default App;
