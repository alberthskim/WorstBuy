import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="nav-bar-area">
			<ul className="nav-list">
				<li>
					<NavLink exact to="/" className="logo">
						<h1 className="nav-title">WorstBuy</h1>
					</NavLink>
				</li>
				<li>
					{/* <input className="search-bar"></input> */}
				</li>
				{isLoaded && (
					<div className="right-corner">
						<li>
							<NavLink exact to="/cart" className="logo">
								<i className="fas fa-shopping-cart"></i>
							</NavLink>
						</li>
						<li>
							<ProfileButton user={sessionUser} />
						</li>
					</div>
				)}
			</ul>
		</div>
	);
}

export default Navigation;
