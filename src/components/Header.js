import React from 'react'
import image from '../Assets/quickie.png'
import './Header.css';

function Header() {
	return (
		<div className='header_class'>
			<img src={image} alt="quickie logo" />
		</div>
	)
}

export default Header