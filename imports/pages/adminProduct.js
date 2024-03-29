// /admin/product.js
import {
  DeleteProduct,
  addProduct,
  getAllOrdersAPI,
  getOrdersAPI,
  getProducts,
  updateProductStatus,
} from "@/imports/api/api";
import React, { useState, useEffect } from "react";
import nookies, { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import styled from "styled-components";
import AllOrderAdmin from "../components/AllOrderAdmin";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const { token } = nookies.get({});
  const router = useRouter();
  const [allOrder, setAllOrder] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    productImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.productName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("status", "pending");
    if (formData.productImage) {
      formDataToSend.append("productImage", formData.productImage);
    }

    try {
      const response = await addProduct(formDataToSend, token);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, productImage: e.target.files[0] });
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");

    if (userRole !== "admin") {
      router.push("/product");
    }
    !token && router.push("/");
  }, []);

  useEffect(() => {
    const GetAllOrder = async () => {
      const resp = await getAllOrdersAPI();
      setAllOrder(resp);
    };

    fetchProducts();
    GetAllOrder();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsResponse = await getProducts(token);
      setProducts(productsResponse);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleLogout = () => {
    destroyCookie({}, "token", { path: "/" });
    localStorage.removeItem("role");
    router.push("/");
  };

  const getAllOrder = async () => {
    const newOrder = await getOrdersAPI(token);
    setAllOrder(newOrder);
  };

  const handleDelete = (product) => async () => {
    const resp = await DeleteProduct(product._id);
    getAllOrder();
    fetchProducts();
  };

  return (
    <div className="container mt-4">
      <BTnWrap>
        <div className="mb-3">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </BTnWrap>
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">
            Product Image
          </label>
          <input
            type="file"
            className="form-control"
            name="productImage"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </Form>
      <h1>Product List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            <>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>
                    {product.imagePath && (
                      <img
                        src={product.imagePath}
                        alt={`Product: ${product.name}`}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={handleDelete(product)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <p>No Data Found</p>
          )}
        </tbody>
      </table>
      <AllOrderAdmin data={allOrder} />
    </div>
  );
};

export default AdminProduct;

const Form = styled.form`
  margin-bottom: 15px;
`;

const BTnWrap = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;
