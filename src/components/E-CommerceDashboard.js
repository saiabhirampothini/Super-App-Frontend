import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { Carousel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRating from "./starRating";
import NavECommerce from "./NavE-Commerce";
import "../styles/ProductsDashboard.css"; // Import custom styles
import { getAllProductsRoute } from "../utils/APIRoutes";
import { addToCartRoute } from "../utils/APIRoutes";
import { getReviewsAdditionalRoute } from "../utils/APIRoutes";

const ProductsDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState({});
  const [search, setSearch] = useState("");

  const fetchReviewsForProducts = async (products) => {
    try {
      const reviewsData = {};
      for (const product of products) {
        const response = await axios.post(
          getReviewsAdditionalRoute,
          { productID: product.PRODUCT_ID },
          {
            withCredentials: true,
          }
        );
        reviewsData[product.PRODUCT_ID] = response.data.data[0];
      }
      setReviews(reviewsData);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(getAllProductsRoute, {
          withCredentials: true,
        });
        console.log(response.data.data);
        setProducts(response.data.data);
        // fetchReviewsForProducts(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchReviewsForProducts(products);
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
      window.alert(
        "Error adding product to cart / Product is already in the cart"
      );
    }
  };

  const parseSpecifications = (specsString) => {
    if (!specsString) return null;
    // console.log(specsString);

    return specsString.split("^").map((spec, index) => {
      const [key, value] = spec.split(":");
      return (
        <li key={index}>
          <strong>{key?.trim()}:</strong> {value?.trim()}
        </li>
      );
    });
  };
  // Handle loading and error states
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
  const handleSearch = async (e) => {
    setSearch(e.target.value);
  };
  const filteredProducts = products.filter((product) => {
    return (
      product.BRAND_NAME.toLowerCase().includes(search.toLowerCase()) ||
      product.MODEL.toLowerCase().includes(search.toLowerCase()) ||
      product.SPECIFICATIONS.toLowerCase().includes(search.toLowerCase()) ||
      product.CATEGORY.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleCardClick = (productID) => {
    navigate(`/products/${productID}`);
  };

  return (
    <>
      <NavECommerce />
      <div className="dashboard">
        <main className="dashboard-content container mt-2">
          <input
            className="form-control mr-sm-4 mt-4 mb-5
          "
            type="search"
            placeholder="Search by Brand, Model, Specifications or Category"
            aria-label="Search"
            value={search}
            onChange={(e) => {
              handleSearch(e);
            }}
          />
          <div className="row">
            {filteredProducts.map((product, index) => (
              <div key={index} className="col-lg-12 col-md-12 col-sm-12 mb-4">
                <div className="product-card card h-100 shadow-sm">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <Carousel interval={null} className="product-carousel">
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
                    <div className="col-md-8">
                      <div className="card-body product-info">
                        <div
                          className="d-flex"
                          onClick={() => handleCardClick(product.PRODUCT_ID)}
                        >
                          <h1 className="h2">
                            <strong>{product.BRAND_NAME}</strong>
                          </h1>
                          <h4 className="h2 ml-2">{product.MODEL}</h4>
                        </div>
                        <div className="product-ratings">
                          {reviews[product.PRODUCT_ID] ? (
                            <StarRating
                              rating={reviews[product.PRODUCT_ID].avg_rating}
                            />
                          ) : (
                            "No reviews Yet..."
                          )}
                          <span className="rating-count">
                            {reviews[product.PRODUCT_ID]
                              ? `(${
                                  reviews[product.PRODUCT_ID].noofreviews
                                } Reviews)`
                              : "(No reviews yet)"}
                          </span>
                        </div>
                        <p className="card-text product-price mt-3">
                          <strong> ₹ {product.PRICE}</strong>{" "}
                          {product.OLD_PRICE && (
                            <span className="old-price">
                              ${product.OLD_PRICE}
                            </span>
                          )}
                        </p>
                        <p className="card-text product-description">
                          {product.DESCRIPTION.length > 100
                            ? product.DESCRIPTION.substring(0, 100) + "..."
                            : product.DESCRIPTION}
                        </p>
                        <ul className="product-specifications">
                          {parseSpecifications(product.SPECIFICATIONS)}
                        </ul>

                        <Button
                          variant="warning"
                          className="add-to-cart-button"
                          onClick={() => {
                            addToCart(product.PRODUCT_ID);
                          }}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductsDashboard;
