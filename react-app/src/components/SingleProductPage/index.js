import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { singleProductThunk} from "../../store/product";
import './singleproductpage.css'
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

                <div className="bottom-description-area">
                   <h1>About this item</h1>
                   <h3>Description</h3>
                   <div className="description">
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
