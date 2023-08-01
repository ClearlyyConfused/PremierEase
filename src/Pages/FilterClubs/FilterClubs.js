import { useEffect, useState } from 'react';
import './FilterClubs.css';
import upChevron from '../../images/up-chevron-svgrepo-com.svg';
import downChevron from '../../images/down-chevron-svgrepo-com.svg';

function FilterClubs({ clubFilter, setClubFilter, leagueTeams }) {
	const [dropdownActive, setDropdownActive] = useState(false);

	function closeDropdown() {
		setDropdownActive(false);
		document.querySelector('.team-filter-dropdown').scrollTop = 0;
	}

	useEffect(() => {
		// have clicks outside of filter close dropdown
		const filter = document.querySelectorAll('.team-filter-container')[0];
		function handleClick(event) {
			if (!filter.contains(event.target)) {
				closeDropdown();
			}
		}
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, []);

	return (
		<div
			className="team-filter-container"
			onClick={() => {
				dropdownActive ? closeDropdown() : setDropdownActive(true);
			}}
		>
			<div>
				<h3>Filter By Club</h3>
				<p>{clubFilter}</p>
			</div>
			<img
				src={dropdownActive ? upChevron : downChevron}
				alt=""
				srcset=""
				className={dropdownActive ? 'upchevron' : ''} // scales up the up chevron to match down chevron
			/>
			<div
				className="team-filter-dropdown"
				style={{
					height: dropdownActive ? '450px' : '0px',
					border: dropdownActive ? '0.5px solid rgba(128, 128, 128, 0.3)' : '',
				}}
			>
				<div
					onClick={() => {
						setClubFilter('All Clubs');
						closeDropdown();
					}}
				>
					All Clubs
				</div>
				{leagueTeams.map((team) => {
					return (
						<div
							onClick={() => {
								setClubFilter(team.shortName);
								closeDropdown();
							}}
						>
							{team.shortName}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default FilterClubs;
