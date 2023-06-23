import { useDispatch, useSelector } from 'react-redux'
import './cartpage.css'
import { allCartItemsThunk, deleteAllCartThunk, deleteCartItemThunk, updateCartItemThunk } from '../../store/cart'
import React, { useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'

function CartPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const cartItems = Object.values(useSelector(state => state.cart))
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        if (!user) return history.push('/login')
        dispatch(allCartItemsThunk(user.id))
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
                                    <div className="image-name">
                                        <img className="cart-item-image" src={item.productImage} alt="item-img"/>
                                        <h4 className="cart-product-name">{item.productName}</h4>
                                    </div>
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
                {/* <div className="cart-bottom-area">
                    <p>Saved Items</p>
                </div> */}
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
