import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import NavECommerce from "./NavE-Commerce"
import { useNavigate } from "react-router-dom";
import {postProductsRoute} from "../utils/APIRoutes"

const PostProblems = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([{}]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [specifications, setSpecifications] = useState([
    { key: "", value: "" },
  ]);
  const [noOfStocks, setNoOfStocks] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [sellerCity, setSellerCity] = useState("");
  const [sellerState, setSellerState] = useState("");
  const [brandName, setBrandName] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");

  const handleFileChange = (index, e) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);
  };

  const addFileInput = () => {
    setFiles([...files, {}]);
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, fileIndex) => fileIndex !== index);
    setFiles(newFiles);
  };

  const handleAddSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const handleRemoveSpecification = (index) => {
    const newSpecifications = specifications.filter(
      (_, specIndex) => specIndex !== index
    );
    setSpecifications(newSpecifications);
  };

  const handleSpecificationChange = (index, e) => {
    const { name, value } = e.target;
    const newSpecifications = [...specifications];
    newSpecifications[index][name] = value;
    setSpecifications(newSpecifications);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    let i = 0;
    files.forEach((file) => {
      if (file.name) {
        const originalFileName = file.name;
        let idx = originalFileName.indexOf(".");
        let extension = originalFileName.substring(idx);
        const newFilename = `${brandName}${model}.${i++}${extension}`; // Generate a unique filename
        formData.append("files", file, newFilename); // Append with new filename
      }
    });

    const specificationString = specifications
      .map((spec) => `${spec.key}:${spec.value}`)
      .join("^");
    // console.log(specificationString);
    formData.append("Price", price);
    formData.append("Description", description);
    formData.append("Specifications", specificationString);
    formData.append("No_Of_Stocks", noOfStocks);
    formData.append("Seller_Address", sellerAddress);
    formData.append("Seller_City", sellerCity);
    formData.append("Seller_State", sellerState);
    formData.append("Brand_Name", brandName);
    formData.append("Model", model);
    formData.append("Category", category);

    try {
      const response = await axios.post(
        postProductsRoute,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
          withCredentials: true, // Pass credentials with the request if required
        }
      );
      if (response.status === 200) {
        window.alert("Your product posted sucessfully to X");
        navigate("/dashboard");
      }
    } catch (error) {
      for(let i=0;i<error.response.data.errors.length;i++){
        window.alert(error.response.data.errors[i].msg)
      }
      console.error("Error uploading files: ", error);
    }
  };

  return (
    <>
    <NavECommerce/>
    <div className="container mt-5" >
      <h1 className="mb-4">Add Product</h1>
      <div className="form-group mb-3">
        <label className="h6">Brand Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Brand Name"
          value={brandName}
          required
          onChange={(e) => setBrandName(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label className="h6">Model</label>
        <input
          type="text"
          className="form-control"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </div>
      <div className="d-flex justify-content-between">
        <div className="form-group mb-3">
          <label className="h6">Price</label>
          <input
            type="text"
            className="form-control"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3 ml-5">
          <label className="h6">No Of Stocks</label>
          <input
            type="text"
            className="form-control"
            placeholder="No Of Stocks"
            value={noOfStocks}
            onChange={(e) => setNoOfStocks(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="h6">Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-group mb-3">
        <label className="h6">Description</label>
        <textarea
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          rows="5"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="h6">Add the product Specifications</label>
      </div>
      {specifications.map((spec, index) => (
        <div key={index} className="form-group mb-3">
          <label>Specification {index + 1}</label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Key"
              name="key"
              value={spec.key}
              onChange={(e) => handleSpecificationChange(index, e)}
              required
            />
            <input
              type="text"
              className="form-control me-2"
              placeholder="Value"
              name="value"
              value={spec.value}
              onChange={(e) => handleSpecificationChange(index, e)}
              required
            />
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveSpecification(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        className="btn btn-secondary mb-3"
        onClick={handleAddSpecification}
      >
        Add More
      </button>
      <div className="form-group mb-3">
        <label className="h6">Seller Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Seller Address"
          value={sellerAddress}
          onChange={(e) => setSellerAddress(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label className="h6">Seller City</label>
        <input
          type="text"
          className="form-control"
          placeholder="Seller City"
          value={sellerCity}
          onChange={(e) => setSellerCity(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label className="h6">Seller State</label>
        <input
          type="text"
          className="form-control"
          placeholder="Seller State"
          value={sellerState}
          onChange={(e) => setSellerState(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="h6">Upload Images</label>
      </div>
      {files.map((file, index) => (
        <div
          key={index}
          className="form-group mb-3 d-flex justify-content-around"
        >
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleFileChange(index, e)}
            required
          />
          <button
            className="btn btn-danger ml-2"
            onClick={() => handleRemoveFile(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button className="btn btn-secondary mb-3" onClick={addFileInput}>
        Add Images
      </button>
      <div>
        <button className="btn btn-success" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
    </>
  );
};

export default PostProblems;
