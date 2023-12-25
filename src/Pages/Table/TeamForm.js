function TeamForm({ form }) {
	let formDisplay = [];

	// if form data is null, like at the start of the season, display filler
	if (form === null) {
		return (
			<td>
				<div className="form-container">
					<p className="draw">-</p>
					<p className="draw">-</p>
					<p className="draw">-</p>
					<p className="draw">-</p>
					<p className="draw">-</p>
				</div>
			</td>
		);
	}

	// remove commas from form data and push onto array
	for (let i = 0; i < form.length; i++) {
		if (form.charAt(i) === 'W') {
			formDisplay.push('W');
		} else if (form.charAt(i) === 'D') {
			formDisplay.push('D');
		} else if (form.charAt(i) === 'L') {
			formDisplay.push('L');
		} else if (form.charAt(i) === null) {
			formDisplay.push('-');
		}
	}

	// take array with only results from above and return corresponding elements
	function display(w) {
		if (w === 'W') {
			return <p className="win">W</p>;
		} else if (w === 'D') {
			return <p className="draw">D</p>;
		} else if (w === 'L') {
			return <p className="lost">L</p>;
		} else if (w === '-') {
			return <p className="draw">-</p>;
		}
	}

	// display all 5 results
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
