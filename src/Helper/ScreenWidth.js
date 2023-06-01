import { useState, useEffect } from 'react';

function ScreenWidth() {
	// keeps track of screen width
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	function getScreenWidth() {
		setScreenWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener('resize', getScreenWidth);

		return () => {
			window.removeEventListener('resize', getScreenWidth);
		};
	}, [screenWidth]);

	return { screenWidth };
}

export default ScreenWidth;
