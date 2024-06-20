import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { Carousel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../styles/ProductsDashboard.css"; // Import custom styles
import { getProductBySellerRoute } from "../utils/APIRoutes";
import { deleteProductRoute } from "../utils/APIRoutes";
import { resumeProductRoute } from "../utils/APIRoutes";
import { updateStocksRoute } from "../utils/APIRoutes";

const SellerProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stocks, setStocks] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(getProductBySellerRoute, {
          withCredentials: true,
        });
        setProducts(response.data.data);
        setStocks(response.data.data.NO_OF_STOCKS);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productID) => {
    try {
      const response = await axios.put(
        deleteProductRoute,

        { productID },
        { withCredentials: true }
      );
      if (response.status === 200) {
        window.alert("Product aborted successfully");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      window.alert("Error deleting the product");
    }
  };
  const resumeProduct = async (productID) => {
    try {
      const response = await axios.put(
        resumeProductRoute,

        { productID },
        { withCredentials: true }
      );
      if (response.status === 200) {
        window.alert("Product resumed successfully");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      window.alert("Error deleting the product");
    }
  };
  const handleStocks = (e) => {
    if (e.target.value <= 0) {
      window.alert("Stocks number can't be zero or negative");
      e.target.value = "";
      return;
    }
    setStocks(e.target.value);
  };

  const updateStocks = async (productID) => {
    try {
      const response = await axios.put(
        updateStocksRoute,

        { productID, stocks },
        { withCredentials: true }
      );
      if (response.status === 200) {
        window.alert("Stocks successfully");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      window.alert("Error updating the stocks");
    }
  };

  const parseSpecifications = (specsString) => {
    return specsString.split("^").map((spec, index) => {
      // console.log(spec);
      const [key, value] = spec.split(":");
      return (
        <li key={index}>
          <strong>{key.trim()}:</strong> {value.trim()}
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

  const handleCardClick = (productID) => {
    navigate(`/products/${productID}`);
  };

  return (
    <div className="dashboard">
      <main className="dashboard-content container mt-2">
        <div className="row">
          <h1 className="h1 text-center mb-4">Your Products</h1>
          {products.map((product, index) => (
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
                        onClick={() => {
                          handleCardClick(product.PRODUCT_ID);
                        }}
                      >
                        <h1 className="h2">
                          <strong>{product.BRAND_NAME}</strong>
                        </h1>
                        <h4 className="h2 ml-2">{product.MODEL}</h4>
                      </div>
                      <div className="product-ratings">
                        <span className="star-rating">
                          &#9733;&#9733;&#9733;&#9733;&#9734;
                        </span>
                        <span className="rating-count">(113)</span>
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
                      <div className="d-flex justify-content-between">
                        {product.AVAILABILITY_STATUS === 1 ? (
                          <Button
                            variant="warning"
                            className="btn btn-danger"
                            onClick={() => {
                              deleteProduct(product.PRODUCT_ID);
                            }}
                          >
                            Stop selling
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            className="btn btn-primary"
                            onClick={() => {
                              resumeProduct(product.PRODUCT_ID);
                            }}
                          >
                            Resume selling
                          </Button>
                        )}
                        <div className="d-flex">
                          <input
                            type="number"
                            placeholder="Update NO Of Stocks"
                            // value={product.NO_OF_STOCKS}
                            onChange={(e) => {
                              handleStocks(e);
                            }}
                            style={{ borderRadius: "1rem" }}
                          />
                          <button
                            className="btn btn-success ml-2"
                            style={{
                              borderRadius: "5rem",
                            }}
                            onClick={() => {
                              updateStocks(product.PRODUCT_ID);
                            }}
                          >
                            Submit
                          </button>
                        </div>
                        <div>
                          <span className="text-secondary">
                            NO OF STOCKS LEFT:{" "}
                          </span>
                          <span className="text-secondary">
                            {product.NO_OF_STOCKS}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SellerProducts;
