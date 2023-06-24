import React from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import './addtocartmodal.css'


function AddToCartModal({product}) {
    const { imageUrl, price } = product
    const cartItems = Object.values(useSelector(state => state.cart))
    const { closeModal } = useModal();
    const history = useHistory()

    const totalAmount = (cartItems) => {
        let total = 0
        for (let i = 0; i < cartItems.length; i++) {
            total += cartItems[i].quantity * cartItems[i].productPrice
        }
        return total
    }

    const totalQuantity = (cartItems) => {
        let total = 0
        for (let i = 0; i < cartItems.length; i++) {
            total += cartItems[i].quantity
        }
        return total
    }

    const totalItemPrice = totalAmount(cartItems).toFixed(2)
    const totalQuantityItem = totalQuantity(cartItems)

    return (
        <div className="modal">
            <div className="modal-header">
                <div>Added to cart</div>
                <div className="continue-x">
                    <div className="continue" onClick={closeModal}>Continue Shopping</div>
                    <i className="fas fa-times modal-x" onClick={closeModal}></i>
                </div>
            </div>
            <div className="modal-content-cart">
                <div className="left-side-modal">
                    <div className="check-mark">
                        <i className="fas fa-check"></i>
                    </div>
                    <div className="product-modal-info">
                        <img className="modal-image" src={imageUrl} />
                        <p className="product-modal-price">$ {price}</p>
                    </div>
                </div>
                <div className="right-side-modal">
                    <div className="cart-info-modal">
                        <p className="cart-item-subtotal">Cart Subtotal ({totalQuantityItem} items): ${totalItemPrice}</p>
                        <button className="cart-modal-button" onClick={() => history.push('/cart')}>Go To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  export default AddToCartModal;
