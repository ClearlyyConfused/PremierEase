import { useState } from 'react';

function FilterClubs({ clubFilter, setClubFilter, leagueTeams }) {
	const [dropdownActive, setDropdownActive] = useState(false);

	return (
		<div className="team-filter-container">
			<h3
				onClick={() => {
					setDropdownActive(!dropdownActive);
				}}
			>
				Filter By Club
			</h3>
			<p>{clubFilter}</p>
			<div className="team-filter-dropdown" style={{ height: dropdownActive ? '300px' : '0px' }}>
				<option
					onClick={() => {
						setClubFilter('All Clubs');
						setDropdownActive(false);
					}}
				>
					All Clubs
				</option>
				{leagueTeams.map((team) => {
					return (
						<option
							onClick={() => {
								setClubFilter(team.shortName);
								setDropdownActive(false);
							}}
						>
							{team.shortName}
						</option>
					);
				})}
			</div>
		</div>
	);
}

export default FilterClubs;
