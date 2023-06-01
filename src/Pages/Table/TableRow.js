import { useState } from 'react';
import ScreenWidth from '../../Helper/ScreenWidth';

function TableRow({ team }) {
	const mobileWidth = 750; // width at which form becomes a dropdown, same as in Table.scss

	const { screenWidth } = ScreenWidth();
	const [formDisplay, setFormDisplay] = useState('0px');

	// determines height of team form to display/hide when clicked
	function handleClick() {
		if (formDisplay === '0px') {
			setFormDisplay('fit-content');
		}
		if (formDisplay === 'fit-content') {
			setFormDisplay('0px');
		}
	}

	return (
		<tr>
			<td>{team.position}</td>
			<td>
				<img src={team.team.crest} alt={team.team.shortName} />
			</td>
			<td>
				{screenWidth >= 480 // display full club name
					? team.team.shortName
					: screenWidth >= 380 // display part club name
					? team.team.tla
					: ''}
				{/* do not display club name */}
			</td>
			<td>{team.playedGames}</td>
			<td>{team.won}</td>
			<td>{team.draw}</td>
			<td>{team.lost}</td>
			<td>{team.goalDifference > 0 ? '+' + team.goalDifference : team.goalDifference}</td>
			<td>{team.points}</td>

			{/* display either form or button to display form */}
			{screenWidth > mobileWidth ? (
				<td>{team.form}</td>
			) : (
				<td onClick={handleClick}>V</td>
			)}
			{/* display form dropdown */}
			{screenWidth > mobileWidth ? (
				''
			) : (
				<div className="form-display" style={{ height: formDisplay }}>
					Form: {team.form}
				</div>
			)}
		</tr>
	);
}

export default TableRow;
