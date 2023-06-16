import './cartpage.css'

function CartPage() {
    return (
        <div className="cart-page">


            <div className="cart-left-side-container">

                <div className="cart-top-area">
                    <h3>Map the products starting from here</h3>
                    <div className="cart-items-stuff">

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
                            <p>Store Pickup</p>
                        </div>

                        <div className="price">
                            <p>Original Price $amount</p>
                            <p>Shipping Price $amount</p>
                            <p>Estimated Sales Tax $amount</p>
                        </div>

                    </div>

                    <div className="checkout-area">

                        <div className="total">
                            <p>Total</p>
                        </div>
                        <div className="total-amount">
                            <p>Total $amount</p>
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
