import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { singleProductThunk} from "../../store/product";
// import './singleproductpage.css'
import { useParams} from "react-router-dom";
import SinglePageReviewArea from "../SinglePageReviewArea";

function SingleProductPage() {
    const dispatch = useDispatch()
    const { productId } = useParams();
    const product = useSelector(state => state.products.singleProduct)
    const reviews = product?.reviews

    useEffect(() => {
        dispatch(singleProductThunk(productId))
    }, [dispatch])


    if (!product || !Object.values(product).length) {
        return <div>Loading...</div>
    }

    return (
        <div className="whole-page">



            <div className="product-info">

                <div className="left-side">
                    <h2>{product.name}</h2>
                    <img src={product.imageUrl}></img>
                    {product.productImages.map((product) => (
                        <div className="products">
                            <img src={product.imageUrl} />
                        </div>
                    ))}
                </div>

                <div className="top-right">
                    <span>${product.price}</span>
                    <div className="ratings">
                        <span>⭐️ {product.reviews.length}</span>
                    </div>
                    <div className="quantity-cart">
                        <button>quantity</button>
                        <button>Add to Cart</button>
                    </div>
                </div>

            </div>

            <div className="description-area">

                <div className="bottom">
                   <h1>About this item</h1>
                   <h3>Description</h3>
                   <div className="description">
                        <p>{product.description}</p>
                   </div>
                </div>

            </div>
            <div className="review-area">
                <SinglePageReviewArea product={product} productId={productId} reviews={reviews}/>
            </div>


        </div>

    )
}

export default SingleProductPage;
