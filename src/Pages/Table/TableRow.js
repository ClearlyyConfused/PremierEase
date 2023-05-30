import { useState } from 'react';

function TableRow({ team }) {
	const [formDisplay, setFormDisplay] = useState('0px');

	function handleClick() {
		if (formDisplay === '0px') {
			setFormDisplay('fit-content');
		}
		if (formDisplay === 'fit-content') {
			setFormDisplay('0px');
		}
	}

	return (
		<tr onClick={handleClick}>
			<td>{team.position}</td>
			<td>
				<img src={team.team.crest} alt={team.team.shortName} /> {team.team.shortName}
			</td>
			<td>{team.playedGames}</td>
			<td>{team.won}</td>
			<td>{team.draw}</td>
			<td>{team.lost}</td>
			<td>{team.goalDifference}</td>
			<td>{team.points}</td>
			<div style={{ height: formDisplay }}>Form: {team.form}</div>
		</tr>
	);
}

export default TableRow;
