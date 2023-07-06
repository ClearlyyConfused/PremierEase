import './Table.css';
import TableRow from './TableRow';
import ScreenWidth from '../../Helper/ScreenWidth';

function Table({ leagueStandings }) {
	const { screenWidth } = ScreenWidth();

	const mobileWidth = 850; // same as mobile width 2 in table.scss

	if (leagueStandings === undefined) {
		return <div>Loading...</div>;
	} else {
		return (
			<table className="league-table">
				<h1>TABLE</h1>
				{/* table header */}
				<tr>
					<th>{screenWidth <= mobileWidth ? 'P' : 'Position'}</th>
					<th>Club</th>
					<th></th> {/* header space for club name */}
					<th>{screenWidth <= mobileWidth ? 'Pl' : 'Played'}</th>
					<th>{screenWidth <= mobileWidth ? 'W' : 'Won'}</th>
					<th>{screenWidth <= mobileWidth ? 'D' : 'Drawn'}</th>
					<th>{screenWidth <= mobileWidth ? 'L' : 'Lost'}</th>
					<th>GD</th>
					<th>{screenWidth <= mobileWidth ? 'Pts' : 'Points'}</th>
					<th>Form</th>
				</tr>
				{/* creates row displaying each team's info */}
				{leagueStandings.map((team) => {
					return <TableRow team={team} />;
				})}
			</table>
		);
	}
}

export default Table;
