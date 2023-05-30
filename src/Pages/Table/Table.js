import './Table.css';
import TableRow from './TableRow';

function Table({ leagueStandings }) {
	console.log(leagueStandings);
	return (
		<main className="league-table">
			<table>
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
				{leagueStandings.map((team) => {
					return <TableRow team={team} />;
				})}
			</table>
		</main>
	);
}

export default Table;
