// import React, { useState, useEffect } from "react";
// import {useParams} from "react-router-dom";
// import axios from "axios";
// import { Carousel, Button,Modal } from "react-bootstrap";
// import "../styles/productPage.css";
// import StarRating from "./starRating";
// import NavECommerce from "./NavE-Commerce"
// import Loader from "./Loader"
// import StarRatingInput from "./starRatingInput";
// import { getReviewsAdditionalRoute } from "../utils/APIRoutes";
// import { getProductReviewsRoute } from "../utils/APIRoutes";
// import { fetchOrdersRoute } from "../utils/APIRoutes";
// import { addToWishListRoute } from "../utils/APIRoutes";
// import { addToCartRoute } from "../utils/APIRoutes";
// import { addReviewsRoute } from "../utils/APIRoutes";
// import { paySingleOnlineRoute } from "../utils/APIRoutes";
// import { paySingleCodRoute } from "../utils/APIRoutes";

// const ProductPage = () => {
//   const [product, setProduct] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [reviewMeta,setReviewMeta]=useState(null);
//   const [reviews,setReviews]=useState([]);
//   const [orders,setOrders]=useState([]);
//   const [error, setError] = useState(null);
//   const [SPECIFICATIONS,setSpecifications]=useState(null);
//   const [buyerAddress,setBuyerAddress]=useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [currentImage, setCurrentImage] = useState(null);
//   const [description, setDescription] = useState("");
//   const [reviewImage, setReviewImage] = useState(null);
//   const [rating, setRating] = useState(0); // New state for star rating
//   const {productId}=useParams();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/products/${productId}`, {
//           withCredentials: true,
//         });
//         // console.log(response);
//         // console.log(response.data.data);
//         setProduct(response.data.data);
//         // console.log(response.data.data[0].SPECIFICATIONS)
//         setSpecifications(response.data.data[0].SPECIFICATIONS);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     const fetchExtraMeta = async () => {
//       try {
//         // console.log("here");
//         const response = await axios.post(getReviewsAdditionalRoute,{
//           productID:productId
//         }, {
//           withCredentials: true,
//         });
//         // console.log("after here");
//         // console.log(response.data.data[0]);
//         setReviewMeta(response.data.data[0]);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     const fetchReviews = async () => {
//       try {
//         // console.log("here");
//         const response = await axios.post(getProductReviewsRoute,{
//           productID:productId
//         }, {
//           withCredentials: true,
//         });
//         // console.log("after here");
//         // console.log(response.data.data);
//         setReviews(response.data.data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     const fetchOrders = async () => {
//       try {
//         // console.log("here");
//         const response = await axios.post(fetchOrdersRoute,{
//           productID:productId
//         }, {
//           withCredentials: true,
//         });
//         // console.log("Orders");
//         // console.log(response.data.data);
//         setOrders(response.data.data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews ();
//     fetchExtraMeta();
//     fetchProduct();
//     fetchOrders();
//   }, []);


//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     try{
//       const response=await axios.post(addToCartRoute,{
//         productID:product[0].PRODUCT_ID,
//         quantity:1
//       },{
//         withCredentials:true
//       });
//       if(response.status===200){
//         window.alert("Added product to cart");
//       }
//     }
//     catch(err){
//       console.log(err.response.data.msg);
//       window.alert(err.response.data.msg);
//     }
//   };
//   const handleBuyNow = (e) => {
//     e.preventDefault();
//     console.log("Buy Now clicked, address:", buyerAddress);
//     // Handle buy now logic here
//   };

//   const handleWishlist = async (e) => {
//     e.preventDefault();
//     try{
//       const response=await axios.post(addToWishListRoute,{
//         productID:product[0].PRODUCT_ID
//       },{
//         withCredentials:true
//       });
//       if(response.status===200){
//         window.alert("Added product to Wishlist");
//       }
//     }
//     catch(err){
//       console.log(err.response.data.msg);
//       window.alert(err.response.data.msg);
//     }


