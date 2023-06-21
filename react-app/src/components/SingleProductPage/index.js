import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { singleProductThunk} from "../../store/product";
import './singleproductpage.css'
import { useParams, useHistory} from "react-router-dom";
import SinglePageReviewArea from "../SinglePageReviewArea";
import { addCartItemThunk, allCartItemsThunk } from "../../store/cart";


function SingleProductPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { productId } = useParams();
    const product = useSelector(state => state.products.singleProduct)
    const user = useSelector(state => state.session.user)
    const reviews = product?.reviews
    const [quantity, setQuantity] = useState(1)

    const quantityChange = (e) => {
        setQuantity(e.target.value);
    }

    const addToCart = (productId, quantity) => {
        dispatch(addCartItemThunk(productId, parseInt(quantity)))
    }

    useEffect(() => {
        dispatch(singleProductThunk(productId))
        if (user) {
			dispatch(allCartItemsThunk(user.id))
		}
    }, [dispatch])

    const starRating = (rating) => {
        let stars = []
        for(let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<i class="fa-solid fa-star" style={{color: '#ffe000'}}></i>)
            } else {
                stars.push(<i className="far fa-star" style={{color: 'lightgray'}}></i>)
            }
        }
        return stars;
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


    if (!product || !Object.values(product).length) {
        return <div>Loading...</div>
    }

    return (
        <div className="whole-page">

            <h2>{product.name}</h2>
            <div className="product-info">

                    <div className="left-side-left">
                        {product.productImages.map((product) => (
                            <div className="products-pic">
                                <img className="more-pics" src={product.imageUrl} alt="product"/>
                            </div>
                        ))}
                    </div>

                    <div className="middle-area">
                        <div className="main-pic">
                            <img className="default-preview-image" src={product.imageUrl}></img>
                        </div>
                    </div>

                    <div className="left-side-right">
                        <div className="ratings">
                            <span>${product.price}</span>
                            <span>{getAverageRating(Object.values(product.reviews))} ({Object.values(product.reviews).length})</span>
                        </div>
                        <div className="quantity-cart">
                            <select className="select-field" value={product.quantity} onChange={quantityChange}>
                                <option value="1">Qty 1</option>
                                <option value="2">Qty 2</option>
                                <option value="3">Qty 3</option>
                                <option value="4">Qty 4</option>
                                <option value="5">Qty 5</option>
                                <option value="6">Qty 6</option>
                                <option value="7">Qty 7</option>
                                <option value="8">Qty 8</option>
                                <option value="9">Qty 9</option>
                                <option value="10">Qty 10</option>
                            </select>
                            {!user ? (
                            <button className="add-cart detail" onClick={() => {
                                alert("Must Be Logged In First!")
                                history.push('/login')
                                }}>Add To Cart</button>
                        ) : (
                            <button className="add-cart detail" onClick={() => {
                                addToCart(product.id, quantity);
                                alert("Added To Cart")
                                }}>Add To Cart</button>
                        )}
                        </div>
                    </div>


            </div>



            <div className="description-area">

                <div className="bottom-description-area">
                   <h1 className="about-item">About this item</h1>
                   <div className="description">
                        <h3 className="description-header">Description</h3>
                        <p>{product.description}</p>
                   </div>
                </div>

            </div>
            <div className="review-area">
                <SinglePageReviewArea product={product} productId={productId} allReviews={reviews}/>
            </div>


        </div>

    )
}

export default SingleProductPage;
