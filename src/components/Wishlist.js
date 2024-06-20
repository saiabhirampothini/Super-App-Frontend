// src/Wishlist.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import "../styles/wishlist.css";
import NavECommerce from "./NavE-Commerce";
import {useNavigate} from "react-router-dom";
import { EmptyWishlist } from "./Empty";
import { getWishListRoute } from "../utils/APIRoutes";
import { addToCartRoute } from "../utils/APIRoutes";

const Wishlist = () => {
  const navigate=useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          getWishListRoute,
          { withCredentials: true }
        );
        setWishlist(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const addToCart = async (productID) => {
    try {
      const response = await axios.post(
        addToCartRoute,
        { productID },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        window.alert("Product added to cart successfully");
      }
    } catch (err) {
      console.log(err);
      window.alert("Error adding product to cart");
    }
  };
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (wishlist.length === 0) {
    return (
      <div>
        <EmptyWishlist />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleCardClick = (productID) => {
    navigate(`/products/${productID}`);
  };

  return (
    <>
    <NavECommerce/>
    <div>
      <h1 className="h1 mb-5 mt-5 ml-5 text-center">WishList</h1>
      <div className="wish-list-outer-container">
        <div className="wishlist-container">
          <div className="wishlist-header"></div>
          {wishlist.map((item) => (
            <div key={item.PRODUCT_ID} className="wishlist-item" onClick={()=>{handleCardClick(item.PRODUCT_ID)}}>
              <img src={item.images[0]} alt={item.MODEL} />
              <div className="wishlist-item-details">
                <h3>
                  {item.BRAND_NAME} {item.MODEL}
                </h3>
                <p>{item.DESCRIPTION}</p>
                <p>Specifications: {item.SPECIFICATIONS}</p>
              </div>
              <div className="wishlist-item-price">₹{item.PRICE}</div>
              <button
                onClick={() => {
                  addToCart(item.PRODUCT_ID);
                }}
                className="wishlist-add-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Wishlist;
