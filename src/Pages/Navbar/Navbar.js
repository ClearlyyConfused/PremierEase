import './Navbar.css';

function Navbar({ setCurrentDisplay }) {
	return (
		<nav>
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
