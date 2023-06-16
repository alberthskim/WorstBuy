import { useDispatch, useSelector } from 'react-redux'
import './cartpage.css'
import { allCartItemsThunk } from '../../store/cart'
import React, { useEffect, useState } from 'react'

function CartPage() {
    const dispatch = useDispatch()
    const cartItems = Object.values(useSelector(state => state.cart))
    const user = useSelector(state => state.session.user)
    const [quantity, setQuantity] = useState(1)

    



    useEffect(() => {
        dispatch(allCartItemsThunk(user.id))
    }, [dispatch])

    const quantityChange = (e) => {
        setQuantity(e.target.value);
    }

    const totalAmount = (cartItems) => {
        console.log("THIS IS THE cartItems", cartItems)
        let total = 0
        for (let i = 0; i < cartItems.length; i++) {
            total += cartItems[i].quantity * cartItems[i].productPrice
        }
        console.log("THIS IS THE TOTAL", total)
        return total
    }

    const totalItemPrice = totalAmount(cartItems).toFixed(2)
    const estimatedTax = (totalAmount(cartItems) * .095).toFixed(2)
    const totalPriceAmount = (Number(totalItemPrice) + Number(estimatedTax)).toFixed(2)
    console.log(totalPriceAmount)

    // if(!cartItems.length) return <h1>LOADING...</h1>

    // {cartItems.map((item) => (
    //     total = (item.productPrice * item.quantity).toFixed(2)
    // ))}

    return (
        <div className="cart-page">


            <div className="cart-left-side-container">

                <div className="cart-top-area">
                    <div className="cart-items-stuff">
                        {cartItems.map((item) => (
                            <>
                                <div className="individual-item">
                                    <img className="cart-item-image" src={item.productImage} alt="item-img"/>
                                    <p>{item.productName}</p>
                                    <div className="quantity-price">
                                        <div className="quantity-select">
                                            <select value={quantity} onChange={quantityChange}>
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
                                        </div>
                                        <p>${item.productPrice}</p>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <div className="cart-bottom-area">
                    <p>Saved Items</p>
                </div>


            </div>



            <div className="right-side">

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
                            <p>{totalItemPrice}</p>
                            <p>FREE</p>
                            <p>{estimatedTax}</p>
                        </div>

                    </div>

                    <div className="checkout-area">

                        <div className="total">
                            <p>Total</p>
                        </div>
                        <div className="total-amount">
                            <p>{totalPriceAmount}</p>
                        </div>

                    </div>

                    <div className="button-area">
                        <button className="checkout">Checkout</button>
                    </div>
                </div>


            </div>






        </div>
    )
}

export default CartPage
