import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SingleProductPage from "./components/SingleProductPage";
import AllProductPage from "./components/AllProductsPage";
import ReviewForm from "./components/ReviewForm";
import EditReviewForm from "./components/EditReviewForm";
import CartPage from "./components/CartPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/products/:productId/reviews/:reviewId/edit">
            <EditReviewForm />
          </Route>
          <Route exact path="/products">
            <AllProductPage />
          </Route>
          <Route exact path="/products/:productId">
            <SingleProductPage />
          </Route>
          <Route exact path="/products/:productId/reviews">
            <ReviewForm />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
