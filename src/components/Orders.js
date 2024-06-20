import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/orders.css";
import Loader from "./Loader";
import NavECommerce from "./NavE-Commerce"
import {useNavigate} from "react-router-dom";
import { EmptyOrders } from "./Empty";
import { getBuyerOrdersRoute } from "../utils/APIRoutes";

const Orders = () => {
  const navigate=useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          getBuyerOrdersRoute,
          { withCredentials: true }
        );
        console.log(response.data.data);
        setOrders(response.data.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (orders.length === 0) {
    return (
      <div>
        <EmptyOrders />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  const handleCardClick = (productID) => {
    navigate(`/products/${productID}`);
  };

  return (
    <>
    <NavECommerce/>
    <div className="orders-container">
      <h2 className="orders-heading">Your Orders</h2>
      {orders.map((order) => (
        <div key={order.PRODUCT_ID} className="order-item" onClick={()=>{handleCardClick(order.PRODUCT_ID)}}>
          <img
            src={order.images[0]}
            alt={`${order.BRAND_NAME} ${order.MODEL}`}
            className="order-image"
          />
          <div className="order-details">
            <div className="order-name">
              {order.BRAND_NAME} {order.MODEL}
            </div>
            <div className="order-info">
              <div className="order-id">
                <span>Seller ID: </span>#{order.PRODUCT_ID.split("@")[0]}
              </div>
              <div className="order-date">
                <span>Order Date: </span>
                {new Date(order.ORDER_DATE).toLocaleDateString()}
              </div>
            </div>
            <div className="order-products">
              <h4 className="order-heading">Product Details</h4>
              <div className="order-quantity">
                <span>Price: </span>
                {order.PRICE}
              </div>
              <div className="order-quantity">
                <span>Quantity: </span>
                {order.QUANTITY}
              </div>
            </div>
            <div className="order-payment">
              <div className="payment-method">
                <span>Payment Method: </span>
                {order.MODE_OF_PAYMENT}
              </div>
              <div>
                <span>Status: </span>
                {order.ORDER_STATUS === "shipping" ? (
                  <span className="text-warning">Shipping</span>
                ) : (
                  <span className="text-success">Delivered</span>
                )}
              </div>

              {order.MODE_OF_PAYMENT === "COD" &&
              order.ORDER_STATUS === "shipping" ? (
                <div className="payment-amount">
                  <span>Amount To Be Paid: </span>
                  {order.AMOUNT_TO_BE_PAID}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Orders;
