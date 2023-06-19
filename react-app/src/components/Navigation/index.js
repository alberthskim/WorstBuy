import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/worst-buy.png'
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="nav-bar-area">
			<ul className="nav-list">
				<li>
					<NavLink exact to="/" id="logo">
						<img src={logo} className="logo" alt="logo" />
					</NavLink>
				</li>
				<li>
					{/* <input className="search-bar"></input> */}
				</li>
				{isLoaded && (
					<div className="right-corner">
						<li>
							<ProfileButton user={sessionUser} />
						</li>
						<li>
							<NavLink exact to="/cart" className="logo">
								<i className="fas fa-shopping-cart"></i>
							</NavLink>
						</li>
					</div>
				)}
			</ul>
		</div>
	);
}

export default Navigation;
