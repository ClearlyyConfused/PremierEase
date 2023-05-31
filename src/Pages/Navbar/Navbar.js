import './Navbar.css';
import pl_lion from '../../images/Premier_League_Lion_Crown.png';
import pl_logo from '../../images/Premier_league_text_logo.png';

function Navbar({ setCurrentDisplay }) {
	return (
		<nav className="navbar">
			<div className="logo">
				<img className="lion-logo" src={pl_lion} alt="Premier League lion logo" />
				<img className="text-logo" src={pl_logo} alt="Premier League text logo" />
			</div>
			<button
				onClick={() => {
					setCurrentDisplay('Main');
				}}
			>
				Main
			</button>
			<button
				onClick={() => {
					setCurrentDisplay('Fixtures');
				}}
			>
				Fixtures
			</button>
			<button
				onClick={() => {
					setCurrentDisplay('Results');
				}}
			>
				Results
			</button>
			<button
				onClick={() => {
					setCurrentDisplay('Table');
				}}
			>
				Table
			</button>
		</nav>
	);
}

export default Navbar;
