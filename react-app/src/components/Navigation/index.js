import React, {useEffect, useState} from 'react';
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/worst-buy.png'
import './Navigation.css';
import { allCartItemsThunk } from '../../store/cart';
import { allProductsThunk, singleProductThunk } from '../../store/product';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch()
	const history = useHistory()
	const cart = Object.values(useSelector(state => state.cart));
	const products = Object.values(useSelector(state => state.products.allProducts))
	const [word, setWord] = useState("")
	const [search, setSearched] = useState(false)

	const [searchStatus, setSearchStatus] = useState(false)
	const [searchInfo, setSearchInfo] = useState([])
	const [input, setInput] = useState("")

	useEffect(() => {
		if (sessionUser) {
			dispatch(allCartItemsThunk(sessionUser.id))
		}
	}, [dispatch])

	const searchFinder = products.filter(product => {
		const productName = product.name.toLowerCase()
		const productCategory = product.category.toLowerCase()

		return productName.includes(word.toLowerCase()) || productCategory.includes(word.toLowerCase())
	})

	const handleSubmit = async (e) => {
		e.preventDefault()

		let searchProducts = products.filter(product => product.name.toLowerCase().includes(word.toLowerCase()) || product.category.toLowerCase().includes(word.toLowerCase()));
		setInput(word)
		setSearchInfo(searchProducts)
		setSearchStatus(true)
		setSearched(false)
		setWord("")
		history.push('/search/results');
	}

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
			{searchStatus && (
				<Redirect
				  to={{
					pathname: '/search/results',
					state: { searchInfo, word: input }
				  }}
				/>
			  )}
			<ul className="nav-list">
				<li>
					<NavLink exact to="/" id="logo">
						<img src={logo} onClick={() => dispatch(allProductsThunk())} className="logo" alt="logo" />
					</NavLink>
				</li>
				<form className="search-bar" onSubmit={handleSubmit} >
					<input
						className="search-input"
						placeholder='What can we help you find today?'
						type="text"
						value={word}
						onChange={(e) => {
							setWord(e.target.value)
						}}
					/>
					{word ? (
					<div className={search ? 'hide-search' : 'show-search'}>
						{searchFinder.map((word) => (
							<div className="search-content">
								<div className="right-side-search-area">
									<div className="search-word" onClick={() => {
										dispatch(singleProductThunk(word.id))
										history.push(`/products/${word.id}`)
										setWord("")
									}}>
										<img className="search-img" src={word.imageUrl}></img>
										<p>{word.name}</p>
									</div>
								</div>
							</div>
						))}
					</div>
					) : null
					}
					<div className="search-icon">
						<button className="search-enter" type="submit"><i class="fa-solid fa-magnifying-glass" style={{cursor:"pointer"}}></i></button>
					</div>
				</form>

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
