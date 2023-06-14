import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { allProductsThunk } from "../../store/product";
import { useHistory, Link } from "react-router-dom"
import './landingpage.css'

function LandingPage() {
    const dispatch = useDispatch()
    const history = useHistory()

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

    const products = Object.values(useSelector(state => state.products))
    const fourRandomProducts = getRandomProducts(products)

    return (
        <div className="landing-page">
            <div className="page-content">
                <div className="left-side">
                    <h2>Welcome To Worst Buy</h2>
                    <p>Browse for the worst things you can possibly purchase ever!</p>
                    <div className="shop-now-button">
                        <button onClick={handleClick}>Shop Now</button>
                    </div>
                </div>
                <div className="top-right">
                    <h2>Recommended For You</h2>
                    {fourRandomProducts.map((product) => (
                        <Link to ={`/products/${product.id}`} className="random-link">
                            <div className="picture-area">
                                <img className="pics" src={product.imageUrl}></img>
                                <span>{product.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="middle-bottom-left">
                    <h2>Insert Something Here</h2>
                </div>
                <div className="bottom-right">
                    <h2>Insert Something Here</h2>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
