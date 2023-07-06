import './Navbar.css';
import pl_lion from '../../images/Premier_League_Lion_Crown.png';
import pl_logo from '../../images/Premier_league_text_logo.png';
import external_icon from '../../images/external-link.svg';
import NavbarLogic from './NavbarLogic';
import ScreenWidth from '../../Helper/ScreenWidth';
import { Link } from 'react-router-dom';

function Navbar({ leagueTeams }) {
	const { dropDown, buttonsHeight, dropdownIcon } = NavbarLogic();
	const { screenWidth } = ScreenWidth();
	const mobileSize = 850; // size in which layout changes to mobile, same in Navbar.scss

	return (
		<nav>
			<section className="top-buttons">
				<div className="logo">
					<img className="lion-logo" src={pl_lion} alt="Premier League lion logo" />
					<img className="text-logo" src={pl_logo} alt="Premier League text logo" />

					{/* hamburger/cancel icon when in mobile layout */}
					{screenWidth <= mobileSize ? (
						<img className="hamburger-icon" src={dropdownIcon} alt="Hamburger Toggle" onClick={dropDown} />
					) : (
						''
					)}
				</div>

				<div
					className="buttons"
					// hides/shows dropdown when layout is mobile
					style={screenWidth <= mobileSize ? { height: buttonsHeight } : {}}
				>
					<Link to="/">
						<button
							onClick={() => {
								if (screenWidth <= mobileSize) dropDown(); // closes dropdown after going to a new page
							}}
						>
							Main
						</button>
					</Link>
					<Link to="/fixtures">
						<button
							onClick={() => {
								if (screenWidth <= mobileSize) dropDown();
							}}
						>
							Fixtures
						</button>
					</Link>
					<Link to="/results">
						<button
							onClick={() => {
								if (screenWidth <= mobileSize) dropDown();
							}}
						>
							Results
						</button>
					</Link>
					<Link to="/standings">
						<button
							onClick={() => {
								if (screenWidth <= mobileSize) dropDown();
							}}
						>
							Table
						</button>
					</Link>
				</div>
			</section>
			<section className="bottom-buttons" style={screenWidth <= mobileSize ? { height: buttonsHeight } : {}}>
				<div className="text-button-container">
					<p>Club Sites</p>
					<img src={external_icon} alt="" />
				</div>
				{leagueTeams !== undefined
					? leagueTeams.map((team) => {
							return (
								<div>
									<a href={team.website} target="_blank" rel="noreferrer">
										<img src={team.crest} alt={team.shortName} />
									</a>
								</div>
							);
					  })
					: ''}
			</section>
		</nav>
	);
}

export default Navbar;
