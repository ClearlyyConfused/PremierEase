function TeamForm({ form }) {
	let formDisplay = [];

	for (let i = 0; i < form.length; i++) {
		if (form.charAt(i) === 'W') {
			formDisplay.push('W');
		} else if (form.charAt(i) === 'D') {
			formDisplay.push('D');
		} else if (form.charAt(i) === 'L') {
			formDisplay.push('L');
		}
	}

	function display(w) {
		if (w === 'W') {
			return <p className="win">W</p>;
		} else if (w === 'D') {
			return <p className="draw">D</p>;
		} else if (w === 'L') {
			return <p className="lost">L</p>;
		}
	}

	return (
		<td>
			<div className="form-container">
				{display(formDisplay[0])}
				{display(formDisplay[1])}
				{display(formDisplay[2])}
				{display(formDisplay[3])}
				{display(formDisplay[4])}
			</div>
		</td>
	);
}

export default TeamForm;
