import './Table.css';
import TableRow from './TableRow';

function Table({ leagueStandings }) {
	if (leagueStandings === undefined) {
		return <div>Loading...</div>;
	} else {
		return (
			<table className="league-table">
				{/* table header */}
				<tr>
					<th>Pos</th>
					<th>Club</th>
					<th>Pl</th>
					<th>W</th>
					<th>D</th>
					<th>L</th>
					<th>GD</th>
					<th>Pts</th>
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
