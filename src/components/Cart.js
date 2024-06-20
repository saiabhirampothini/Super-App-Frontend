// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/cart.css";
// import "../styles/cartModal.css"; // Import the modal styles
// import Loader from "./Loader";
// import NavECommerce from "./NavE-Commerce"
// import { EmptyCart } from "./Empty";
// import { getMyCartRoute } from "../utils/APIRoutes";
// import { deleteCartItemRoute } from "../utils/APIRoutes";
// import { editCartQuantityRoute } from "../utils/APIRoutes";
// import { cartGetBuyerAddressRoute } from "../utils/APIRoutes";
// import { cartPlaceOrdersCodRoute } from "../utils/APIRoutes";
// import { cartPlaceOrdersOnlineRoute } from "../utils/APIRoutes";

// const Cart = () => {
//   const navigate=useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
//   const [paymentMode, setPaymentMode] = useState("card"); // State for selected payment mode

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get(
//           getMyCartRoute,
//           {
//             withCredentials: true,
//           }
//         );
//         console.log(response.data.data);
//         setCartItems(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//         setLoading(false);
//         setError(error);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const removeCartItem = async (productID) => {
//     try {
//       const response = await axios.delete(
//         deleteCartItemRoute,
//         {
//           data: { productID },
//           withCredentials: true,
//         }
//       );
//       if (response.status === 200) {
//         window.alert("Cart Item removed successfully");
//         window.location.reload();
//       }
//     } catch (err) {
//       console.log(err);
//       window.alert("Error removing the cart item");
//     }
//   };
//   const handleEdit = async (productID, quantity) => {
//     try {
//       const response = await axios.put(
//         editCartQuantityRoute,
//         { productID, quantity },
//         { withCredentials: true }
//       );
//       if (response.status === 200) {
//         window.alert(
//           "Quantities updated sucessfully, proceed with placing orders"
//         );
//       }
//     } catch (err) {
//       console.log(err);
//       window.alert("Error updating the quantities");
//     }
//   };
//   const updateQuantity = (productID, quantity) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.PRODUCT_ID === productID
//           ? { ...item, QUANTITY: parseInt(quantity) }
//           : item
//       )
//     );
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       const modeOfPayment = paymentMode.toUpperCase();
//       let productIDS = [];
//       let quantities = [];
//       for (let i = 0; i < cartItems.length; i++) {
//         productIDS.push(cartItems[i].PRODUCT_ID);
//         quantities.push(cartItems[i].QUANTITY);
//       }

//       const res = await axios.get(
//         cartGetBuyerAddressRoute,
//         {
//           withCredentials: true,
//         }
//       );
//       let buyerAddress = res.data.data.address;
//       if (modeOfPayment === "COD") {
//         const response = await axios.post(
//           cartPlaceOrdersCodRoute,
//           {
//             productIDS,
//             quantities,
//             modeOfPayment,
//             buyerAddress,
//           },
//           { withCredentials: true }
//         );
//         if (response.status === 200) {
//           window.alert("Orders placed successfully");
//           window.location.reload();
//         }
//       } else {
//         try {
//           let total = 0;
//           for (let i = 0; i < cartItems.length; i++) {
//             total += parseFloat(cartItems[i].PRICE);
//           }
//           const response = await axios.post(
//             cartPlaceOrdersOnlineRoute,
//             {
//               total,
//               productIDS,
//               quantities,
//               modeOfPayment,
//               buyerAddress,
//             },
//             { withCredentials: true }
//           );
//           // console.log(response);
//           window.location.href = response.data.url;
//           // window.open(response.data.url, "_blank");
//         } catch (err) {
//           console.log(err);
//           window.alert("Payment failed");
//         }
//       }
//     } catch (error) {
//       console.log("Error placing order:", error);
//       window.alert("Error placing the order ");
//     }
//   };

//   const CartModal = ({
//     cartItems,
//     closeModal,
//     updateQuantity,
//     setPaymentMode,
//     handlePlaceOrder,
//   }) => {
//     return (
//       <div className="modal-overlay">
//         <div className="modal-content">
//           <h2>Review Your Cart</h2>
//           <button className="close-modal" onClick={closeModal}>
//             &times;
//           </button>
//           <div className="modal-items">
//             {cartItems.map((item, index) => (
//               <div key={index} className="modal-item">
//                 <img src={item.images[0]} alt={item.MODEL} />
//                 <div className="modal-item-details">
//                   <h3>
//                     {item.BRAND_NAME} {item.MODEL}
//                   </h3>
//                   <p>
//                     Price: ₹{parseFloat(item.PRICE).toLocaleString("en-IN")}
//                   </p>
//                   <div className="quantity-update">
//                     <label htmlFor={`quantity-${item.PRODUCT_ID}`}>
//                       Quantity:
//                     </label>
//                     <div className="d-flex justify-content-around">
//                       <input
//                         type="number"
//                         id={`quantity-${item.PRODUCT_ID}`}
//                         value={item.QUANTITY}
//                         onChange={(e) =>
//                           updateQuantity(item.PRODUCT_ID, e.target.value)
//                         }
//                         min="1"
//                       />
//                       <button
//                         className="btn btn-secondary ml-3"
//                         onClick={(e) => {
//                           handleEdit(item.PRODUCT_ID, item.QUANTITY);
//                         }}
//                       >
//                         Update
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="payment-mode">
//             <h3>Select Payment Mode</h3>
//             <div className="payment-options">
//               <div className="payment-option">
//                 <input
//                   type="radio"
//                   id="card"
//                   name="paymentMode"
//                   value="card"
//                   checked={paymentMode === "card"}
//                   onChange={(e) => setPaymentMode(e.target.value)}
//                 />
//                 <label htmlFor="card">Card</label>
//               </div>
//               <div className="payment-option">
//                 <input
//                   type="radio"
//                   id="netbanking"
//                   name="paymentMode"
//                   value="netbanking"
//                   checked={paymentMode === "netbanking"}
//                   onChange={(e) => setPaymentMode(e.target.value)}
//                 />
//                 <label htmlFor="netbanking">Net Banking</label>
//               </div>
//               <div className="payment-option">
//                 <input
//                   type="radio"
//                   id="cod"
//                   name="paymentMode"
//                   value="cod"
//                   checked={paymentMode === "cod"}
//                   onChange={(e) => setPaymentMode(e.target.value)}
//                 />
//                 <label htmlFor="cod">Cash on Delivery</label>
//               </div>
//             </div>
//           </div>
//           <h2>
//             Subtotal ({cartItems.length} item{cartItems.length > 1 ? "s" : ""}):
//             ₹
//             {cartItems
//               .reduce(
//                 (acc, item) => acc + parseFloat(item.PRICE) * item.QUANTITY,
//                 0
//               )
//               .toLocaleString("en-IN")}
//             .00
//           </h2>
//           <button
//             className="place-order"
//             onClick={() => {
//               handlePlaceOrder();
//             }}
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div>
//         <Loader />
//       </div>
//     );
//   }
//   if (cartItems.length === 0) {
//     return (
//       <div>
//         <EmptyCart />
//       </div>
//     );
//   }
//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   const handleCardClick = (productID) => {
//     navigate(`/products/${productID}`);
//   };

//   return (
//     <>
//     <NavECommerce/>
//     <div className="cart-page">
//       <h1>Shopping Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div className="cart-items mt-4 mb-4" >
//           {cartItems.map((item, index) => (
//             <div key={index} className="cart-item mb-5" onClick={() => handleCardClick(item.PRODUCT_ID)}>
//               <img src={item.images[0]} alt={item.MODEL} />
//               <div className="item-details">
//                 <h2>
//                   {item.BRAND_NAME} {item.MODEL}
//                 </h2>
//                 <p>Price: ₹{parseFloat(item.PRICE).toLocaleString("en-IN")}</p>
//                 <p>Quantity: {item.QUANTITY}</p>

//                 <button
//                   className="mt-3"
//                   onClick={() => {
//                     removeCartItem(item.PRODUCT_ID);
//                   }}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       <div className="subtotal">
//         <h2>
//           Subtotal ({cartItems.length} item{cartItems.length > 1 ? "s" : ""}): ₹
//           {cartItems
//             .reduce(
//               (acc, item) => acc + parseFloat(item.PRICE) * item.QUANTITY,
//               0
//             )
//             .toLocaleString("en-IN")}
//           .00
//         </h2>
//         <button className="proceed-to-buy" onClick={() => setIsModalOpen(true)}>
//           Proceed to Buy
//         </button>
//       </div>
//       {isModalOpen && (
//         <CartModal
//           cartItems={cartItems}
//           closeModal={() => setIsModalOpen(false)}
//           updateQuantity={updateQuantity}
//           setPaymentMode={setPaymentMode}
//           handlePlaceOrder={handlePlaceOrder}
//         />
//       )}
//     </div>
//     </>
//   );
// };

// export default Cart;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/cart.css";
import "../styles/cartModal.css"; // Import the modal styles
import Loader from "./Loader";
import NavECommerce from "./NavE-Commerce";
import { EmptyCart } from "./Empty";
import { getMyCartRoute } from "../utils/APIRoutes";
import { deleteCartItemRoute } from "../utils/APIRoutes";
import { editCartQuantityRoute } from "../utils/APIRoutes";
import { cartGetBuyerAddressRoute } from "../utils/APIRoutes";
import { cartPlaceOrdersCodRoute } from "../utils/APIRoutes";
import { cartPlaceOrdersOnlineRoute } from "../utils/APIRoutes";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [paymentMode, setPaymentMode] = useState("card"); // State for selected payment mode

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(getMyCartRoute, {
          withCredentials: true,
        });
        console.log(response.data.data);
        setCartItems(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
        setError(error);
      }
    };

    fetchCartItems();
  }, []);

  const removeCartItem = async (productID) => {
    try {
      const response = await axios.delete(deleteCartItemRoute, {
        data: { productID },
        withCredentials: true,
      });
      if (response.status === 200) {
        window.alert("Cart Item removed successfully");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      window.alert("Error removing the cart item");
    }
  };
  const handleEdit = async (productID, quantity) => {
    try {
      const response = await axios.put(
        editCartQuantityRoute,
        { productID, quantity },
        { withCredentials: true }
      );
      if (response.status === 200) {
        window.alert(
          "Quantities updated sucessfully, proceed with placing orders"
        );
      }
    } catch (err) {
      console.log(err);
      window.alert("Error updating the quantities");
    }
  };
  const updateQuantity = (productID, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.PRODUCT_ID === productID
          ? { ...item, QUANTITY: parseInt(quantity) }
          : item
      )
    );
  };

  const handlePlaceOrder = async () => {
    try {
      const modeOfPayment = paymentMode.toUpperCase();
      let productIDS = [];
      let quantities = [];
      for (let i = 0; i < cartItems.length; i++) {
        productIDS.push(cartItems[i].PRODUCT_ID);
        quantities.push(cartItems[i].QUANTITY);
      }

      const res = await axios.get(cartGetBuyerAddressRoute, {
        withCredentials: true,
      });
      let buyerAddress = res.data.data.address;
      if (modeOfPayment === "COD") {
        const response = await axios.post(
          cartPlaceOrdersCodRoute,
          {
            productIDS,
            quantities,
            modeOfPayment,
            buyerAddress,
          },
          { withCredentials: true }
        );
        if (response.status === 200) {
          window.alert("Orders placed successfully");
          window.location.reload();
        }
      } else {
        try {
          let total = 0;
          for (let i = 0; i < cartItems.length; i++) {
            total += parseFloat(cartItems[i].PRICE);
          }
          const response = await axios.post(
            cartPlaceOrdersOnlineRoute,
            {
              total,
              productIDS,
              quantities,
              modeOfPayment,
              buyerAddress,
            },
            { withCredentials: true }
          );
          console.log(response);
          // window.location.href = response.data.url;
          // window.open(response.data.url, "_blank");
        } catch (err) {
          console.log(err);
          window.alert("Payment failed");
        }
      }
    } catch (error) {
      console.log("Error placing order:", error);
      window.alert("Error placing the order ");
    }
  };

  const CartModal = ({
    cartItems,
    closeModal,
    updateQuantity,
    setPaymentMode,
    handlePlaceOrder,
  }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Review Your Cart</h2>
          <button className="close-modal" onClick={closeModal}>
            &times;
          </button>
          <div className="modal-items">
            {cartItems.map((item, index) => (
              <div key={index} className="modal-item">
                <img src={item.images[0]} alt={item.MODEL} />
                <div className="modal-item-details">
                  <h3>
                    {item.BRAND_NAME} {item.MODEL}
                  </h3>
                  <p>
                    Price: ₹{parseFloat(item.PRICE).toLocaleString("en-IN")}
                  </p>
                  <div className="quantity-update">
                    <label htmlFor={`quantity-${item.PRODUCT_ID}`}>
                      Quantity:
                    </label>
                    <div className="d-flex justify-content-around">
                      <input
                        type="number"
                        id={`quantity-${item.PRODUCT_ID}`}
                        value={item.QUANTITY}
                        onChange={(e) =>
                          updateQuantity(item.PRODUCT_ID, e.target.value)
                        }
                        min="1"
                      />
                      <button
                        className="btn btn-secondary ml-3"
                        onClick={(e) => {
                          handleEdit(item.PRODUCT_ID, item.QUANTITY);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="payment-mode">
            <h3>Select Payment Mode</h3>
            <div className="payment-options">
              <div className="payment-option ml-4">
                <input
                  type="radio"
                  id="card"
                  name="paymentMode"
                  value="card"
                  checked={paymentMode === "card"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                />
                <label htmlFor="card">Card</label>
              </div>
              <div className="payment-option ml-4">
                <input
                  type="radio"
                  id="netbanking"
                  name="paymentMode"
                  value="netbanking"
                  checked={paymentMode === "netbanking"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                />
                <label htmlFor="netbanking">Net Banking</label>
              </div>
              <div className="payment-option ml-4">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMode"
                  value="cod"
                  checked={paymentMode === "cod"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>
          </div>
          <h2>
            Subtotal ({cartItems.length} item{cartItems.length > 1 ? "s" : ""}):
            ₹
            {cartItems
              .reduce(
                (acc, item) => acc + parseFloat(item.PRICE) * item.QUANTITY,
                0
              )
              .toLocaleString("en-IN")}
            .00
          </h2>
          <button
            className="place-order"
            onClick={() => {
              handlePlaceOrder();
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (cartItems.length === 0) {
    return (
      <div>
        <EmptyCart />
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
      <NavECommerce />
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items mt-4 mb-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="cart-item mb-5"
                onClick={() => handleCardClick(item.PRODUCT_ID)}
              >
                <img src={item.images[0]} alt={item.MODEL} />
                <div className="item-details">
                  <h2>
                    {item.BRAND_NAME} {item.MODEL}
                  </h2>
                  <p>
                    Price: ₹{parseFloat(item.PRICE).toLocaleString("en-IN")}
                  </p>
                  <p>Quantity: {item.QUANTITY}</p>

                  <button
                    className="mt-3"
                    onClick={() => {
                      removeCartItem(item.PRODUCT_ID);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="subtotal">
          <h2>
            Subtotal ({cartItems.length} item{cartItems.length > 1 ? "s" : ""}):
            ₹
            {cartItems
              .reduce(
                (acc, item) => acc + parseFloat(item.PRICE) * item.QUANTITY,
                0
              )
              .toLocaleString("en-IN")}
            .00
          </h2>
          <button
            className="proceed-to-buy"
            onClick={() => setIsModalOpen(true)}
          >
            Proceed to Buy
          </button>
        </div>
        {isModalOpen && (
          <CartModal
            cartItems={cartItems}
            closeModal={() => setIsModalOpen(false)}
            updateQuantity={updateQuantity}
            setPaymentMode={setPaymentMode}
            handlePlaceOrder={handlePlaceOrder}
          />
        )}
      </div>
    </>
  );
};

export default Cart;
