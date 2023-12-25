import './Table.css';
import TableRow from './TableRow';
import ScreenWidth from '../../Helper/ScreenWidth';
import Loading from '../../Helper/Loading/Loading';

function Table({ leagueStandings }) {
	const { screenWidth } = ScreenWidth();

	const mobileWidth = 520;

	if (leagueStandings === undefined) {
		return <Loading />;
	} else {
		return (
			<div className="league-table">
				<h1>TABLE</h1>
				<table>
					{/* table header */}
					<tr>
						<th>{screenWidth < mobileWidth ? 'P' : 'Position'}</th>
						<th>Club</th>
						<th>{screenWidth < mobileWidth ? 'Pl' : 'Played'}</th>
						<th>{screenWidth < mobileWidth ? 'W' : 'Won'}</th>
						<th>{screenWidth < mobileWidth ? 'D' : 'Drawn'}</th>
						<th>{screenWidth < mobileWidth ? 'L' : 'Lost'}</th>
						<th>GD</th>
						<th>{screenWidth < mobileWidth ? 'Pts' : 'Points'}</th>
						{/*<th>Form</th> removed since API is broken*/}
					</tr>
					{/* creates row displaying each team's info */}
					{leagueStandings.map((team) => {
						return <TableRow team={team} />;
					})}
				</table>
			</div>
		);
	}
}

export default Table;
