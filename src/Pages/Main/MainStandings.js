import ScreenWidth from '../../Helper/ScreenWidth';

function MainStandings({ leagueStandings }) {
	const { screenWidth } = ScreenWidth();

	return (
		<section className="standings">
			<h1>Standings</h1>
			<table className="standings-table">
				<tr>
					<th>P</th>
					<th>Club</th>
					<th></th>
					<th>Pl</th>
					<th>GD</th>
					<th>Pts</th>
				</tr>
				{leagueStandings.map((team) => {
					return (
						<tr>
							<td>{team.position}</td>
							<td>
								<img src={team.team.crest} alt={team.team.shortName} />
							</td>
							<td>{screenWidth >= 350 ? team.team.shortName : team.team.tla}</td>
							<td>{team.playedGames}</td>
							<td>
								{team.goalDifference > 0
									? '+' + team.goalDifference
									: team.goalDifference}
							</td>
							<td>{team.points}</td>
						</tr>
					);
				})}
			</table>
		</section>
	);
}

export default MainStandings;