//   };

//   const handleInputChange = (e) => {
//     setBuyerAddress(e.target.value);
//     // Handle wishlist logic here
//   };

//   const openModal = (image) => {
//     setCurrentImage(image);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setCurrentImage(null);
//   };

//   // productID, reviewDescription, starsRating, sellerID, images

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     const brandName=product[0].BRAND_NAME;
//     const model=product[0].MODEL;
//     const formData = new FormData();
//     formData.append("productID", product[0].PRODUCT_ID);
//     formData.append("sellerID", product[0].SELLER_ID);
//     formData.append("reviewDescription", description);
//     formData.append("starsRating", rating); // Include the rating in the form data
//     if (reviewImage) {
//       const file=reviewImage;
//       // console.log(file);
//       // formData.append("image", reviewImage);
//       if (file.name) {
//         const originalFileName = file.name;
//         let idx = originalFileName.indexOf(".");
//         let extension = originalFileName.substring(idx);
//         const newFilename = `${brandName}${model}-review.${1}${extension}`; // Generate a unique filename
//         formData.append("images", file, newFilename); // Append with new filename
//       }
//     }
//     try {
//       // for (let [key, value] of formData.entries()) {
//       //   console.log(`${key}: ${value}`);
//       // }
//       const response = await axios.post(addReviewsRoute, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       });
//       if (response.status === 200) {
//         window.alert("Review submitted successfully");
//         setDescription("");
//         setReviewImage(null);
//         setRating(0); // Reset the rating after successful submission
//         // fetchReviews();
//       }
//     } catch (error) {
//       console.error("Error submitting review: ", error);
//     }
//   };

//   const handleReviewImageChange = (e) => {
//     setReviewImage(e.target.files[0]);
//   };

//   const specifications = SPECIFICATIONS
//     ? SPECIFICATIONS.split("^").map((spec, index) => {
//         const [key, value] = spec.split(":");
//         return (
//           <li key={index}>
//             <strong>{key.trim()}       :    </strong> {value.trim()}
//           </li>
//         );
//       })
//      : [];

//      if (loading) {
//       return (
//         <div>
//           <Loader />
//         </div>
//       );
//     }
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <>
//     <NavECommerce/>
//     <div className="productPage">

