import { useDispatch, useSelector } from 'react-redux'
import './cartpage.css'
import { addCartItemThunk, allCartItemsThunk, deleteAllCartThunk, deleteCartItemThunk, updateCartItemThunk } from '../../store/cart'
import React, { useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import { addSavedItemThunk, allSavedItemsThunk, deleteSavedItemThunk } from '../../store/savedItem'

function CartPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const cartItems = Object.values(useSelector(state => state.cart))
    const savedItems = Object.values(useSelector(state => state.savedItems))
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        if (!user) {
            return history.push('/login')
        }
        dispatch(allCartItemsThunk(user.id))
        dispatch(allSavedItemsThunk(user.id))
    }, [dispatch])

    const quantityChange = (productId, quantity) => {
        dispatch(updateCartItemThunk(user.id, productId, parseInt(quantity)))
    }


    const totalAmount = (cartItems) => {
        let total = 0
        for (let i = 0; i < cartItems.length; i++) {
            total += cartItems[i].quantity * cartItems[i].productPrice
        }
        return total
    }

    const starRating = (rating) => {
        let stars = []
        for(let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<i className="fa-solid fa-star" style={{color: '#ffe000'}}></i>)
            } else {
                stars.push(<i className="far fa-star" style={{color: 'lightgray'}}></i>)
            }
        }
        return stars
    }

    const getAverageRating = (reviews) => {
        let number = 0;
        let total = reviews.length
        for (let i = 0; i < reviews.length; i++) {
          if(reviews[i].rating) {
            number += reviews[i].rating;
          } else {
            total--
          }
        }
        return starRating((number / total).toFixed(1));
    };

    const itemExists = (productId) => {
        const existInSaved = savedItems.find(item => item.productId === productId)
        const existInCart = cartItems.find(item => item.productId === productId)
        if(existInSaved) {
            dispatch(deleteCartItemThunk(existInCart.id, existInCart.userId, existInCart.productId))
            alert("We've moved this to your saved items.")
        } else {
            dispatch(deleteCartItemThunk(existInCart.id, existInCart.userId, existInCart.productId))
            dispatch(addSavedItemThunk(existInCart.productId))
            alert("We've moved this to your saved items.")
        }
    }

    const findProductCheck = (productId) => {
        const singleCartItem = cartItems.find(item => item.productId === productId)
        if (!singleCartItem) {
            dispatch(addCartItemThunk(productId, 1));
            return
        }

        let currentCart = Number(singleCartItem.quantity)
        if (currentCart >= 10) {
            alert("Limit of 10 quantities per item allowed")
            return
        } else {
            dispatch(addCartItemThunk(productId, 1));
            return
        }
    }

    const totalItemPrice = totalAmount(cartItems).toFixed(2)
    const estimatedTax = (totalAmount(cartItems) * .095).toFixed(2)
    const totalPriceAmount = (Number(totalItemPrice) + Number(estimatedTax)).toFixed(2)

    // if(!cartItems.length) return <h1>LOADING...</h1>


    return (
        <div className="cart-page">

            <div className="cart-left-side-container">
                {cartItems.length ? (
                    <div className="cart-top-area">
                        <h2>Your Cart</h2>
                        <div className="cart-items-stuff">
                            {cartItems.map((item) => (
                                <div className="individual-item">
                                    <Link to={`/products/${item.productId}`} style={{ textDecoration: 'none' }}>
                                    <div className="image-name">
                                        <img className="cart-item-image" src={item.productImage} alt="item-img"/>
                                        <h4 className="cart-product-name">{item.productName}</h4>
                                    </div>
                                    </Link>
                                    <div className="quantity-price">
                                        <div className="quantity-select">
                                            <select className="select-option" value={item.quantity} onChange={(e) => quantityChange(item.productId, e.target.value)}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>
                                            <p className="remove-item" onClick={() => dispatch(deleteCartItemThunk(item.id, user.id, item.productId))}>remove</p>
                                            <p className="save-item" onClick={() => itemExists(item.productId)}>save</p>
                                        </div>
                                        <div className="pricing-area">
                                            <p className="single-amount-times">${(item.productPrice * Number(item.quantity)).toFixed(2)}</p>
                                            {item.quantity > 1 ? <p className="single-amount-price">(${item.productPrice} each)</p> : null}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                ) : (
                    <div className="cart-top-area">
                        <h2>Your cart is empty</h2>
                    </div>
                )}

                {savedItems.length ? (
                    <div className="saved-bottom-area">
                        <div className="saved-container">
                        <h2><i className="far fa-bookmark" style={{color: "#0046be"}}></i> Saved Items</h2>
                            <div className="saved-individual">
                            {savedItems.map((item) => (
                                <div className="saved-info-area">
                                    <div className="x-area">
                                        <i className="fas fa-times modal-x" onClick={() => dispatch(deleteSavedItemThunk(item.id, item.userId, item.productId))}></i>
                                    </div>
                                    <div className="saved-image-area">
                                        <img className="saved-item-image" src={item.productImage} onClick={() => history.push(`/products/${item.productId}`)}/>
                                    </div>
                                    <p className="cart-product-name" onClick={() => history.push(`/products/${item.productId}`)}>{item.productName}</p>
                                    <p>{getAverageRating(item.reviews)} ({item.reviews.length})</p>
                                    <p>$ {item.productPrice}</p>
                                    <button className="save-add-button" onClick={() =>
                                        findProductCheck(item.productId)
                                    }><i className="fas fa-shopping-cart" style={{color:"#0046be", fontSize:"13px", paddingRight:".5rem"}}></i> Add To Cart</button>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="saved-bottom-area">
                        <h2><i className="far fa-bookmark saved" style={{color: "#0046be"}}></i> Saved Items</h2>
                        <div className="saved-item-no">
                            <h3>Your list is currently empty</h3>
                            <p>Need inspiration? Check out <Link to="/" className="rec-link">recommended items</Link>, or search for items to save.</p>
                        </div>
                    </div>
                )}

            </div>



            <div className="right-side">
                {cartItems.length ? (
                    <div className="order-summary">
                        <div className="order-header">
                            <h2>Order Summary</h2>
                        </div>
                        <div className="order-details">

                            <div className="bill">
                                <p>Original Price</p>
                                <p>Shipping Price</p>
                                <p>Estimated Sales Tax</p>
                            </div>

                            <div className="price">
                                <p>$ {totalItemPrice}</p>
                                <p>FREE</p>
                                <p>$ {estimatedTax}</p>
                            </div>

                        </div>

                        <div className="checkout-area">

                            <div className="total">
                                <h3>Total</h3>
                            </div>
                            <div className="total-amount">
                                <h3>$ {totalPriceAmount}</h3>
                            </div>

                        </div>

                        <div className="button-area">
                            <button className="checkout" onClick={() => {
                                dispatch(deleteAllCartThunk());
                                alert("Your purchase has been made! Please check your email for the order confirmation number. Thank you for shopping with Worst Buy.")
                                }}>Checkout</button>
                        </div>
                    </div>

                ) : (
                    <div className="order-summary">
                        <div className="order-header">
                            <h2>Order Summary</h2>
                        </div>
                        <div className="checkout-area">

                            <div className="total">
                                <h3>Total</h3>
                            </div>
                            <div className="total-amount">
                                <h3>$ {totalPriceAmount}</h3>
                            </div>
                        </div>
                        <div className="button-area">
                            <button className="checkout-empty" onClick={() => {
                                history.push('/products')
                                }}>Continue Shopping</button>
                        </div>

                    </div>
                )}


            </div>






        </div>
    )
}

export default CartPage
