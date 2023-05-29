import { useEffect, useState } from 'react';

function App() {
	// screen to display
	const [currentDisplay, setCurrentDisplay] = useState();

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
			{/* If currentDisplay = Main -> Main display that has all general information */}
			{/* If currentDisplay = Standings -> Standings display that has in-depth standings information */}
			{/* If currentDisplay = Matches -> League Matches display that has in-depth matches information information */}
			{/* footnote */}
		</div>
	);
}

export default App;
