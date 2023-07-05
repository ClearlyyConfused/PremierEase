import { useState } from 'react';
import hamburgerIcon from '../../images/Hamburger_icon.svg.png';
import closeIcon from '../../images/close_icon.png';

function NavbarLogic() {
	// adjust buttons height and dropdown icon
	const [buttonsHeight, setButtonsHeight] = useState('0px');
	const [dropdownIcon, setDropdownIcon] = useState(hamburgerIcon);

	// expands/minimizes dropdown
	function dropDown() {
		if (buttonsHeight === '250px') {
			setButtonsHeight('0px');
			setDropdownIcon(hamburgerIcon);
		}
		if (buttonsHeight === '0px') {
			setButtonsHeight('250px');
			setDropdownIcon(closeIcon);
		}
	}

	return { dropDown, buttonsHeight, dropdownIcon };
}

export default NavbarLogic;
