import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allProductsThunk } from "../../store/product";
import { useHistory, Link } from "react-router-dom"
import './landingpage.css'

function LandingPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const products = Object.values(useSelector(state => state.products.allProducts))

    useEffect(() => {
        dispatch(allProductsThunk())
    }, [dispatch])

    const getRandomProducts = (products) => {
        const fourProducts = [];

        for (let i = 0; i < 50; i++) {
            const productsLength = products.length
            const random = Math.floor(Math.random() * (productsLength) - 1)
            if(products[random] && !fourProducts.includes(products[random])) {
                fourProducts.push(products[random]);
            }
            if(fourProducts.length === 4) {
                break;
            }
        }

        return fourProducts;
    }

    const handleClick = async (e) => {
        e.preventDefault();
        history.push('/products')
    }

    const fourRandomProducts = getRandomProducts(products)

    return (
        <div className="whole-landing-page">



            <div className="left-side-content">

                    <h2>Welcome To Worst Buy</h2>
                    <p>Browse for the worst things you can possibly purchase ever!</p>
                    <div className="shop-now-button">
                        <button className="shop-now" onClick={handleClick}>Shop Now</button>
                    </div>

            </div>



            <div className="right-side-content">

                <div className="top-container">
                    <h2 className="recomended-header">Recommended For You</h2>
                    <div className="whole-mapped-list">
                        {fourRandomProducts.map((product) => (
                            <div className="mapped-individual-products">
                                <Link to ={`/products/${product.id}`} className="random-link">
                                    <img className="pics" src={product.imageUrl} alt="random"></img>
                                    <span className="product-name">{product.name}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bottom-container">
                    <div className="bottom-left-side">
                        <h2>Insert Something Here</h2>
                    </div>

                    <div className="bottom-right-side">
                        <h2>Insert Something Here</h2>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default LandingPage
