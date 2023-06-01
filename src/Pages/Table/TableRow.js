import { useState } from 'react';
import ScreenWidth from '../../Helper/ScreenWidth';
import TeamForm from './TeamForm';

function TableRow({ team }) {
	const { screenWidth } = ScreenWidth();
	const mobileWidth = 750; // width at which form becomes a dropdown, same as in Table.scss

	// determines height of team's form to display/hide when clicked
	const [formDisplay, setFormDisplay] = useState('0px');
	function handleClick() {
		if (formDisplay === '0px') {
			setFormDisplay('100px');
		}
		if (formDisplay === '100px') {
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
				<TeamForm form={team.form} />
			) : (
				<td onClick={handleClick}>V</td>
			)}
			{/* display form dropdown */}
			{screenWidth > mobileWidth ? (
				''
			) : (
				<div className="form-dropdown" style={{ height: formDisplay }}>
					<div className="form-dropdown-container">
						Form: <TeamForm form={team.form} />
					</div>
				</div>
			)}
		</tr>
	);
}

export default TableRow;
