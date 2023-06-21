import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/worst-buy.png'
import './Navigation.css';
import { allCartItemsThunk } from '../../store/cart';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch()
	const cart = Object.values(useSelector(state => state.cart))

	useEffect(() => {
		if (sessionUser) {
			dispatch(allCartItemsThunk(sessionUser.id))
		}
	}, [dispatch])

	const quantityAmount = (cart) => {
		if (!cart.length) return 0;
		let count = 0
		for(let i = 0; i < cart.length; i++) {
			count += cart[i].quantity
		}
		return count;
	}

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

								<div className='cart-logo'>
              						<i className="fas fa-shopping-cart"></i>
              						{(!sessionUser || quantityAmount(cart) < 0 || !cart.length) ? null : <div className='cart-logo-amount'>{quantityAmount(cart)}</div>}
            					</div>
							</NavLink>
						</li>
					</div>
				)}
			</ul>
		</div>
	);
}

export default Navigation;