//       <main className="dashboard-content container mt-3">
//         <div className="row">
//           {product.map((product, index) => (
//             <div key={index} className="col-lg-12 col-md-12 col-sm-12 mb-6">
//               <div className="product-card card h-100 shadow-sm">
//                 <div className="row ">
//                   <div className="carousel-div col-md-5 ">
//                     <Carousel interval={null} className="product-carousel ">
//                       {product.images.map((image, imgIndex) => (
//                         <Carousel.Item key={imgIndex}>
//                           <img
//                             className="d-block w-100 product-image"
//                             src={image}
//                             alt={`Slide ${imgIndex + 1}`}
//                           />
//                         </Carousel.Item>
//                       ))}
//                     </Carousel>
//                   </div>
//                   <div className="col-md-7">
//                     <div className="card-body product-info">
//                       <h1 className="product-Heading">{product.BRAND_NAME} {product.MODEL}</h1>
//                       <div className="flexbox-ratings d-flex col">
//                         {reviewMeta && (
//                           <StarRating rating={reviewMeta.avg_rating} />
//                         )} 
//                       </div>
//                       <div className="ratings-para"><h6>{reviewMeta.noofreviews} Reviews & Ratings</h6></div>
//                       <div className="price-wishlist d-flex justify-content-between align-items-center">
//                         <h1 className="product-price">₹{product.PRICE.toLocaleString()}</h1>
//                         <div className="wishlist" onClick={handleWishlist}>
//                           <button className="wishlist-button btn-warning" onClick={handleWishlist}>
//                             Add to Wishlist
//                           </button>
//                         </div>
//                       </div>
//                       <div className="specifications">
//                         <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'underline' }}
//                         >Specifications :</h2>
//                         <ul className="specifications-content">{specifications}</ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row buy-section">
//                   <div className="buy-part col-md-5">
//                     <p>
//                       <strong>Seller Id:</strong> {product.SELLER_ID}
//                     </p>
//                     <p>
//                       <strong>Seller Address:</strong> {product.SELLER_ADDRESS}
//                     </p>
//                     <button className="button-cart" onClick={handleAddToCart}>
//                       Add to Cart
//                     </button>
//                     <form className="mt-4" onSubmit={handleBuyNow}>
//                       <input
//                         type="text"
//                         value={buyerAddress}
//                         onChange={handleInputChange}
//                         placeholder="Enter Delivery Address"
//                         required
//                       />
//                       <button type="submit" className="button-buy-now">
//                         Buy Now
//                       </button>
//                     </form>
//                   </div>
//                   <div className="col-md-7">
//                     <div className="reviews-section">
//                       <h2>Reviews</h2>
//                       <div className="reviews-container">
//                         {reviews.map((review, index) => (
//                           <div key={index} className="review-item">
//                             <img src={review.images} alt="Review" className="review-image" onClick={() => openModal(review.images)} />
//                             <div className="review-content">
//                               <p className="mb-1">Reviewed by: <strong>{review.USER_ID}</strong></p>
//                               <StarRating rating={review.STARS_RATING} />
//                               <p>{review.REVIEW_DESCRIPTION}</p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* {orders.length === 0 ? (
//                       <p className="mt-3 text-danger">
//                         Order the product to post a review
//                       </p>
//                     ) : ( */}
//                       <div className="review-form mt-4">
//                         <h5>Leave a Review:</h5>
//                         <form onSubmit={handleReviewSubmit}>
//                           <StarRatingInput rating={rating} onRatingChange={setRating} />
//                           <div className="form-group mb-3">
//                             <label className="h6">Description</label>
//                             <textarea
//                               className="form-control"
//                               value={description}
//                               onChange={(e) => setDescription(e.target.value)}
//                               required
//                             />
//                           </div>
//                           <div className="form-group mb-3">
//                             <label className="h6">Upload Image</label>
//                             <input
//                               type="file"
//                               className="form-control"
//                               onChange={handleReviewImageChange}
//                             />
//                           </div>
//                           <button type="submit" className="btn btn-primary">
//                             Submit Review
//                           </button>
//                         </form>
//                       </div>
//                     {/* )} */}
//       </main>
//       <Modal show={showModal} onHide={closeModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Review Image</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <img src={currentImage} alt="Review" className="modal-image" />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//     </>
//   );
// };

// export default ProductPage;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Carousel, Button, Modal, Form } from "react-bootstrap";
import "../styles/productPage.css";
import StarRating from "./starRating";
import StarRatingInput from "./starRatingInput";
import { getReviewsAdditionalRoute } from "../utils/APIRoutes";
import { getProductReviewsRoute } from "../utils/APIRoutes";
import { fetchOrdersRoute } from "../utils/APIRoutes";
import { addToWishListRoute } from "../utils/APIRoutes";
import { addToCartRoute } from "../utils/APIRoutes";
import { addReviewsRoute } from "../utils/APIRoutes";
import { paySingleOnlineRoute } from "../utils/APIRoutes";
import { paySingleCodRoute } from "../utils/APIRoutes";

const ProductPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewMeta, setReviewMeta] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [SPECIFICATIONS, setSpecifications] = useState(null);
  const [buyerAddress, setBuyerAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [description, setDescription] = useState("");
  const [reviewImage, setReviewImage] = useState(null);
  const [rating, setRating] = useState(0); // New state for star rating
  const [showBuyModal, setShowBuyModal] = useState(false); // New state for Buy Now modal
  const [quantity, setQuantity] = useState(1); // State to manage quantity
  const [paymentMode, setPaymentMode] = useState(""); // State to manage payment mode
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://super-app-backend.vercel.app/api/products/${productId}`,
          {
            withCredentials: true,
          }
        );
        setProduct(response.data.data);
        setSpecifications(response.data.data[0].SPECIFICATIONS);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchExtraMeta = async () => {
      try {
        const response = await axios.post(
          getReviewsAdditionalRoute,
          {
            productID: productId,
          },
          {
            withCredentials: true,
          }
        );
        setReviewMeta(response.data.data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.post(
          getProductReviewsRoute,
          {
            productID: productId,
          },
          {
            withCredentials: true,
          }
        );
        setReviews(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          fetchOrdersRoute,
          {
            productID: productId,
          },
          {
            withCredentials: true,
          }
        );
        setOrders(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
    fetchExtraMeta();
    fetchProduct();
    fetchOrders();
  }, [productId]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        addToCartRoute,
        {
          productID: product[0].PRODUCT_ID,
          quantity: 1,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        window.alert("Added product to cart");
      }
    } catch (err) {
      console.log(err.response.data.msg);
      window.alert(err.response.data.msg);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    setShowBuyModal(true);
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        addToWishListRoute,
        {
          productID: product[0].PRODUCT_ID,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        window.alert("Added product to Wishlist");
      }
    } catch (err) {
      console.log(err.response.data.msg);
      window.alert(err.response.data.msg);
    }
  };

  const handleInputChange = (e) => {
    setBuyerAddress(e.target.value);
  };

  const openModal = (image) => {
    setCurrentImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentImage(null);
  };

  const closeBuyModal = () => {
    setShowBuyModal(false);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const brandName = product[0].BRAND_NAME;
    const model = product[0].MODEL;
    const formData = new FormData();
    formData.append("productID", product[0].PRODUCT_ID);
    formData.append("sellerID", product[0].SELLER_ID);
    formData.append("reviewDescription", description);
    formData.append("starsRating", rating); // Include the rating in the form data
    if (reviewImage) {
      const file = reviewImage;
      if (file.name) {
        const originalFileName = file.name;
        let idx = originalFileName.indexOf(".");
        let extension = originalFileName.substring(idx);
        const newFilename = `${brandName}${model}-review.${1}${extension}`; // Generate a unique filename
        formData.append("images", file, newFilename); // Append with new filename
      }
    }
    try {
      const response = await axios.post(addReviewsRoute, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        window.alert("Review submitted successfully");
        setDescription("");
        setReviewImage(null);
        setRating(0); // Reset the rating after successful submission
      }
    } catch (error) {
      console.error("Error submitting review: ", error);
    }
  };

  const handleReviewImageChange = (e) => {
    setReviewImage(e.target.files[0]);
  };

  const handleConfirmBuy = async () => {
    try {
      // console.log(quantity);
      let number = quantity;
      if (paymentMode.toUpperCase() !== "COD") {
        const response = await axios.post(
          paySingleOnlineRoute,
          {
            amount: parseFloat(product[0].PRICE).toFixed(2),
            productID: product[0].PRODUCT_ID,
            quantity: number,
            modeOfPayment: paymentMode.toUpperCase(),
            buyerAddress,
            sellerID: product[0].SELLER_ID,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
        window.location.href = response.data.url;
        // console.log(quantity);
      } else {
        const response = await axios.post(
          paySingleCodRoute,
          {
            amount: parseFloat(product[0].PRICE).toFixed(2),
            productID: product[0].PRODUCT_ID,
            quantity: quantity,
            modeOfPayment: paymentMode.toUpperCase(),
            buyerAddress,
            sellerID: product[0].SELLER_ID,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
        window.alert(response.data.msg);
        navigate("/orders");
      }
    } catch (err) {
      console.log(err.response.data.msg);
      window.alert(err.response.data.msg);
    }
  };

  const specifications = SPECIFICATIONS
    ? SPECIFICATIONS.split("^").map((spec, index) => {
        const [key, value] = spec.split(":");
        return (
          <li key={index}>
            <strong>{key.trim()} :</strong> {value.trim()}
          </li>
        );
      })
    : [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="productPage">
      <main className="dashboard-content container mt-3">
        <div className="row">
          {product.map((product, index) => (
            <div key={index} className="col-lg-12 col-md-12 col-sm-12 mb-6">
              <div className="product-card card h-100 shadow-sm">
                <div className="row ">
                  <div className="carousel-div col-md-5 ">
                    <Carousel interval={null} className="product-carousel ">
                      {product.images.map((image, imgIndex) => (
                        <Carousel.Item key={imgIndex}>
                          <img
                            className="d-block w-100 product-image"
                            src={image}
                            alt={`Slide ${imgIndex + 1}`}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                  <div className="col-md-7">
                    <div className="card-body product-info">
                      <h1 className="product-Heading">
                        {product.BRAND_NAME} {product.MODEL}
                      </h1>
                      <div className="flexbox-ratings d-flex col">
                        {reviewMeta && (
                          <StarRating rating={reviewMeta.avg_rating} />
                        )}
                      </div>
                      <div className="ratings-para">
                        <h6>{reviewMeta.noofreviews} Reviews & Ratings</h6>
                      </div>
                      <div className="price-wishlist d-flex justify-content-between align-items-center">
                        <h1 className="product-price">
                          ₹{product.PRICE.toLocaleString()}
                        </h1>
                        <div className="wishlist" onClick={handleWishlist}>
                          <button
                            className="wishlist-button btn-warning"
                            onClick={handleWishlist}
                          >
                            Add to Wishlist
                          </button>
                        </div>
                      </div>
                      <div className="specifications">
                        <h2
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Specifications :
                        </h2>
                        <ul className="specifications-content">
                          {specifications}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row buy-section">
                  <div className="buy-part col-md-5">
                    <p>
                      <strong>Seller Id:</strong> {product.SELLER_ID}
                    </p>
                    <p>
                      <strong>Seller Address:</strong> {product.SELLER_ADDRESS}
                    </p>
                    <button className="button-cart" onClick={handleAddToCart}>
                      Add to Cart
                    </button>
                    <form className="mt-4" onSubmit={handleBuyNow}>
                      <input
                        type="text"
                        value={buyerAddress}
                        onChange={handleInputChange}
                        placeholder="Enter Delivery Address"
                        required
                      />
                      <button type="submit" className="button-buy-now">
                        Buy Now
                      </button>
                    </form>
                  </div>
                  <div className="col-md-7">
                    <div className="reviews-section">
                      <h2>Reviews</h2>
                      <div className="reviews-container">
                        {reviews.map((review, index) => (
                          <div key={index} className="review-item">
                            <img
                              src={review.images}
                              alt="Review"
                              className="review-image"
                              onClick={() => openModal(review.images)}
                            />
                            <div className="review-content">
                              <p className="mb-1">
                                Reviewed by: <strong>{review.USER_ID}</strong>
                              </p>
                              <StarRating rating={review.STARS_RATING} />
                              <p>{review.REVIEW_DESCRIPTION}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="review-form mt-4">
          <h5>Leave a Review:</h5>
          <form onSubmit={handleReviewSubmit}>
            <StarRatingInput rating={rating} onRatingChange={setRating} />
            <div className="form-group mb-3">
              <label className="h6">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label className="h6">Upload Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleReviewImageChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </form>
        </div>
      </main>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Review Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={currentImage} alt="Review" className="modal-image" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showBuyModal} onHide={closeBuyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
              />
            </Form.Group>
            <Form.Group controlId="formPaymentMode">
              <Form.Label>Payment Mode</Form.Label>
              <Form.Control
                as="select"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option value="">Select Payment Mode</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="net_banking">Net Banking</option>
                <option value="upi">UPI</option>
                <option value="cod">Cash on Delivery</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeBuyModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmBuy}>
            Confirm Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductPage;