import { useEffect, useState } from 'react';
import Navbar from './Pages/Navbar/Navbar';
import Main from './Pages/Main/Main';
import Fixtures from './Pages/Fixtures/Fixtures';
import Results from './Pages/Results/Results';
import Table from './Pages/Table/Table';
import Footer from './Pages/Footer/Footer';

function App() {
	// screen to display
	const [currentDisplay, setCurrentDisplay] = useState('Main');

	// information fetched from API
	const [leagueStandings, setLeagueStandings] = useState();
	const [leagueMatches, setLeagueMatches] = useState();
	const [leagueNews, setLeagueNews] = useState();

	function fetchData() {
		// fetch and set data for all useState variables
	}

	useEffect(() => {
		// call fetchData every X seconds
	});

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
				<Fixtures />
			) : currentDisplay === 'Results' ? (
				<Results />
			) : currentDisplay === 'Table' ? (
				<Table />
			) : (
				''
			)}

			{/* footer */}
			<Footer />
		</div>
	);
}

export default App;
