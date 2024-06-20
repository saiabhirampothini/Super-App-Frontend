import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/orders.css";
import Loader from "./Loader";
import { getSellerOrdersRoute } from "../utils/APIRoutes";
import { updateDeliveryStatusRoute } from "../utils/APIRoutes";

const SellerOrders = () => {
  const navigate=useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          getSellerOrdersRoute,
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

  const updateDeliveryStatus = async (productID, buyerID) => {
    try {
      const response = await axios.put(
        updateDeliveryStatusRoute,
        { productID, buyerID },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        window.alert("Order Status Updated Successfully");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      window.alert("Error updating the order status");
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
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
    <div className="orders-container">
      <h2 className="orders-heading">Your Received Orders</h2>
      {orders.map((order) => (
        <div key={order.PRODUCT_ID} className="order-item" onClick={() => handleCardClick(order.PRODUCT_ID)}>
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
              <div className="d-flex justify-content-between">
                <div>
                  <div className="order-id">
                    <span>Buyer ID: </span>#{order.BUYER_ID}
                  </div>
                  <div className="order-date">
                    <span>Order Date: </span>
                    {new Date(order.ORDER_DATE).toLocaleDateString()}
                  </div>
                </div>
                {order.ORDER_STATUS === "shipping" ? (
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        updateDeliveryStatus(order.PRODUCT_ID, order.BUYER_ID);
                      }}
                    >
                      Update as Delivered
                    </button>
                  </div>
                ) : (
                  ""
                )}
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

              <div className="payment-amount mt-2">
                {/* {console.log(order.AMOUNT_TO_BE_PAID)} */}
                {order.AMOUNT_TO_BE_PAID.toString() !== "0.00" ? (
                  <div>
                    <span>Amount To Be Collected: </span>
                    {order.AMOUNT_TO_BE_PAID}
                  </div>
                ) : (
                  <span className="text-success mt-5">
                    Amount paid by {order.MODE_OF_PAYMENT}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerOrders;
