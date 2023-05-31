import { useState, useEffect } from 'react';
import hamburgerIcon from '../../images/Hamburger_icon.svg.png';
import closeIcon from '../../images/close_icon.png';

function NavbarLogic() {
	// adjust buttons height and dropdown icon
	const [buttonsHeight, setButtonsHeight] = useState('0px');
	const [dropdownIcon, setDropdownIcon] = useState(hamburgerIcon);
	function dropDown() {
		if (buttonsHeight === 'fit-content') {
			setButtonsHeight('0px');
			setDropdownIcon(hamburgerIcon);
		}
		if (buttonsHeight === '0px') {
			setButtonsHeight('fit-content');
			setDropdownIcon(closeIcon);
		}
	}

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

	return { screenWidth, dropDown, buttonsHeight, dropdownIcon };
}

export default NavbarLogic;
